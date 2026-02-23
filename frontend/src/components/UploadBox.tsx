'use client';

import { useState, useCallback, useRef } from 'react';
import { UploadCloud, FileImage, Trash2 } from 'lucide-react';

interface UploadBoxProps {
    onFileSelect: (file: File) => void;
    selectedFile: File | null;
    onClear: () => void;
    isLoading: boolean;
}

export default function UploadBox({ onFileSelect, selectedFile, onClear, isLoading }: UploadBoxProps) {
    const [isDragOver, setIsDragOver] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        if (isLoading) return;

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            if (file.type.startsWith('image/')) {
                onFileSelect(file);
            } else {
                alert('Please upload a valid image file');
            }
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            onFileSelect(e.target.files[0]);
        }
    };

    return (
        <div className="w-full">
            <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={inputRef}
                onChange={handleFileChange}
                disabled={isLoading}
            />

            {!selectedFile ? (
                <div
                    onClick={() => !isLoading && inputRef.current?.click()}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`
            border-2 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center
            transition-all duration-300 ease-in-out cursor-pointer group
            ${isDragOver ? 'border-purple-400 bg-purple-500/10' : 'border-slate-600 bg-slate-900/40 hover:border-slate-400 hover:bg-slate-800/40'}
            ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
                >
                    <div className="mb-4 p-4 rounded-full bg-slate-800/50 group-hover:bg-slate-700/50 transition-colors">
                        <UploadCloud className={`w-10 h-10 ${isDragOver ? 'text-purple-400' : 'text-slate-400 group-hover:text-slate-200'}`} />
                    </div>
                    <p className="text-xl font-medium text-slate-200 mb-2">
                        Click or drag and drop
                    </p>
                    <p className="text-sm text-slate-400 text-center">
                        Upload your black & white photo
                        <br />
                        (JPEG, PNG, WEBP)
                    </p>
                </div>
            ) : (
                <div className="glass-card rounded-2xl overflow-hidden shadow-2xl relative border border-white/10 group">
                    {isLoading && (
                        <div className="absolute inset-0 bg-slate-950/80 z-20 flex flex-col items-center justify-center backdrop-blur-sm">
                            <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mb-4 shadow-[0_0_15px_rgba(168,85,247,0.5)]"></div>
                            <p className="text-purple-300 font-medium animate-pulse tracking-wide">
                                Colorizing magical algorithms...
                            </p>
                        </div>
                    )}

                    <img
                        src={URL.createObjectURL(selectedFile)}
                        alt="Preview"
                        className="w-full h-auto object-contain max-h-[60vh] grayscale opacity-80 mix-blend-screen"
                    />

                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-black/60 backdrop-blur-md rounded-xl p-4 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                        <div className="flex items-center space-x-3 overflow-hidden">
                            <FileImage className="text-purple-400 flex-shrink-0" />
                            <span className="text-sm font-medium text-slate-200 truncate pr-4">
                                {selectedFile.name}
                            </span>
                        </div>
                        <button
                            onClick={(e) => { e.stopPropagation(); !isLoading && onClear(); }}
                            disabled={isLoading}
                            className="p-2 bg-red-500/20 hover:bg-red-500/40 text-red-200 rounded-lg transition-colors flex-shrink-0"
                            title="Remove image"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
