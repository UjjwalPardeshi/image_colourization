'use client';

import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

interface ComparisonSliderProps {
    originalImage: string;
    colorizedImage: string;
}

export default function ComparisonSlider({ originalImage, colorizedImage }: ComparisonSliderProps) {
    return (
        <div className="w-full h-auto glass-card rounded-2xl overflow-hidden shadow-2xl relative border border-white/10 group max-h-[70vh] flex items-center justify-center bg-black/40">
            <ReactCompareSlider
                className="w-full h-full object-contain max-h-[70vh]"
                itemOne={
                    <ReactCompareSliderImage
                        src={originalImage}
                        alt="Original Black & White"
                        className="w-full h-full object-contain filter grayscale"
                    />
                }
                itemTwo={
                    <ReactCompareSliderImage
                        src={colorizedImage}
                        alt="Colorized Output"
                        className="w-full h-full object-contain shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                    />
                }
                position={50}
                style={{ width: '100%', height: '100%' }}
            />

            {/* Overlay Labels */}
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-xs font-medium tracking-wider text-slate-300 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                ORIGINAL
            </div>
            <div className="absolute top-4 right-4 bg-purple-600/60 backdrop-blur-md px-3 py-1 rounded-full border border-purple-400/30 text-xs font-medium tracking-wider text-white pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                COLORIZED
            </div>
        </div>
    );
}
