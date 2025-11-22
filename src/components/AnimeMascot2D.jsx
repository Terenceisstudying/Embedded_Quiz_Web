import React from 'react';
import { motion } from 'framer-motion';

const AnimeMascot2D = ({ mood = 'neutral', message, position = 'right' }) => {
    // Moods: neutral, happy, thinking, sad, excited

    const variants = {
        neutral: { y: 0 },
        happy: { y: [0, -5, 0], transition: { repeat: Infinity, duration: 2.5 } },
        excited: { scale: [1, 1.05, 1], rotate: [0, 2, -2, 0], transition: { repeat: Infinity, duration: 0.8 } },
        thinking: { rotate: [0, 2, 0], transition: { repeat: Infinity, duration: 3 } },
        sad: { y: 5, rotate: 0 }
    };

    const getEyes = () => {
        // Crimson red eyes
        const eyeColor = "#DC143C";
        const highlight = "#FFB6C1";

        const leftEyeX = 85;
        const rightEyeX = 115;
        const eyeY = 95;

        switch (mood) {
            case 'happy':
            case 'excited':
                return (
                    <g>
                        {/* Closed happy eyes */}
                        <path d={`M${leftEyeX - 10} ${eyeY} Q ${leftEyeX} ${eyeY + 8} ${leftEyeX + 10} ${eyeY}`} stroke="#1A1A1A" strokeWidth="2.5" fill="none" />
                        <path d={`M${rightEyeX - 10} ${eyeY} Q ${rightEyeX} ${eyeY + 8} ${rightEyeX + 10} ${eyeY}`} stroke="#1A1A1A" strokeWidth="2.5" fill="none" />
                    </g>
                );
            case 'sad':
                return (
                    <g>
                        {/* Sad eyes */}
                        <path d={`M${leftEyeX - 10} ${eyeY + 5} Q ${leftEyeX} ${eyeY - 2} ${leftEyeX + 10} ${eyeY + 5}`} stroke="#1A1A1A" strokeWidth="2.5" fill="none" />
                        <path d={`M${rightEyeX - 10} ${eyeY + 5} Q ${rightEyeX} ${eyeY - 2} ${rightEyeX + 10} ${eyeY + 5}`} stroke="#1A1A1A" strokeWidth="2.5" fill="none" />
                        <circle cx={leftEyeX - 5} cy={eyeY + 10} r="2" fill="#4D96FF" opacity="0.6" />
                    </g>
                );
            case 'thinking':
                return (
                    <g>
                        {/* Looking up/sideways */}
                        <path d={`M${leftEyeX - 12} ${eyeY - 4} Q ${leftEyeX} ${eyeY - 8} ${leftEyeX + 12} ${eyeY - 4}`} stroke="#1A1A1A" strokeWidth="1.5" fill="none" />
                        <circle cx={leftEyeX + 4} cy={eyeY} r="5" fill={eyeColor} />

                        <path d={`M${rightEyeX - 12} ${eyeY - 4} Q ${rightEyeX} ${eyeY - 8} ${rightEyeX + 12} ${eyeY - 4}`} stroke="#1A1A1A" strokeWidth="1.5" fill="none" />
                        <circle cx={rightEyeX + 4} cy={eyeY} r="5" fill={eyeColor} />
                    </g>
                );
            default: // neutral
                return (
                    <g>
                        {/* Left Eye - almond shaped */}
                        <path d={`M${leftEyeX - 12} ${eyeY - 4} Q ${leftEyeX} ${eyeY - 9} ${leftEyeX + 12} ${eyeY - 4} L ${leftEyeX + 11} ${eyeY + 5} Q ${leftEyeX} ${eyeY + 9} ${leftEyeX - 11} ${eyeY + 5} Z`} fill="#FFF" />
                        <path d={`M${leftEyeX - 12} ${eyeY - 4} Q ${leftEyeX} ${eyeY - 9} ${leftEyeX + 12} ${eyeY - 4}`} stroke="#1A1A1A" strokeWidth="2.5" fill="none" />
                        <ellipse cx={leftEyeX} cy={eyeY} rx="6" ry="5.5" fill={eyeColor} />
                        <circle cx={leftEyeX + 1} cy={eyeY + 1} r="2.5" fill="#000" />
                        <circle cx={leftEyeX - 1} cy={eyeY - 1} r="2" fill={highlight} />

                        {/* Right Eye - almond shaped */}
                        <path d={`M${rightEyeX - 12} ${eyeY - 4} Q ${rightEyeX} ${eyeY - 9} ${rightEyeX + 12} ${eyeY - 4} L ${rightEyeX + 11} ${eyeY + 5} Q ${rightEyeX} ${eyeY + 9} ${rightEyeX - 11} ${eyeY + 5} Z`} fill="#FFF" />
                        <path d={`M${rightEyeX - 12} ${eyeY - 4} Q ${rightEyeX} ${eyeY - 9} ${rightEyeX + 12} ${eyeY - 4}`} stroke="#1A1A1A" strokeWidth="2.5" fill="none" />
                        <ellipse cx={rightEyeX} cy={eyeY} rx="6" ry="5.5" fill={eyeColor} />
                        <circle cx={rightEyeX + 1} cy={eyeY + 1} r="2.5" fill="#000" />
                        <circle cx={rightEyeX - 1} cy={eyeY - 1} r="2" fill={highlight} />
                    </g>
                );
        }
    };

    const getMouth = () => {
        const mouthY = 115;
        const mouthX = 100;
        switch (mood) {
            case 'happy':
            case 'excited':
                return <path d={`M${mouthX - 5} ${mouthY} Q ${mouthX} ${mouthY + 5} ${mouthX + 5} ${mouthY}`} stroke="#1A1A1A" strokeWidth="2" fill="#FF9999" />;
            case 'sad':
                return <path d={`M${mouthX - 6} ${mouthY + 4} Q ${mouthX} ${mouthY} ${mouthX + 6} ${mouthY + 4}`} stroke="#1A1A1A" strokeWidth="2" fill="none" />;
            case 'thinking':
                return <circle cx={mouthX} cy={mouthY + 2} r="2" fill="#1A1A1A" />;
            default:
                return <path d={`M${mouthX - 4} ${mouthY + 2} Q ${mouthX} ${mouthY + 3} ${mouthX + 4} ${mouthY + 2}`} stroke="#1A1A1A" strokeWidth="2" fill="none" />;
        }
    };

    const positionClass = position === 'left' 
        ? 'fixed bottom-0 left-4 md:left-12 flex flex-col items-start z-50 pointer-events-none'
        : 'fixed bottom-0 right-4 md:right-12 flex flex-col items-end z-50 pointer-events-none';

    return (
        <div className={positionClass}>
            {message && (
                <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className={`bg-white text-slate-800 p-4 rounded-2xl mb-2 shadow-xl border-2 border-red-500 max-w-[220px] text-sm font-medium relative ${
                        position === 'left' 
                            ? 'rounded-bl-none ml-8' 
                            : 'rounded-br-none mr-8'
                    }`}
                >
                    <span className="text-red-500 font-bold block mb-1 text-xs tracking-wider">GUIDE SAYS:</span>
                    {message}
                    <div className={`absolute -bottom-2 w-4 h-4 bg-white border-r-2 border-b-2 border-red-500 transform rotate-45 ${
                        position === 'left' ? 'left-6' : 'right-6'
                    }`}></div>
                </motion.div>
            )}

            <motion.div
                variants={variants}
                animate={mood}
                className="w-48 h-64 md:w-64 md:h-80 relative filter drop-shadow-2xl origin-bottom"
            >
                <svg viewBox="0 0 200 250" className="w-full h-full">
                    <defs>
                        <linearGradient id="hairGradient2D" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#1A1A1A" />
                            <stop offset="50%" stopColor="#2C2C2C" />
                            <stop offset="100%" stopColor="#0F0F0F" />
                        </linearGradient>
                        <linearGradient id="skinGradient2D" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#FFF5E6" />
                            <stop offset="100%" stopColor="#FFE5CC" />
                        </linearGradient>
                        <linearGradient id="ribbonGradient2D" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#FF6B9D" />
                            <stop offset="100%" stopColor="#DC143C" />
                        </linearGradient>
                    </defs>

                    {/* --- Long Back Hair (Flowing) --- */}
                    <path d="M35 55 Q 50 25 100 35 Q 150 25 165 55 L 175 220 Q 150 245 100 245 Q 50 245 25 220 Z" fill="url(#hairGradient2D)" />
                    <path d="M30 60 Q 45 30 100 40 Q 155 30 170 60 L 180 215 Q 155 240 100 240 Q 45 240 20 215 Z" fill="url(#hairGradient2D)" opacity="0.7" />

                    {/* --- Body/Uniform (Elegant Blazer) --- */}
                    <g transform="translate(0, 140)">
                        {/* Blazer */}
                        <path d="M45 0 Q 15 15 5 75 L 195 75 Q 185 15 155 0 L 100 8 Z" fill="#1E293B" />
                        <path d="M45 0 L 100 8 L 155 0" stroke="#0F172A" strokeWidth="1.5" fill="none" />
                        {/* White Shirt Collar */}
                        <path d="M70 5 L 130 5 L 100 45 Z" fill="#FFFFFF" />
                        <path d="M70 5 L 100 45 L 130 5" stroke="#1E293B" strokeWidth="1.5" fill="none" />
                        {/* Red Tie/Bow */}
                        <path d="M100 12 L 92 32 L 100 48 L 108 32 Z" fill="#DC143C" />
                        <circle cx={100} cy={30} r="3" fill="#DC143C" />
                    </g>

                    {/* --- Neck --- */}
                    <path d="M85 120 L 85 145 L 115 145 L 115 120" fill="url(#skinGradient2D)" />
                    <path d="M85 145 Q 100 155 115 145" fill="url(#skinGradient2D)" />

                    {/* --- Face (Oval, Elegant) --- */}
                    <ellipse cx="100" cy="85" rx="45" ry="50" fill="url(#skinGradient2D)" />

                    {/* --- Front Hair (Hime Cut Style) --- */}
                    {/* Side strands */}
                    <path d="M50 55 L 50 105 L 60 105 L 55 55" fill="url(#hairGradient2D)" />
                    <path d="M150 55 L 150 105 L 140 105 L 145 55" fill="url(#hairGradient2D)" />
                    {/* Forehead bangs */}
                    <path d="M55 50 Q 75 75 100 60 Q 125 75 145 50 L 145 30 Q 100 20 55 30 Z" fill="url(#hairGradient2D)" />
                    {/* Center part */}
                    <path d="M95 30 L 95 60 L 105 60 L 105 30 Z" fill="url(#hairGradient2D)" opacity="0.3" />

                    {/* --- Hair Ribbons (Twin Tails Style) --- */}
                    {/* Left ribbon */}
                    <g transform="translate(40, 50)">
                        <ellipse cx="0" cy="0" rx="8" ry="12" fill="url(#ribbonGradient2D)" />
                        <path d="M-8 0 Q 0 -5 8 0 Q 0 5 -8 0" fill="#FFB6C1" opacity="0.6" />
                        <circle cx="-3" cy="-2" r="1.5" fill="#FFFFFF" />
                        <circle cx="3" cy="-2" r="1.5" fill="#FFFFFF" />
                    </g>
                    {/* Right ribbon */}
                    <g transform="translate(160, 50)">
                        <ellipse cx="0" cy="0" rx="8" ry="12" fill="url(#ribbonGradient2D)" />
                        <path d="M-8 0 Q 0 -5 8 0 Q 0 5 -8 0" fill="#FFB6C1" opacity="0.6" />
                        <circle cx="-3" cy="-2" r="1.5" fill="#FFFFFF" />
                        <circle cx="3" cy="-2" r="1.5" fill="#FFFFFF" />
                    </g>

                    {/* --- Features --- */}
                    {getEyes()}

                    {/* Blush */}
                    <ellipse cx="75" cy="105" rx="7" ry="4" fill="#FF9999" opacity="0.35" />
                    <ellipse cx="125" cy="105" rx="7" ry="4" fill="#FF9999" opacity="0.35" />

                    {getMouth()}
                </svg>
            </motion.div>
        </div>
    );
};

export default AnimeMascot2D;

