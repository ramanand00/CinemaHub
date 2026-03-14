import { motion } from 'framer-motion';
import { useState } from 'react';
import { Sparkles, Smile, Frown, Heart, Zap, Coffee, Moon, Sunset } from 'lucide-react';

const moods = [
  { id: 'happy', icon: Smile, label: 'Happy', color: 'from-yellow-400 to-orange-400', bg: 'bg-yellow-500' },
  { id: 'sad', icon: Frown, label: 'Sad', color: 'from-blue-400 to-indigo-400', bg: 'bg-blue-500' },
  { id: 'romantic', icon: Heart, label: 'Romantic', color: 'from-red-400 to-pink-400', bg: 'bg-red-500' },
  { id: 'energetic', icon: Zap, label: 'Energetic', color: 'from-purple-400 to-pink-400', bg: 'bg-purple-500' },
  { id: 'chill', icon: Coffee, label: 'Chill', color: 'from-green-400 to-teal-400', bg: 'bg-green-500' },
  { id: 'midnight', icon: Moon, label: 'Midnight', color: 'from-indigo-400 to-purple-400', bg: 'bg-indigo-500' },
];

const MoodMatcher = ({ onMoodSelect }) => {
  const [selectedMood, setSelectedMood] = useState(null);

  const handleMoodClick = (mood) => {
    setSelectedMood(mood.id);
    onMoodSelect(mood);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-morphism rounded-2xl p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-purple-400" />
        <h3 className="text-lg font-semibold">How are you feeling?</h3>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {moods.map((mood) => {
          const Icon = mood.icon;
          const isSelected = selectedMood === mood.id;
          
          return (
            <motion.button
              key={mood.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleMoodClick(mood)}
              className={`relative overflow-hidden rounded-xl p-4 transition-all ${
                isSelected 
                  ? `bg-gradient-to-r ${mood.color} text-white`
                  : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              <Icon className={`w-6 h-6 mx-auto mb-2 ${isSelected ? 'text-white' : 'text-gray-400'}`} />
              <span className="text-xs font-medium">{mood.label}</span>
              
              {isSelected && (
                <motion.div
                  layoutId="moodGlow"
                  className={`absolute inset-0 ${mood.bg} opacity-20`}
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {selectedMood && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-sm text-gray-300 text-center"
        >
          Finding the perfect {moods.find(m => m.id === selectedMood)?.label.toLowerCase()} movies for you...
        </motion.p>
      )}
    </motion.div>
  );
};

export default MoodMatcher;