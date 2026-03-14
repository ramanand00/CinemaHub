import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { Image, Type, Smile, Download, X } from 'lucide-react';

const MovieMemeGenerator = ({ movie, onClose }) => {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [fontSize, setFontSize] = useState(32);
  const canvasRef = useRef(null);

  const generateMeme = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Load and draw movie poster
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = movie.poster_url || 'https://via.placeholder.com/500x700';
    
    img.onload = () => {
      canvas.width = 500;
      canvas.height = 700;
      
      // Draw image
      ctx.drawImage(img, 0, 0, 500, 700);
      
      // Add semi-transparent overlay for text
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fillRect(0, 0, 500, 100);
      ctx.fillRect(0, 600, 500, 100);
      
      // Add text
      ctx.fillStyle = 'white';
      ctx.font = `bold ${fontSize}px Impact`;
      ctx.textAlign = 'center';
      ctx.shadowColor = 'black';
      ctx.shadowBlur = 10;
      
      // Top text
      if (topText) {
        ctx.fillText(topText.toUpperCase(), 250, 70);
      }
      
      // Bottom text
      if (bottomText) {
        ctx.fillText(bottomText.toUpperCase(), 250, 670);
      }
    };
  };

  const downloadMeme = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = `${movie.title}-meme.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
    >
      <div className="glass-morphism rounded-2xl p-6 max-w-2xl w-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Create Movie Meme 🎬</h3>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Preview */}
          <div>
            <canvas
              ref={canvasRef}
              className="w-full rounded-lg shadow-2xl"
            />
          </div>

          {/* Controls */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Top Text</label>
              <input
                type="text"
                value={topText}
                onChange={(e) => {
                  setTopText(e.target.value);
                  setTimeout(generateMeme, 100);
                }}
                className="w-full bg-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter top text..."
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Bottom Text</label>
              <input
                type="text"
                value={bottomText}
                onChange={(e) => {
                  setBottomText(e.target.value);
                  setTimeout(generateMeme, 100);
                }}
                className="w-full bg-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter bottom text..."
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Font Size</label>
              <input
                type="range"
                min="20"
                max="60"
                value={fontSize}
                onChange={(e) => {
                  setFontSize(parseInt(e.target.value));
                  setTimeout(generateMeme, 100);
                }}
                className="w-full"
              />
            </div>

            <button
              onClick={downloadMeme}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition"
            >
              <Download className="w-5 h-5" />
              Download Meme
            </button>

            <p className="text-xs text-gray-400 text-center">
              Made with CinemaHub Meme Generator ✨
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieMemeGenerator;