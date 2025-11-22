import React from 'react';
import { motion } from 'framer-motion';

const AnimeMascot = ({ mood = 'neutral', message }) => {
    // Moods: neutral, happy, thinking, sad, excited

    const variants = {
        neutral: { y: 0 },
        happy: { y: [0, -10, 0], transition: { repeat: Infinity, duration: 2 } },
        excited: { scale: [1, 1.1, 1], rotate: [0, 5, -5, 0], transition: { repeat: Infinity, duration: 0.5 } },
        thinking: { rotate: [0, 5, 0], transition: { repeat: Infinity, duration: 3 } },
        sad: { y: 5, rotate: 0 }
    };

    const getEyes = () => {
        switch (mood) {
            case 'happy':
            case 'excited':
                return (
                    <>
                        <path d="M35 45 Q 45 35 55 45" stroke="#333" strokeWidth="3" fill="none" />
                        <path d="M65 45 Q 75 35 85 45" stroke="#333" strokeWidth="3" fill="none" />
                    </>
                );
            case 'sad':
                return (
                    <>
                        <path d="M35 45 Q 45 50 55 45" stroke="#333" strokeWidth="3" fill="none" />
                        <path d="M65 45 Q 75 50 85 45" stroke="#333" strokeWidth="3" fill="none" />
                        <circle cx="30" cy="50" r="2" fill="#A0C" opacity="0.5" /> {/* Tears */}
                    </>
                );
            case 'thinking':
                return (
                    <>
                        <circle cx="45" cy="45" r="4" fill="#333" />
                        <circle cx="75" cy="45" r="4" fill="#333" />
                        <path d="M45 35 L 55 38" stroke="#333" strokeWidth="2" /> {/* Eyebrow */}
                    </>
                );
            default: // neutral
                return (
                    <>
                        <circle cx="45" cy="45" r="5" fill="#333" />
                        <circle cx="75" cy="45" r="5" fill="#333" />
                        <path d="M35 38 Q 45 35 55 38" stroke="#333" strokeWidth="1" fill="none" />
                        <path d="M65 38 Q 75 35 85 38" stroke="#333" strokeWidth="1" fill="none" />
                    </>
                );
        }
    };

    const getMouth = () => {
        switch (mood) {
            case 'happy':
            case 'excited':
                return <path d="M50 60 Q 60 70 70 60" stroke="#333" strokeWidth="3" fill="#FF9999" />;
            case 'sad':
                return <path d="M50 65 Q 60 60 70 65" stroke="#333" strokeWidth="3" fill="none" />;
            case 'thinking':
                return <circle cx="60" cy="65" r="3" fill="#333" />;
            default:
                return <path d="M55 65 Q 60 68 65 65" stroke="#333" strokeWidth="2" fill="none" />;
        }
    };

    return (
        <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 flex flex-col items-end z-50 pointer-events-none">
            {message && (
                <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="bg-white text-slate-800 p-3 rounded-t-xl rounded-bl-xl mb-2 shadow-lg border-2 border-primary max-w-[200px] text-sm font-medium relative"
                >
                    {message}
                    <div className="absolute -bottom-2 right-4 w-4 h-4 bg-white border-r-2 border-b-2 border-primary transform rotate-45"></div>
                </motion.div>
            )}

            <motion.div
                variants={variants}
                animate={mood}
                className="w-24 h-24 md:w-32 md:h-32 relative"
            >
                <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-xl">
                    {/* Hair Back */}
                    <path d="M10 60 Q 60 -20 110 60 L 110 100 Q 60 120 10 100 Z" fill="#FF6B9D" />

                    {/* Face */}
                    <rect x="20" y="20" width="80" height="80" rx="40" fill="#FFE0BD" />

                    {/* Hair Front (Bangs) */}
                    <path d="M20 40 Q 40 10 60 40 Q 80 10 100 40" stroke="#FF6B9D" strokeWidth="0" fill="#FF6B9D" />
                    <path d="M20 40 Q 30 20 40 35 L 60 25 L 80 35 Q 90 20 100 40" fill="#FF6B9D" />

                    {/* Eyes */}
                    {getEyes()}

                    {/* Blush */}
                    <ellipse cx="35" cy="55" rx="6" ry="3" fill="#FF9999" opacity="0.6" />
                    <ellipse cx="85" cy="55" rx="6" ry="3" fill="#FF9999" opacity="0.6" />

                    {/* Mouth */}
                    {getMouth()}
                </svg>
            </motion.div>
        </div>
    );
};

export default AnimeMascot;
