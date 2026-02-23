'use client';

import { motion } from 'framer-motion';
import ColorizerContainer from '@/components/ColorizerContainer';

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden flex flex-col items-center py-20 px-4 sm:px-6 lg:px-8">
      {/* Background Gradients */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none"
      />
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[40%] left-[50%] translate-x-[-50%] w-[60%] h-[20%] bg-pink-500/10 blur-[100px] rounded-full pointer-events-none"
      />

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-3xl text-center space-y-6 mb-16 relative z-10"
      >
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-indigo-400 drop-shadow-sm pb-2">
          Restore Life to Old Memories
        </h1>
        <p className="text-lg md:text-xl text-slate-300/80 max-w-2xl mx-auto leading-relaxed">
          Bring black-and-white photos to life using state-of-the-art deep learning.
          Upload an image, choose a model, and watch the colors bloom in seconds.
        </p>
      </motion.div>

      {/* Main Interactive Area */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="w-full max-w-5xl relative z-10"
      >
        <ColorizerContainer />
      </motion.div>
    </main>
  );
}
