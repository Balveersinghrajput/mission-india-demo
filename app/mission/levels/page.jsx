'use client'

import { Check, Lock, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const MissionsPage = () => {
  const [levels, setLevels] = useState([]);
  const [showPuzzle, setShowPuzzle] = useState(false);
  const [currentPuzzle, setCurrentPuzzle] = useState(null);
  const [puzzleAnswer, setPuzzleAnswer] = useState('');
  const [timer, setTimer] = useState(325);
  const [message, setMessage] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const initialLevels = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      name: `Level ${i + 1}`,
      locked: true,
      completed: false,
      ready: false,
      agent: getAgentForLevel(i + 1),
      role: getRoleForLevel(i + 1),
      color: getColorForLevel(i + 1),
      puzzle: getPuzzleForLevel(i + 1),
      image: getImageForLevel(i + 1)
    }));
    setLevels(initialLevels);
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const getAgentForLevel = (level) => {
    const agents = ['DIFFUSEMOOSE', 'PHOENIX', 'COCO ROCO', 'REYNA', 'OMEN', 'VIPER', 'SOVA', 'CYPHER', 'BRIMSTONE', 'KILLJOY'];
    return agents[level - 1];
  };

  const getRoleForLevel = (level) => {
    const roles = ['#BALLISTIC', '#GOLD1', '#TECHIE', '#DIAMOND3', '#ASCENDANT1', '#IMMORTAL2', '#RADIANT', '#GOLD2', '#PLAT3', '#DIAMOND1'];
    return roles[level - 1];
  };

  const getColorForLevel = (level) => {
    const colors = [
      { from: '#4c6ef5', to: '#364fc7', glow: 'rgba(76, 110, 245, 0.6)' },
      { from: '#fd7e14', to: '#e8590c', glow: 'rgba(253, 126, 20, 0.6)' },
      { from: '#22b8cf', to: '#1098ad', glow: 'rgba(34, 184, 207, 0.6)' },
      { from: '#be4bdb', to: '#9c36b5', glow: 'rgba(190, 75, 219, 0.6)' },
      { from: '#5c7cfa', to: '#4263eb', glow: 'rgba(92, 124, 250, 0.6)' },
      { from: '#20c997', to: '#12b886', glow: 'rgba(32, 201, 151, 0.6)' },
      { from: '#4dabf7', to: '#339af0', glow: 'rgba(77, 171, 247, 0.6)' },
      { from: '#ffd43b', to: '#fcc419', glow: 'rgba(255, 212, 59, 0.6)' },
      { from: '#ff6b6b', to: '#fa5252', glow: 'rgba(255, 107, 107, 0.6)' },
      { from: '#a78bfa', to: '#8b5cf6', glow: 'rgba(167, 139, 250, 0.6)' }
    ];
    return colors[level - 1];
  };

  const getImageForLevel = (level) => {
    const images = [
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1488161628813-04466f872be2?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1464863979621-258859e62245?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?w=400&h=600&fit=crop'
    ];
    return images[level - 1];
  };

  const getPuzzleForLevel = (level) => {
    const puzzles = [
      { question: "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?", answer: "echo" },
      { question: "What has keys but no locks, space but no room, and you can enter but not go inside?", answer: "keyboard" },
      { question: "I'm tall when I'm young, and I'm short when I'm old. What am I?", answer: "candle" },
      { question: "What can travel around the world while staying in a corner?", answer: "stamp" },
      { question: "The more you take, the more you leave behind. What am I?", answer: "footsteps" },
      { question: "What has a head and a tail but no body?", answer: "coin" },
      { question: "What gets wet while drying?", answer: "towel" },
      { question: "What can fill a room but takes up no space?", answer: "light" },
      { question: "I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?", answer: "map" },
      { question: "What comes once in a minute, twice in a moment, but never in a thousand years?", answer: "m" }
    ];
    return puzzles[level - 1];
  };

  const handleLevelClick = (level, index) => {
    console.log('Click detected on level:', level.id, 'Index:', index, 'Locked:', level.locked, 'Completed:', level.completed);
    
    // Only allow clicking on the center card
    if (index === 1) {
      // Check if previous level is completed (or if this is level 1)
      const previousLevel = levels.find(l => l.id === level.id - 1);
      const canAccessLevel = level.id === 1 || (previousLevel && previousLevel.completed);
      
      console.log('Can access level:', canAccessLevel, 'Previous level completed:', previousLevel?.completed);
      
      // If level is locked and previous level is completed, show puzzle
      if (level.locked && canAccessLevel) {
        console.log('Opening puzzle for level:', level.id);
        setCurrentPuzzle(level);
        setShowPuzzle(true);
        setPuzzleAnswer('');
        setMessage('');
      } else if (level.locked && !canAccessLevel) {
        // Show message that previous level must be completed first
        console.log('Level blocked - previous not completed');
        setMessage('🔒 Complete previous level first!');
        setTimeout(() => setMessage(''), 2000);
      } else if (!level.locked && level.completed) {
        // Level already completed, do nothing or show message
        console.log('Level already completed');
        setMessage('✅ Level already completed!');
        setTimeout(() => setMessage(''), 2000);
      }
    }
  };

  const handlePuzzleSubmit = () => {
    if (puzzleAnswer.toLowerCase().trim() === currentPuzzle.puzzle.answer.toLowerCase()) {
      setMessage('✅ Correct! Level Completed!');
      setTimeout(() => {
        setLevels(prev => prev.map(l => {
          // Mark current level as completed and unlocked
          if (l.id === currentPuzzle.id) {
            return { ...l, locked: false, completed: true };
          }
          return l;
        }));
        setShowPuzzle(false);
        setPuzzleAnswer('');
        setMessage('');
      }, 1500);
    } else {
      setMessage('❌ Incorrect! Try again.');
      setTimeout(() => setMessage(''), 2000);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getVisibleLevels = () => {
    const result = [];
    
    if (currentIndex > 0) {
      result.push(levels[currentIndex - 1]);
    } else {
      result.push(null);
    }
    
    result.push(levels[currentIndex]);
    
    if (currentIndex < levels.length - 1) {
      result.push(levels[currentIndex + 1]);
    } else {
      result.push(null);
    }
    
    return result;
  };

  const visibleLevels = levels.length > 0 ? getVisibleLevels() : [null, null, null];
  
  const handleCardClick = (direction) => {
    if (direction === 'prev' && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else if (direction === 'next' && currentIndex < levels.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1b2a] text-white font-sans relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0d1b2a]/50 to-[#0d1b2a]"></div>
      </div>

      {/* Main Carousel Section */}
      <main className="relative min-h-[calc(100vh-180px)] flex items-center justify-center py-8 lg:py-12">
        {/* Cards Container */}
        <div className="flex items-center justify-center gap-4 lg:gap-6 px-4 lg:px-8 max-w-7xl mx-auto" style={{perspective: '1500px'}}>
          {visibleLevels.map((level, index) => {
            if (!level) return <div key={`empty-${index}`} className="w-64 lg:w-80 opacity-0"></div>;
            
            const isCenter = index === 1;
            const isLeft = index === 0;
            const isRight = index === 2;
            
            return (
              <div
                key={level.id}
                className={`flex-shrink-0 transition-all duration-700 ease-out ${
                  isCenter 
                    ? 'w-80 lg:w-[420px] scale-100 z-20 opacity-100' 
                    : 'w-64 lg:w-80 scale-75 z-10 opacity-60 hover:opacity-80'
                }`}
                onClick={() => {
                  if (isLeft) handleCardClick('prev');
                  else if (isRight) handleCardClick('next');
                  else if (isCenter) handleLevelClick(level, 1);
                }}
                style={{
                  transform: isLeft 
                    ? 'rotateY(15deg) translateX(20px)' 
                    : isRight 
                      ? 'rotateY(-15deg) translateX(-20px)'
                      : 'rotateY(0deg)',
                  cursor: isCenter ? (level.locked ? 'pointer' : 'default') : 'pointer'
                }}
              >
                {/* Top Progress Indicator */}
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="flex-1 h-0.5 bg-gradient-to-r from-transparent via-cyan-500/50 to-cyan-500"></div>
                  <div className="bg-[#1a2633] border-2 border-cyan-500 rounded-full px-4 py-1.5 shadow-lg shadow-cyan-500/30">
                    <span className="text-xs text-white font-bold tabular-nums">{level.id.toString().padStart(3, '0')}</span>
                  </div>
                  <div className="flex-1 h-0.5 bg-gradient-to-l from-transparent via-cyan-500/50 to-cyan-500"></div>
                </div>

                {/* Card */}
                <div 
                  className="relative rounded-lg overflow-hidden shadow-2xl transition-all duration-700 h-[500px] lg:h-[600px]"
                  style={{
                    background: level.locked 
                      ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
                      : `linear-gradient(135deg, ${level.color.from} 0%, ${level.color.to} 100%)`,
                    boxShadow: !level.locked && isCenter ? `0 20px 60px ${level.color.glow}` : '0 10px 40px rgba(0,0,0,0.5)'
                  }}
                >
                  {/* Top Decorative Lines */}
                  <div className="absolute top-0 left-0 right-0 h-20 z-10 pointer-events-none">
                    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                      <line x1="0" y1="0" x2="30%" y2="0" stroke="rgba(255,255,255,0.2)" strokeWidth="2"/>
                      <line x1="70%" y1="0" x2="100%" y2="0" stroke="rgba(255,255,255,0.2)" strokeWidth="2"/>
                      <line x1="10" y1="0" x2="10" y2="40" stroke="rgba(255,255,255,0.2)" strokeWidth="2"/>
                      <line x1="calc(100% - 10px)" y1="0" x2="calc(100% - 10px)" y2="40" stroke="rgba(255,255,255,0.2)" strokeWidth="2"/>
                      <path d="M 50% 5 L 45% 15 L 55% 15 Z" fill="rgba(255,255,255,0.2)"/>
                    </svg>
                  </div>

                  {/* Content Area */}
                  <div className="absolute inset-0 pointer-events-none">
                    {level.locked ? (
                      <div className="h-full flex flex-col items-center justify-center space-y-4 animate-pulse">
                        <div className="w-24 h-24 bg-gray-700/30 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-gray-600/50">
                          <Lock className="w-12 h-12 text-gray-500" />
                        </div>
                        <span className="text-gray-400 font-bold text-base uppercase tracking-wider">Locked</span>
                        {isCenter && level.locked && (
                          <span className="text-gray-600 text-sm text-center px-4">
                            {level.id === 1 || (levels.find(l => l.id === level.id - 1)?.completed) 
                              ? "Click to solve puzzle" 
                              : "Complete previous level first"}
                          </span>
                        )}
                      </div>
                    ) : (
                      <>
                        {/* Full Card Image */}
                        <div className="absolute top-0 left-0 right-0 h-[calc(100%-100px)] overflow-hidden">
                          <img 
                            src={level.image} 
                            alt={level.agent}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {/* Gradient Overlay for better text readability */}
                        <div className="absolute top-0 left-0 right-0 h-[calc(100%-100px)] bg-gradient-to-b from-black/20 via-transparent to-black/60"></div>
                        
                        {level.ready && (
                          <div className="absolute top-0 left-0 right-0 h-[calc(100%-100px)] flex items-center justify-center bg-black/40 z-10">
                            <div className="bg-white/90 backdrop-blur-sm px-10 py-4 rounded-full border-2 border-white shadow-xl animate-pulse">
                              <span className="text-gray-900 font-bold text-xl uppercase tracking-widest">Ready</span>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* Agent Info Bar */}
                  <div className="absolute bottom-20 left-0 right-0 bg-black/90 backdrop-blur-md py-3 px-4 border-t-2 border-white/10 pointer-events-none z-10">
                    <p className="text-center text-white font-bold text-sm uppercase tracking-widest truncate">{level.agent}</p>
                    <p className="text-center text-gray-400 text-xs uppercase mt-0.5 tracking-wide">{level.role}</p>
                  </div>

                  {/* Bottom Status Indicator */}
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none">
                    <div 
                      className={`w-12 h-12 rounded-full flex items-center justify-center shadow-xl border-2 transition-all duration-300 ${
                        level.completed 
                          ? 'bg-green-500 border-green-300 animate-bounce' 
                          : level.locked 
                            ? 'bg-gray-600 border-gray-500' 
                            : 'bg-purple-500 border-purple-300 animate-pulse'
                      }`}
                    >
                      {level.completed ? (
                        <Check className="w-6 h-6 text-white" />
                      ) : level.locked ? (
                        <Lock className="w-5 h-5 text-white" />
                      ) : (
                        <div className="w-4 h-4 bg-white rounded-full"></div>
                      )}
                    </div>
                  </div>

                  {/* Bottom Arrow Decoration */}
                  <div className="absolute bottom-0 left-0 right-0 w-full h-20 overflow-visible pointer-events-none z-10">
                    <svg className="w-full h-full" viewBox="0 0 96 80" preserveAspectRatio="none">
                      <path d="M0,0 L36,48 L48,60 L60,48 L96,0" fill="rgba(0,0,0,0.5)" stroke="rgba(6, 6, 6, 0.15)" strokeWidth="5.5"/>
                    </svg>
                  </div>

                  {/* Corner Decorations */}
                  <div className="absolute bottom-24 left-3 w-10 h-10 border-l-2 border-b-2 border-white/20 pointer-events-none z-10"></div>
                  <div className="absolute bottom-24 right-3 w-10 h-10 border-r-2 border-b-2 border-white/20 pointer-events-none z-10"></div>
                </div>

                {/* Bottom Label */}
                <div className="flex justify-center mt-4">
                  <div className="text-xs text-gray-500 bg-[#0f1923]/80 px-4 py-1 rounded-full border border-gray-700/50">
                    TASK
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Puzzle Modal */}
      {showPuzzle && currentPuzzle && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1a2633] border-2 border-cyan-500 rounded-lg p-6 lg:p-8 max-w-lg w-full shadow-2xl shadow-cyan-500/50">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-xl lg:text-2xl font-bold text-white uppercase tracking-wider">Unlock Challenge</h2>
              <button 
                onClick={() => setShowPuzzle(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="mb-6">
              <div className="bg-[#0f1923] border border-cyan-500/30 rounded-lg p-4 mb-4">
                <p className="text-cyan-400 text-sm uppercase font-bold mb-2">Level {currentPuzzle.id}</p>
                <p className="text-white text-base leading-relaxed">{currentPuzzle.puzzle.question}</p>
              </div>
              
              <input
                type="text"
                value={puzzleAnswer}
                onChange={(e) => setPuzzleAnswer(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handlePuzzleSubmit()}
                placeholder="Type your answer..."
                className="w-full bg-[#0f1923] border-2 border-gray-700 focus:border-cyan-500 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-colors"
              />
            </div>

            {message && (
              <div className={`mb-4 p-3 rounded-lg text-center font-bold ${
                message.includes('Correct') ? 'bg-green-500/20 text-green-400 border border-green-500' : 'bg-red-500/20 text-red-400 border border-red-500'
              }`}>
                {message}
              </div>
            )}

            <button
              onClick={handlePuzzleSubmit}
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 rounded-lg uppercase tracking-wider transition-colors shadow-lg shadow-cyan-500/30"
            >
              Submit Answer
            </button>

            <div className="mt-4 text-center text-gray-400 text-xs">
              <p>Hint: Think carefully about the riddle</p>
            </div>
          </div>
        </div>
      )}

      {/* Error Message for blocked levels */}
      {message && !showPuzzle && (
        <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-red-500/20 text-red-400 border border-red-500 px-6 py-3 rounded-lg font-bold shadow-xl">
            {message}
          </div>
        </div>
      )}
    </div>
  );
};

export default MissionsPage;