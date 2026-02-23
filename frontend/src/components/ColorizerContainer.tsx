'use client';

import { useState } from 'react';
import axios from 'axios';
import { Download, RefreshCw, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import UploadBox from './UploadBox';
import ComparisonSlider from './ComparisonSlider';

export default function ColorizerContainer() {
    const [file, setFile] = useState<File | null>(null);
    const [model, setModel] = useState<'siggraph17' | 'eccv16'>('siggraph17');
    const [colorizedImage, setColorizedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);

    const handleFileSelect = (selectedFile: File) => {
        setFile(selectedFile);
        setOriginalImageUrl(URL.createObjectURL(selectedFile));
        setColorizedImage(null); // Reset colorized image completely
    };

    const handleClear = () => {
        setFile(null);
        setOriginalImageUrl(null);
        setColorizedImage(null);
    };

    const handleColorize = async () => {
        if (!file) return;

        setIsLoading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('version', model);

        try {
            const response = await axios.post('http://localhost:8000/colorize', formData, {
                responseType: 'blob',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const url = URL.createObjectURL(response.data);
            setColorizedImage(url);
        } catch (error) {
            console.error('Error colorizing image:', error);
            alert('Failed to colorize image. Make sure the backend is running on port 8000.');
        } finally {
            setIsLoading(false);
        }
    };

    const downloadImage = () => {
        if (!colorizedImage) return;
        const a = document.createElement('a');
        a.href = colorizedImage;
        a.download = `colorized_${model}_${file?.name || 'result.png'}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <div className="flex flex-col space-y-8 w-full">
            {/* Model Selection Group */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col sm:flex-row items-center justify-between p-6 glass-card rounded-2xl w-full"
            >
                <div className="flex items-center space-x-3 mb-4 sm:mb-0">
                    <div className="bg-purple-500/20 p-2 rounded-lg">
                        <Layers className="text-purple-400 w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-slate-100">AI Engine</h3>
                        <p className="text-sm text-slate-400">Select colorization model</p>
                    </div>
                </div>

                <div className="flex p-1 bg-slate-950/50 rounded-xl border border-white/5 w-full sm:w-auto relative">
                    <button
                        onClick={() => setModel('siggraph17')}
                        className={`relative flex-1 sm:flex-none px-6 py-2.5 rounded-lg text-sm font-medium transition-colors duration-300 z-10 ${model === 'siggraph17' ? 'text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                            }`}
                    >
                        Model 1
                        <span className="block text-[10px] opacity-70 mt-0.5">Vibrant / Natural Scenes</span>
                        {model === 'siggraph17' && (
                            <motion.div
                                layoutId="active-model"
                                className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg -z-10 shadow-lg"
                            />
                        )}
                    </button>

                    <button
                        onClick={() => setModel('eccv16')}
                        className={`relative flex-1 sm:flex-none px-6 py-2.5 rounded-lg text-sm font-medium transition-colors duration-300 z-10 ${model === 'eccv16' ? 'text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                            }`}
                    >
                        Model 2
                        <span className="block text-[10px] opacity-70 mt-0.5">Classic / Original Model</span>
                        {model === 'eccv16' && (
                            <motion.div
                                layoutId="active-model"
                                className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg -z-10 shadow-lg"
                            />
                        )}
                    </button>
                </div>
            </motion.div>

            {/* Main Content Area */}
            <div className="flex flex-col items-center justify-center w-full min-h-[400px]">
                <AnimatePresence mode="wait">
                    {colorizedImage && originalImageUrl ? (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.5, type: 'spring' }}
                            className="w-full flex flex-col space-y-6"
                        >
                            <ComparisonSlider originalImage={originalImageUrl} colorizedImage={colorizedImage} />

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                                <button
                                    onClick={downloadImage}
                                    className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all hover:scale-105"
                                >
                                    <Download className="w-5 h-5" />
                                    <span className="font-semibold">Save High-Res Image</span>
                                </button>

                                <button
                                    onClick={handleClear}
                                    className="flex items-center space-x-2 px-8 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 rounded-xl transition-all hover:scale-105"
                                >
                                    <RefreshCw className="w-5 h-5" />
                                    <span className="font-semibold">Start Over</span>
                                </button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="upload"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                            className="w-full max-w-2xl mx-auto flex flex-col items-center space-y-8"
                        >
                            <UploadBox
                                onFileSelect={handleFileSelect}
                                selectedFile={file}
                                onClear={handleClear}
                                isLoading={isLoading}
                            />

                            {file && !isLoading && (
                                <motion.button
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleColorize}
                                    className="group relative inline-flex items-center justify-center px-10 py-4 font-bold text-white transition-all duration-200 bg-purple-600 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-600 shadow-[0_0_30px_rgba(168,85,247,0.4)] w-full sm:w-auto overflow-hidden"
                                >
                                    <span className="relative z-10 flex items-center space-x-2 text-lg">
                                        Colorize Image Now
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </motion.button>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
