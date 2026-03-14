import { motion } from 'framer-motion';
import { useState } from 'react';
import { ThumbsUp, ThumbsDown, Laugh, Heart, PartyPopper, Angry, Frown } from 'lucide-react';

const reactions = [
  { id: 'like', icon: ThumbsUp, label: 'Like', color: 'text-blue-400' },
  { id: 'love', icon: Heart, label: 'Love', color: 'text-red-400' },
  { id: 'laugh', icon: Laugh, label: 'Laugh', color: 'text-yellow-400' },
  { id: 'wow', icon: PartyPopper, label: 'Wow', color: 'text-purple-400' },
  { id: 'sad', icon: Frown, label: 'Sad', color: 'text-indigo-400' },
  { id: 'angry', icon: Angry, label: 'Angry', color: 'text-orange-400' },
];

const ReactionBar = ({ movieId }) => {
  const [selectedReaction, setSelectedReaction] = useState(null);
  const [reactionCounts, setReactionCounts] = useState({
    like: 245,
    love: 189,
    laugh: 156,
    wow: 98,
    sad: 45,
    angry: 12,
  });

  const handleReaction = (reactionId) => {
    if (selectedReaction === reactionId) {
      setReactionCounts(prev => ({
        ...prev,
        [reactionId]: prev[reactionId] - 1
      }));
      setSelectedReaction(null);
    } else {
      if (selectedReaction) {
        setReactionCounts(prev => ({
          ...prev,
          [selectedReaction]: prev[selectedReaction] - 1,
          [reactionId]: prev[reactionId] + 1
        }));
      } else {
        setReactionCounts(prev => ({
          ...prev,
          [reactionId]: prev[reactionId] + 1
        }));
      }
      setSelectedReaction(reactionId);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {reactions.map((reaction) => {
        const Icon = reaction.icon;
        const count = reactionCounts[reaction.id];
        const isSelected = selectedReaction === reaction.id;

        return (
          <motion.button
            key={reaction.id}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleReaction(reaction.id)}
            className={`flex items-center gap-1 px-3 py-2 rounded-full transition-all ${
              isSelected 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'bg-white/5 hover:bg-white/10'
            }`}
          >
            <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : reaction.color}`} />
            <span className="text-sm font-medium">{count}</span>
          </motion.button>
        );
      })}
    </div>
  );
};

export default ReactionBar;