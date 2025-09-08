# **image_colourization**

![image](https://github.com/UjjwalPardeshi/image_colourization/assets/113883490/8a4f81e3-482e-4539-b453-b095ca54fac2)
![image](https://github.com/UjjwalPardeshi/image_colourization/assets/113883490/4555f8cc-fb48-43f1-9621-1e6c93b4b863)

image_colourization

This project implements deep learning models for automatic image colorization using PyTorch. It includes multiple pretrained colorization networks optimized for different architectures and visual styles.
Features

    Colorizers based on ECCV16 and SIGGRAPH17 model architectures.

    Real-time colorization of grayscale images to vivid color images.

    Edge AI compatible with GPU or CPU (PyTorch-based).

    Multiples input/output image handling with visualization support.

    Pretrained model weights included for immediate use.

Installation

    Clone the repository.

    Install required dependencies: pip install torch torchvision matplotlib scikit-image pillow

    Run the demo with a sample image:
    python demo_release.py -i imgs/sample.jpg --use_gpu
    (Add --use_gpu to enable GPU support)

Usage

The demo script performs image loading, preprocessing, and runs inference through both models. Outputs are saved as PNG images and displayed for comparison.
