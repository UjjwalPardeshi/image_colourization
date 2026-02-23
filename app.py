
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
import torch
import numpy as np
from PIL import Image
import io
import os
from colorizers import eccv16, siggraph17, load_img, preprocess_img, postprocess_tens

app = FastAPI()

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify the frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load colorizers once
colorizer_eccv16 = eccv16(pretrained=True).eval()
colorizer_siggraph17 = siggraph17(pretrained=True).eval()

# Move to GPU if available
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
colorizer_eccv16.to(device)
colorizer_siggraph17.to(device)

@app.post("/colorize")
async def colorize_image(
    file: UploadFile = File(...),
    version: str = Form("siggraph17")
):
    # Read image
    contents = await file.read()
    img_pil = Image.open(io.BytesIO(contents)).convert("RGB")
    img_np = np.asarray(img_pil)

    # Preprocess
    (tens_l_orig, tens_l_rs) = preprocess_img(img_np, HW=(256, 256))
    tens_l_rs = tens_l_rs.to(device)

    # Colorize
    if version == "eccv16":
        out_img = postprocess_tens(tens_l_orig, colorizer_eccv16(tens_l_rs).cpu())
    else:
        out_img = postprocess_tens(tens_l_orig, colorizer_siggraph17(tens_l_rs).cpu())

    # Convert output to image bytes
    out_img_uint8 = (out_img * 255).astype(np.uint8)
    out_pil = Image.fromarray(out_img_uint8)
    
    img_byte_arr = io.BytesIO()
    out_pil.save(img_byte_arr, format='PNG')
    img_byte_arr = img_byte_arr.getvalue()

    return Response(content=img_byte_arr, media_type="image/png")

@app.get("/health")
async def health_check():
    return {"status": "healthy", "device": str(device)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
