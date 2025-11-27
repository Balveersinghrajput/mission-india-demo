'use client'

import { ArrowLeft, ArrowRight, Award, Target, Trophy, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const TaskPage = () => {
  const router = useRouter();
  const [currentTask, setCurrentTask] = useState(null);
  const [taskAnswer, setTaskAnswer] = useState('');
  const [taskMessage, setTaskMessage] = useState('');
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [animationPhase, setAnimationPhase] = useState('entering'); // 'entering', 'ready', 'completing'

  // Primary blue color scheme
  const blueColor = {
    from: '#4c6ef5',
    to: '#364fc7',
    glow: 'rgba(76, 110, 245, 0.6)'
  };

  useEffect(() => {
    // Load current mission level data from localStorage
    if (typeof window !== 'undefined') {
      const levelData = localStorage.getItem('currentMissionLevel');
      if (levelData) {
        setCurrentTask(JSON.parse(levelData));
        
        // Show entering animation for 2.5 seconds
        setTimeout(() => {
          setAnimationPhase('ready');
        }, 2500);
      } else {
        // If no level data, redirect back to missions
        router.push('/mission/levels');
      }
    }
  }, [router]);

  const handleTaskSubmit = () => {
    if (!currentTask) return;

    if (taskAnswer.toLowerCase().trim() === currentTask.task.answer.toLowerCase()) {
      setTaskMessage('✅ Task Completed! Level Unlocked!');
      setShowSuccessAnimation(true);
      
      setTimeout(() => {
        setShowSuccessAnimation(false);
        setAnimationPhase('completing');
        
        setTimeout(() => {
          // Update mission progress in localStorage
          if (typeof window !== 'undefined') {
            const savedProgress = localStorage.getItem('missionProgress');
            const progress = savedProgress ? JSON.parse(savedProgress) : {};
            
            progress[currentTask.id] = {
              locked: false,
              completed: true
            };
            
            localStorage.setItem('missionProgress', JSON.stringify(progress));
            
            // Clear current mission level
            localStorage.removeItem('currentMissionLevel');
          }
          
          // Navigate back to missions after animation
          router.push('/mission/levels');
        }, 2500);
      }, 2000);
    } else {
      setTaskMessage('❌ Incorrect! Try again.');
      setTimeout(() => setTaskMessage(''), 2000);
    }
  };

  const handleBackToMissions = () => {
    // Show completing animation before going back
    setAnimationPhase('completing');
    
    setTimeout(() => {
      // Clear current mission level and go back
      if (typeof window !== 'undefined') {
        localStorage.removeItem('currentMissionLevel');
      }
      router.push('/mission/levels');
    }, 2500);
  };

  if (!currentTask) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0d1b2a] via-[#1a2633] to-[#0d1b2a] flex items-center justify-center">
        <div className="text-white text-xl">Loading mission...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d1b2a] via-[#1a2633] to-[#0d1b2a] text-white relative overflow-hidden">
 {/* Vault Door Opening Animation */}
      {animationPhase === 'entering' && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-black">
          {/* Outer Rotating Ring */}
          <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            style={{
              width: 'min(90vw, 90vh)',
              height: 'min(90vw, 90vh)',
              animation: 'outerRingRotate 2.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards'
            }}
          >
            <div 
              className="absolute inset-0 rounded-full border-8"
              style={{
                borderColor: blueColor.from,
                boxShadow: `0 0 40px ${blueColor.glow}, inset 0 0 40px ${blueColor.glow}`
              }}
            >
              {/* Ring Segments */}
              {[...Array(12)].map((_, i) => (
                <div
                  key={`ring-segment-${i}`}
                  className="absolute top-1/2 left-1/2 origin-left"
                  style={{
                    width: '50%',
                    height: '4px',
                    background: `linear-gradient(90deg, ${blueColor.from} 0%, transparent 100%)`,
                    transform: `translate(-100%, -50%) rotate(${i * 30}deg)`,
                    opacity: 0.6
                  }}
                />
              ))}
            </div>
          </div>

          {/* Middle Rotating Ring */}
          <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            style={{
              width: 'min(70vw, 70vh)',
              height: 'min(70vw, 70vh)',
              animation: 'middleRingRotate 2.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards'
            }}
          >
            <div 
              className="absolute inset-0 rounded-full border-6"
              style={{
                borderColor: blueColor.to,
                boxShadow: `0 0 30px ${blueColor.glow}, inset 0 0 30px ${blueColor.glow}`
              }}
            >
              {/* Bolts */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={`bolt-${i}`}
                  className="absolute rounded-full"
                  style={{
                    width: '20px',
                    height: '20px',
                    background: `linear-gradient(135deg, ${blueColor.from} 0%, ${blueColor.to} 100%)`,
                    top: '50%',
                    left: '50%',
                    transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-${Math.min(35, 30)}vw)`,
                    boxShadow: `0 0 15px ${blueColor.glow}`
                  }}
                >
                  <div className="absolute inset-2 rounded-full bg-black"></div>
                </div>
              ))}
            </div>
          </div>



          {/* Energy Core */}
          <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            style={{
              width: 'min(25vw, 25vh)',
              height: 'min(25vw, 25vh)',
              animation: 'coreExpand 2.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards'
            }}
          >
            <div 
              className="absolute inset-0 rounded-full"
              style={{
                background: `radial-gradient(circle, ${blueColor.from} 0%, ${blueColor.to} 50%, transparent 70%)`,
                boxShadow: `0 0 60px ${blueColor.glow}, 0 0 120px ${blueColor.glow}, inset 0 0 60px ${blueColor.glow}`
              }}
            />
            {/* Pulsing Rings */}
            {[...Array(3)].map((_, i) => (
              <div
                key={`pulse-ring-${i}`}
                className="absolute inset-0 rounded-full border-2"
                style={{
                  borderColor: blueColor.from,
                  animation: `pulseRing 1.5s ease-out infinite`,
                  animationDelay: `${i * 0.5}s`
                }}
              />
            ))}
          </div>



          {/* Particle Effects */}
          {[...Array(30)].map((_, i) => (
            <div
              key={`particle-${i}`}
              className="absolute w-1 h-1 rounded-full"
              style={{
                backgroundColor: blueColor.from,
                top: '50%',
                left: '50%',
                animation: `particleFloat 2.5s ease-out forwards`,
                animationDelay: `${1 + Math.random() * 0.5}s`,
                boxShadow: `0 0 10px ${blueColor.glow}`
              }}
            />
          ))}

          {/* Center Content */}
          <div 
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-4 z-30"
            style={{
              animation: 'contentFadeIn 2.5s ease-out forwards',
              opacity: 0
            }}
          >
            <div 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-3 sm:mb-4 md:mb-6"
              style={{
                color: blueColor.from,
                textShadow: `0 0 30px ${blueColor.glow}, 0 0 60px ${blueColor.glow}`,
                animation: 'textGlowHold 3.5s ease-in-out forwards'
              }}
            >
              {currentTask.id}
            </div>
            <div 
              className="flex items-center gap-2 mb-2 sm:mb-3"
              style={{
                animation: 'levelTextExtendedHold 5.5s ease-out forwards'
              }}
            >
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" style={{ color: blueColor.from }} />
              <div 
                className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold uppercase tracking-widest"
                style={{ color: blueColor.from }}
              >
                Level {currentTask.id}
              </div>
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" style={{ color: blueColor.from }} />
            </div>
            <div 
              className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-400"
              style={{
                animation: 'vaultTextHold 3.5s ease-in-out forwards'
              }}
            >
              Vault Unlocking...
            </div>
          </div>
          
          <style jsx>{`
            @keyframes outerRingRotate {
              0% { transform: translate(-50%, -50%) rotate(0deg) scale(1); }
              55% { transform: translate(-50%, -50%) rotate(180deg) scale(1.5); opacity: 0; }
              100% { transform: translate(-50%, -50%) rotate(180deg) scale(1.5); opacity: 0; }
            }
            @keyframes middleRingRotate {
              0% { transform: translate(-50%, -50%) rotate(0deg) scale(1); }
              55% { transform: translate(-50%, -50%) rotate(-270deg) scale(1.3); opacity: 0; }
              100% { transform: translate(-50%, -50%) rotate(-270deg) scale(1.3); opacity: 0; }
            }
            @keyframes coreExpand {
              0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
              30% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
              55% { transform: translate(-50%, -50%) scale(3); opacity: 0; }
              100% { transform: translate(-50%, -50%) scale(3); opacity: 0; }
            }
            @keyframes pulseRing {
              0% { transform: scale(0.8); opacity: 1; }
              100% { transform: scale(1.5); opacity: 0; }
            }
            @keyframes particleFloat {
              0% { 
                transform: translate(-50%, -50%) translate(0, 0) scale(0); 
                opacity: 0; 
              }
              20% { opacity: 1; }
              55% { 
                transform: translate(-50%, -50%) translate(
                  ${Math.cos(Math.random() * Math.PI * 2) * 200}px, 
                  ${Math.sin(Math.random() * Math.PI * 2) * 200}px
                ) scale(1); 
                opacity: 0; 
              }
              100% { 
                transform: translate(-50%, -50%) translate(
                  ${Math.cos(Math.random() * Math.PI * 2) * 200}px, 
                  ${Math.sin(Math.random() * Math.PI * 2) * 200}px
                ) scale(1); 
                opacity: 0; 
              }
            }
            @keyframes contentFadeIn {
              0% { opacity: 0; transform: scale(0.8); }
              60% { opacity: 0; transform: scale(0.8); }
              100% { opacity: 1; transform: scale(1); }
            }
            @keyframes levelTextHold {
              0% { opacity: 0; transform: scale(0.8); }
              40% { opacity: 0; transform: scale(0.8); }
              55% { opacity: 1; transform: scale(1); }
              100% { opacity: 1; transform: scale(1); }
            }
            @keyframes levelTextExtendedHold {
              0% { opacity: 0; transform: scale(0.8); }
              25% { opacity: 0; transform: scale(0.8); }
              45% { opacity: 1; transform: scale(1); }
              100% { opacity: 1; transform: scale(1); }
            }
            @keyframes textGlowHold {
              0% { opacity: 0; }
              40% { opacity: 0; }
              50% { opacity: 1; }
              70% { opacity: 0.8; }
              85% { opacity: 1; }
              100% { opacity: 1; }
            }
            @keyframes vaultTextHold {
              0% { opacity: 0; }
              40% { opacity: 0; }
              50% { opacity: 1; }
              65% { opacity: 0.6; }
              80% { opacity: 1; }
              100% { opacity: 1; }
            }
            @keyframes textGlow {
              0%, 100% { opacity: 0.8; }
              50% { opacity: 1; }
            }
          `}</style>
        </div>
      
      )}

      {/* Portal Exit Animation */}
      {animationPhase === 'completing' && (
        <div className="fixed inset-0 bg-black z-[100] flex items-center justify-center overflow-hidden">
          {/* Imploding circles */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full border-4"
              style={{
                width: `${(5 - i) * 20}%`,
                height: `${(5 - i) * 20}%`,
                borderColor: i % 2 === 0 ? blueColor.from : blueColor.to,
                animation: `implode 2s ease-in forwards`,
                animationDelay: `${i * 0.1}s`,
                boxShadow: `0 0 40px ${blueColor.glow}`
              }}
            ></div>
          ))}
          
          {/* Success particles */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 sm:w-2 sm:h-2 rounded-full"
              style={{
                backgroundColor: i % 3 === 0 ? '#ffd700' : blueColor.from,
                top: '50%',
                left: '50%',
                animation: `successParticle${i} 2s ease-out forwards`,
                boxShadow: `0 0 10px ${i % 3 === 0 ? '#ffd700' : blueColor.glow}`
              }}
            ></div>
          ))}
          
          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-4">
            <Trophy 
              className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 mb-3 sm:mb-4 md:mb-6 animate-bounce" 
              style={{ 
                color: '#ffd700',
                filter: 'drop-shadow(0 0 20px #ffd700)'
              }} 
            />
            <div 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-widest mb-2 sm:mb-3"
              style={{
                color: blueColor.from,
                textShadow: `0 0 30px ${blueColor.glow}`,
                animation: 'fadeInOut 2s ease-in-out'
              }}
            >
              Mission Complete
            </div>
            <div className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-400 animate-pulse">
              Returning to Base...
            </div>
          </div>
          
          <style jsx>{`
            @keyframes implode {
              0% {
                transform: scale(1);
                opacity: 1;
              }
              100% {
                transform: scale(0);
                opacity: 0;
              }
            }
            @keyframes fadeInOut {
              0%, 100% { opacity: 0; }
              50% { opacity: 1; }
            }
            ${[...Array(20)].map((_, i) => {
              const angle = (i * 18) * Math.PI / 180;
              const distance = 100 + Math.random() * 100;
              return `
                @keyframes successParticle${i} {
                  0% {
                    transform: translate(-50%, -50%) translate(0, 0) scale(0);
                    opacity: 0;
                  }
                  30% {
                    opacity: 1;
                  }
                  100% {
                    transform: translate(-50%, -50%) translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(1);
                    opacity: 0;
                  }
                }
              `;
            }).join('')}
          `}</style>
        </div>
      )}

      {/* Success Animation Overlay */}
      {showSuccessAnimation && animationPhase === 'ready' && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="text-center animate-bounce px-4">
            <div 
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6"
              style={{
                backgroundColor: blueColor.from,
                boxShadow: `0 0 80px ${blueColor.glow}, 0 0 120px ${blueColor.glow}`
              }}
            >
              <Trophy className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white uppercase tracking-wider mb-2">
              Mission Complete!
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl" style={{ color: blueColor.from }}>
              Level {currentTask.id} Unlocked!
            </p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className={`relative min-h-screen flex items-center justify-center p-3 sm:p-4 lg:p-8 transition-opacity duration-500 ${animationPhase !== 'ready' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className="max-w-5xl w-full">
          {/* Back Button */}
          <button
            onClick={handleBackToMissions}
            className="mb-3 sm:mb-4 md:mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs sm:text-sm md:text-base">Back to Missions</span>
          </button>

          {/* Header */}
          <div className="text-center mb-4 sm:mb-6 md:mb-8 lg:mb-12">
            <div 
              className="inline-block border-2 rounded-full px-3 sm:px-4 md:px-6 py-1 sm:py-1.5 md:py-2 mb-2 sm:mb-3 md:mb-4"
              style={{
                backgroundColor: `${blueColor.from}20`,
                borderColor: blueColor.from,
                boxShadow: `0 0 20px ${blueColor.glow}`
              }}
            >
              <span 
                className="font-bold text-[10px] sm:text-xs md:text-sm uppercase tracking-wider"
                style={{ color: blueColor.from }}
              >
                Level {currentTask.id} - Mission
              </span>
            </div>
            
            <h1 
              className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-3 md:mb-4 uppercase tracking-wider px-2 sm:px-4"
              style={{
                background: `linear-gradient(135deg, ${blueColor.from} 0%, ${blueColor.to} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              {currentTask.task.title}
            </h1>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 md:gap-6 text-gray-400 text-xs sm:text-sm px-2 sm:px-4">
              <div className="flex items-center gap-2">
                <div 
                  className="w-2 h-2 md:w-3 md:h-3 rounded-full animate-pulse"
                  style={{ backgroundColor: blueColor.from }}
                ></div>
                <span>{currentTask.agent}</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-yellow-500" />
                <span className="text-center sm:text-left">Complete to unlock next level</span>
              </div>
            </div>
          </div>

          {/* Task Card */}
          <div 
            className="border-2 rounded-lg sm:rounded-xl shadow-2xl overflow-hidden"
            style={{
              backgroundColor: '#1a2633',
              borderColor: `${blueColor.from}80`,
              boxShadow: `0 20px 60px ${blueColor.glow}`
            }}
          >
            <div 
              className="border-b-2 px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-5"
              style={{
                background: `linear-gradient(135deg, ${blueColor.from}30 0%, ${blueColor.to}30 100%)`,
                borderColor: `${blueColor.from}80`
              }}
            >
              <h2 className="text-base sm:text-xl md:text-2xl lg:text-3xl font-bold text-white uppercase tracking-wide flex items-center gap-2 md:gap-3">
                <Target 
                  className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                  style={{ color: blueColor.from }}
                />
                Challenge Brief
              </h2>
            </div>
            
            <div className="p-3 sm:p-4 md:p-6 lg:p-10">
              {/* Mission Description */}
              <div 
                className="border rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 lg:p-8 mb-4 sm:mb-6 md:mb-8"
                style={{
                  backgroundColor: '#0f1923',
                  borderColor: `${blueColor.from}50`
                }}
              >
                <div className="flex items-start gap-2 sm:gap-3 md:gap-4 mb-2 sm:mb-3 md:mb-4">
                  <div 
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${blueColor.from} 0%, ${blueColor.to} 100%)`,
                      boxShadow: `0 0 20px ${blueColor.glow}`
                    }}
                  >
                    <span className="text-base sm:text-xl md:text-2xl">🎯</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 
                      className="font-bold text-[10px] sm:text-xs md:text-sm uppercase tracking-wider mb-1 sm:mb-2"
                      style={{ color: blueColor.from }}
                    >
                      Objective
                    </h3>
                    <p className="text-white text-sm sm:text-base md:text-lg lg:text-2xl leading-relaxed font-medium break-words">
                      {currentTask.task.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Answer Input */}
              <div className="space-y-2 sm:space-y-3 md:space-y-4 mb-3 sm:mb-4 md:mb-6">
                <label 
                  className="block font-bold text-[10px] sm:text-xs md:text-sm uppercase tracking-wide mb-1 sm:mb-2 md:mb-3"
                  style={{ color: blueColor.from }}
                >
                  Your Answer
                </label>
                <input
                  type="text"
                  value={taskAnswer}
                  onChange={(e) => setTaskAnswer(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleTaskSubmit()}
                  placeholder="Type your answer here..."
                  className="w-full bg-[#0f1923] border-2 focus:outline-none rounded-lg sm:rounded-xl px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-white text-sm sm:text-base md:text-lg placeholder-gray-500 transition-all"
                  style={{
                    borderColor: '#374151'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = blueColor.from;
                    e.target.style.boxShadow = `0 0 20px ${blueColor.glow}`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#374151';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Task Message */}
              {taskMessage && (
                <div 
                  className={`mb-3 sm:mb-4 md:mb-6 p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl text-center font-bold text-sm sm:text-base md:text-lg border-2 ${
                    taskMessage.includes('Completed') 
                      ? 'bg-green-500/20 text-green-400 border-green-500' 
                      : 'bg-red-500/20 text-red-400 border-red-500'
                  }`}
                >
                  {taskMessage}
                </div>
              )}

              {/* Submit Button */}
              <button
                onClick={handleTaskSubmit}
                className="w-full font-bold py-2.5 sm:py-3 md:py-4 lg:py-5 rounded-lg sm:rounded-xl uppercase tracking-wider transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 md:gap-3 text-sm sm:text-base md:text-lg"
                style={{
                  background: `linear-gradient(135deg, ${blueColor.from} 0%, ${blueColor.to} 100%)`,
                  boxShadow: `0 10px 40px ${blueColor.glow}`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = `0 15px 50px ${blueColor.glow}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = `0 10px 40px ${blueColor.glow}`;
                }}
              >
                <span>Submit Answer</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </button>

              {/* Hint Section */}
              <div className="mt-4 sm:mt-6 md:mt-8 bg-yellow-500/10 border-2 border-yellow-500/30 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6">
                <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
                  <div className="bg-yellow-500 rounded-full p-1 sm:p-1.5 md:p-2 flex-shrink-0">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-yellow-400 font-bold text-[10px] sm:text-xs md:text-sm uppercase tracking-wide mb-1 md:mb-2">
                      Intelligence Brief
                    </p>
                    <p className="text-yellow-200 text-xs sm:text-sm md:text-base leading-relaxed break-words">
                      {currentTask.task.hint}
                    </p>
                  </div>
                </div>
              </div>

              {/* Agent Info */}
              <div className="mt-3 sm:mt-4 md:mt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] sm:text-xs md:text-sm text-gray-400 px-1 sm:px-2 md:px-4">
                <span className="break-words text-center sm:text-left">Agent: <span className="text-white font-bold">{currentTask.agent}</span></span>
                <span className="break-words text-center sm:text-right">Rank: <span style={{ color: blueColor.from }} className="font-bold">{currentTask.role}</span></span>
              </div>
            </div>
          </div>

          {/* Bottom Stats */}
          <div className="mt-4 sm:mt-6 md:mt-8 grid grid-cols-3 gap-2 md:gap-4 text-center">
            <div 
              className="border-2 rounded-lg p-2 sm:p-3 md:p-4"
              style={{
                backgroundColor: '#1a2633',
                borderColor: `${blueColor.from}50`
              }}
            >
              <Award className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mx-auto mb-1 sm:mb-2" style={{ color: blueColor.from }} />
              <p className="text-gray-400 text-[8px] sm:text-[10px] md:text-xs uppercase mb-0.5 sm:mb-1">Level</p>
              <p className="text-lg sm:text-xl md:text-2xl font-bold" style={{ color: blueColor.from }}>{currentTask.id}</p>
            </div>
            <div 
              className="border-2 rounded-lg p-2 sm:p-3 md:p-4"
              style={{
                backgroundColor: '#1a2633',
                borderColor: `${blueColor.from}50`
              }}
            >
              <Target className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mx-auto mb-1 sm:mb-2" style={{ color: blueColor.from }} />
              <p className="text-gray-400 text-[8px] sm:text-[10px] md:text-xs uppercase mb-0.5 sm:mb-1">Difficulty</p>
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-yellow-500">★★★</p>
            </div>
            <div 
              className="border-2 rounded-lg p-2 sm:p-3 md:p-4"
              style={{
                backgroundColor: '#1a2633',
                borderColor: `${blueColor.from}50`
              }}
            >
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mx-auto mb-1 sm:mb-2" style={{ color: blueColor.from }} />
              <p className="text-gray-400 text-[8px] sm:text-[10px] md:text-xs uppercase mb-0.5 sm:mb-1">Reward</p>
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-green-500">100 XP</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskPage;