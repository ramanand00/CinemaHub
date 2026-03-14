import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Users, MessageCircle, Smile, Send, X, Copy, Check } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';

const WatchParty = ({ movie, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const [partyCode, setPartyCode] = useState('CINEMA-' + Math.random().toString(36).substr(2, 8).toUpperCase());
  const [copied, setCopied] = useState(false);
  const [participants, setParticipants] = useState(1);

  // Simulate real-time messages
  useEffect(() => {
    const demoMessages = [
      { id: 1, user: 'Alex', text: 'This scene is epic! 🔥', time: '2:30 PM' },
      { id: 2, user: 'Sam', text: 'Best movie ever! 🍿', time: '2:31 PM' },
      { id: 3, user: 'Jordan', text: 'The twist at the end though... 🤯', time: '2:32 PM' },
    ];
    setMessages(demoMessages);
  }, []);

  const copyPartyCode = () => {
    navigator.clipboard.writeText(partyCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const addEmoji = (emoji) => {
    setNewMessage(prev => prev + emoji.emoji);
    setShowEmoji(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed bottom-24 right-6 w-96 glass-morphism rounded-2xl overflow-hidden z-50"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            <span className="font-bold">Watch Party</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm bg-white/20 px-2 py-1 rounded-full">
              {participants} watching
            </span>
            <button onClick={onClose} className="hover:bg-white/20 rounded-full p-1">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {/* Party Code */}
        <div className="mt-2 flex items-center gap-2 bg-white/10 rounded-lg p-2">
          <code className="text-sm flex-1">{partyCode}</code>
          <button 
            onClick={copyPartyCode}
            className="hover:bg-white/20 rounded p-1"
          >
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="h-64 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-start gap-2"
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-xs">
              {msg.user[0]}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">{msg.user}</span>
                <span className="text-xs text-gray-400">{msg.time}</span>
              </div>
              <p className="text-sm text-gray-300">{msg.text}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowEmoji(!showEmoji)}
            className="p-2 hover:bg-white/10 rounded-full"
          >
            <Smile className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-white/10 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button className="p-2 bg-purple-500 rounded-full hover:bg-purple-600">
            <Send className="w-4 h-4" />
          </button>
        </div>
        
        {/* Emoji Picker */}
        <AnimatePresence>
          {showEmoji && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-20 right-4"
            >
              <EmojiPicker onEmojiClick={addEmoji} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default WatchParty;