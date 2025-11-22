import React from 'react';
import { motion } from 'framer-motion';

const AnimeMascot = ({ mood = 'neutral', message }) => {
    // Moods: neutral, happy, thinking, sad, excited

    const variants = {
        neutral: { y: 0 },
        happy: { y: [0, -5, 0], transition: { repeat: Infinity, duration: 2.5 } },
        excited: { scale: [1, 1.05, 1], rotate: [0, 2, -2, 0], transition: { repeat: Infinity, duration: 0.8 } },
        thinking: { rotate: [0, 2, 0], transition: { repeat: Infinity, duration: 3 } },
        sad: { y: 5, rotate: 0 }
    };

    const getEyes = () => {
        // Sharp, crimson red eyes for Chisa
        const eyeColor = "#DC143C";
        const highlight = "#FFB6C1";

        switch (mood) {
            case 'happy':
            case 'excited':
                return (
                    <g>
                        {/* Closed happy eyes */}
                        <path d="M38 50 Q 48 42 58 50" stroke="#1A1A1A" strokeWidth="3" fill="none" />
                        <path d="M72 50 Q 82 42 92 50" stroke="#1A1A1A" strokeWidth="3" fill="none" />
                    </g>
                );
            case 'sad':
                return (
                    <g>
                        {/* Sad eyes */}
                        <path d="M38 52 Q 48 56 58 52" stroke="#1A1A1A" strokeWidth="3" fill="none" />
                        <path d="M72 52 Q 82 56 92 52" stroke="#1A1A1A" strokeWidth="3" fill="none" />
                        <circle cx="35" cy="55" r="2" fill="#4D96FF" opacity="0.6" />
                    </g>
                );
            case 'thinking':
                return (
                    <g>
                        {/* Looking up/sideways */}
                        <path d="M35 45 Q 48 40 60 48" fill="#FFF" />
                        <path d="M35 45 Q 48 40 60 48" stroke="#1A1A1A" strokeWidth="1.5" fill="none" />
                        <circle cx="52" cy="46" r="5" fill={eyeColor} />

                        <path d="M70 48 Q 82 40 95 45" fill="#FFF" />
                        <path d="M70 48 Q 82 40 95 45" stroke="#1A1A1A" strokeWidth="1.5" fill="none" />
                        <circle cx="87" cy="46" r="5" fill={eyeColor} />
                    </g>
                );
            default: // neutral
                return (
                    <g>
                        {/* Sharp Anime Eyes Base */}
                        <path d="M35 48 Q 48 40 60 48 L 58 55 Q 48 60 37 55 Z" fill="#FFF" stroke="#1A1A1A" strokeWidth="1" />
                        <path d="M70 48 Q 82 40 95 48 L 93 55 Q 82 60 72 55 Z" fill="#FFF" stroke="#1A1A1A" strokeWidth="1" />

                        {/* Iris */}
                        <circle cx="48" cy="50" r="6" fill={eyeColor} />
                        <circle cx="82" cy="50" r="6" fill={eyeColor} />

                        {/* Pupil */}
                        <circle cx="48" cy="50" r="2" fill="#000" />
                        <circle cx="82" cy="50" r="2" fill="#000" />

                        {/* Highlights */}
                        <circle cx="50" cy="47" r="2" fill={highlight} />
                        <circle cx="84" cy="47" r="2" fill={highlight} />

                        {/* Eyelashes/Liner */}
                        <path d="M34 48 Q 48 38 61 47" stroke="#1A1A1A" strokeWidth="2.5" fill="none" />
                        <path d="M69 47 Q 82 38 96 48" stroke="#1A1A1A" strokeWidth="2.5" fill="none" />
                    </g>
                );
        }
    };

    const getMouth = () => {
        switch (mood) {
            case 'happy':
            case 'excited':
                return <path d="M55 68 Q 65 75 75 68" stroke="#1A1A1A" strokeWidth="2" fill="#FF9999" />;
            case 'sad':
                return <path d="M58 72 Q 65 68 72 72" stroke="#1A1A1A" strokeWidth="2" fill="none" />;
            case 'thinking':
                return <circle cx="65" cy="72" r="2" fill="#1A1A1A" />;
            default:
                return <path d="M60 70 Q 65 72 70 70" stroke="#1A1A1A" strokeWidth="2" fill="none" />;
        }
    };

    return (
        <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 flex flex-col items-end z-50 pointer-events-none">
            {message && (
                <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="bg-white text-slate-800 p-4 rounded-2xl rounded-br-none mb-4 shadow-xl border-2 border-red-500 max-w-[220px] text-sm font-medium relative"
                >
                    <span className="text-red-500 font-bold block mb-1 text-xs tracking-wider">CHISA SAYS:</span>
                    {message}
                    {/* Speech bubble tail */}
                    <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-r-2 border-b-2 border-red-500 transform rotate-45"></div>
                </motion.div>
            )}

            <motion.div
                variants={variants}
                animate={mood}
                className="w-32 h-32 md:w-40 md:h-40 relative filter drop-shadow-2xl"
            >
                <svg viewBox="0 0 130 130" className="w-full h-full">
                    <defs>
                        <linearGradient id="hairGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#2C2C2C" />
                            <stop offset="100%" stopColor="#1A1A1A" />
                        </linearGradient>
                    </defs>

                    {/* --- Back Hair (Long straight black) --- */}
                    <path d="M20 50 Q 65 10 110 50 L 115 110 Q 65 130 15 110 Z" fill="url(#hairGradient)" />

                    {/* --- Uniform Collar (Back) --- */}
                    <path d="M35 90 L 95 90 L 100 120 L 30 120 Z" fill="#1E293B" />

                    {/* --- Face Shape --- */}
                    <path d="M30 45 Q 30 100 65 100 Q 100 100 100 45 Q 100 20 65 20 Q 30 20 30 45" fill="#FFF0E5" />

                    {/* --- Uniform Collar (Front) --- */}
                    <path d="M30 95 Q 65 110 100 95 L 90 130 L 40 130 Z" fill="#1E293B" /> {/* Navy part */}
                    <path d="M40 95 L 65 115 L 90 95" fill="none" stroke="#FFF" strokeWidth="3" /> {/* White stripe */}

                    {/* --- Red Tie --- */}
                    <path d="M65 110 L 55 130 L 65 140 L 75 130 Z" fill="#DC143C" />

                    {/* --- Bangs/Front Hair --- */}
                    {/* Main bangs */}
                    <path d="M25 45 Q 45 20 65 45 Q 85 20 105 45" fill="none" stroke="url(#hairGradient)" strokeWidth="0" />
                    <path d="M30 40 Q 45 60 55 40 L 65 55 L 75 40 Q 85 60 100 40 L 100 20 L 30 20 Z" fill="url(#hairGradient)" />
                    {/* Side strands (Hime cut style) */}
                    <path d="M25 40 L 25 80 L 35 80 L 30 40" fill="url(#hairGradient)" />
                    <path d="M105 40 L 105 80 L 95 80 L 100 40" fill="url(#hairGradient)" />

                    {/* --- Red Ribbon (Left side) --- */}
                    <path d="M20 30 Q 10 20 20 10 Q 30 20 20 30" fill="#DC143C" />
                    <path d="M20 30 Q 15 45 10 40" stroke="#DC143C" strokeWidth="3" fill="none" />

                    {/* --- Facial Features --- */}
                    {getEyes()}

                    {/* Blush */}
                    <ellipse cx="40" cy="65" rx="5" ry="2" fill="#FF9999" opacity="0.5" />
                    <ellipse cx="90" cy="65" rx="5" ry="2" fill="#FF9999" opacity="0.5" />

                    {getMouth()}
                </svg>
            </motion.div>
        </div>
    );
};

export default AnimeMascot;
