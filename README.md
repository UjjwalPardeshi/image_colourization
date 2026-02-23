# 🎨 AI Image Colorizer

Restore life to old memories with state-of-the-art deep learning. This project provides a full-stack solution for automatic image colorization, featuring a high-performance Python backend and a premium Next.js frontend.

![image](https://github.com/UjjwalPardeshi/image_colourization/assets/113883490/8a4f81e3-482e-4539-b453-b095ca54fac2)

## ✨ Features

- **Premium UI/UX**: A sleek, dark-mode interface built with Next.js 14, Tailwind CSS, and Framer Motion.
- **Dual AI Engines**: Choice between **Model 1 (SIGGRAPH 17)** for vibrant natural scenes and **Model 2 (ECCV 16)** for classic results.
- **Real-time Comparison**: Interactive before/after slider to visualize the colorization process.
- **Fast Inference**: Optimized FastAPI backend supporting both GPU (CUDA) and CPU.
- **Instant Result**: Download your colorized high-resolution images instantly.

## 🛠️ Technology Stack

### Backend
- **Framework**: FastAPI (Python)
- **Deep Learning**: PyTorch
- **Image Processing**: Scikit-Image, Pillow, NumPy
- **Server**: Uvicorn

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Components**: React Compare Slider

---

## 🚀 Getting Started

### 1. Prerequisite
- Python 3.9+
- Node.js 18+
- npm or yarn

### 2. Backend Setup
1. Navigate to the root directory.
2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Start the FastAPI server:
   ```bash
   python app.py
   ```
   *Note: On the first run, the model weights (~150MB) will be downloaded automatically.*

### 3. Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧠 Model Information

This project implements the architectures proposed by Zhang et al.:
- **Model 1 (SIGGRAPH17)**: Focuses on colorfulness and natural tones.
- **Model 2 (ECCV16)**: The original groundbreaking architecture for colorful image colorization.

## 📸 Screenshots

*(Add your screenshots here to showcase the premium UI!)*

## 📄 License

This project is licensed under the MIT License.

---
Built with ❤️ by [Ujjwal Pardeshi](https://github.com/UjjwalPardeshi)
