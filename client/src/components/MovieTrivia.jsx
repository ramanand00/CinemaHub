import { motion } from 'framer-motion';
import { useState } from 'react';
import { HelpCircle, Award, ChevronRight, RefreshCw } from 'lucide-react';

const MovieTrivia = ({ movie }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // Sample trivia questions (in real app, fetch from API)
  const trivia = [
    {
      question: "What year was this movie released?",
      options: ["2019", "2020", "2021", "2022"],
      correct: 2
    },
    {
      question: "Who directed this movie?",
      options: ["Rajkumar Hirani", "Sanjay Leela Bhansali", "Kabir Khan", "Rohit Shetty"],
      correct: 0
    },
    {
      question: "What is the main actor's name?",
      options: ["Shah Rukh Khan", "Salman Khan", "Aamir Khan", "Ranbir Kapoor"],
      correct: 2
    }
  ];

  const handleAnswer = (index) => {
    setSelectedAnswer(index);
    
    if (index === trivia[currentQuestion].correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < trivia.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
  };

  if (showResult) {
    const percentage = (score / trivia.length) * 100;
    
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-morphism rounded-2xl p-6 text-center"
      >
        <Award className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-2">Quiz Complete! 🎉</h3>
        <p className="text-4xl font-bold text-gradient mb-4">{score}/{trivia.length}</p>
        <p className="text-gray-300 mb-6">{percentage}% - {percentage >= 80 ? 'Movie Expert!' : 'Movie Fan!'}</p>
        <button
          onClick={resetQuiz}
          className="flex items-center gap-2 mx-auto px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full hover:opacity-90 transition"
        >
          <RefreshCw className="w-4 h-4" />
          Play Again
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-morphism rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-purple-400" />
          <h3 className="font-semibold">Movie Trivia</h3>
        </div>
        <span className="text-sm text-gray-400">
          Question {currentQuestion + 1}/{trivia.length}
        </span>
      </div>

      <h4 className="text-lg mb-4">{trivia[currentQuestion].question}</h4>

      <div className="space-y-3">
        {trivia[currentQuestion].options.map((option, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: selectedAnswer === null ? 1.02 : 1 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => selectedAnswer === null && handleAnswer(index)}
            disabled={selectedAnswer !== null}
            className={`w-full p-3 rounded-lg text-left transition-all flex items-center justify-between ${
              selectedAnswer === index
                ? index === trivia[currentQuestion].correct
                  ? 'bg-green-500/30 border border-green-500'
                  : 'bg-red-500/30 border border-red-500'
                : selectedAnswer !== null && index === trivia[currentQuestion].correct
                ? 'bg-green-500/30 border border-green-500'
                : 'bg-white/5 hover:bg-white/10'
            }`}
          >
            <span>{option}</span>
            {selectedAnswer === index && (
              <ChevronRight className={`w-4 h-4 ${
                index === trivia[currentQuestion].correct ? 'text-green-400' : 'text-red-400'
              }`} />
            )}
          </motion.button>
        ))}
      </div>

      <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${((currentQuestion + 1) / trivia.length) * 100}%` }}
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
        />
      </div>
    </motion.div>
  );
};

export default MovieTrivia;