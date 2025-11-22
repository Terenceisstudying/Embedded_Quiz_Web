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
        // Sharp, crimson red eyes
        const eyeColor = "#DC143C";
        const highlight = "#FFB6C1";

        // Adjusted coordinates for the new face shape
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
                        {/* Left Eye */}
                        <path d={`M${leftEyeX - 11} ${eyeY - 3} Q ${leftEyeX} ${eyeY - 8} ${leftEyeX + 11} ${eyeY - 3} L ${leftEyeX + 10} ${eyeY + 4} Q ${leftEyeX} ${eyeY + 8} ${leftEyeX - 10} ${eyeY + 4} Z`} fill="#FFF" />
                        <path d={`M${leftEyeX - 11} ${eyeY - 3} Q ${leftEyeX} ${eyeY - 8} ${leftEyeX + 11} ${eyeY - 3}`} stroke="#1A1A1A" strokeWidth="2" fill="none" /> {/* Top lash */}
                        <circle cx={leftEyeX} cy={eyeY} r="5.5" fill={eyeColor} />
                        <circle cx={leftEyeX} cy={eyeY} r="2" fill="#000" />
                        <circle cx={leftEyeX - 2} cy={eyeY - 2} r="2" fill={highlight} />

                        {/* Right Eye */}
                        <path d={`M${rightEyeX - 11} ${eyeY - 3} Q ${rightEyeX} ${eyeY - 8} ${rightEyeX + 11} ${eyeY - 3} L ${rightEyeX + 10} ${eyeY + 4} Q ${rightEyeX} ${eyeY + 8} ${rightEyeX - 10} ${eyeY + 4} Z`} fill="#FFF" />
                        <path d={`M${rightEyeX - 11} ${eyeY - 3} Q ${rightEyeX} ${eyeY - 8} ${rightEyeX + 11} ${eyeY - 3}`} stroke="#1A1A1A" strokeWidth="2" fill="none" /> {/* Top lash */}
                        <circle cx={rightEyeX} cy={eyeY} r="5.5" fill={eyeColor} />
                        <circle cx={rightEyeX} cy={eyeY} r="2" fill="#000" />
                        <circle cx={rightEyeX - 2} cy={eyeY - 2} r="2" fill={highlight} />
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

    return (
        <div className="fixed bottom-0 right-4 md:right-12 flex flex-col items-end z-50 pointer-events-none">
            {message && (
                <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="bg-white text-slate-800 p-4 rounded-2xl rounded-br-none mb-2 shadow-xl border-2 border-red-500 max-w-[220px] text-sm font-medium relative mr-8"
                >
                    <span className="text-red-500 font-bold block mb-1 text-xs tracking-wider">GUIDE SAYS:</span>
                    {message}
                    <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-r-2 border-b-2 border-red-500 transform rotate-45"></div>
                </motion.div>
            )}

            <motion.div
                variants={variants}
                animate={mood}
                className="w-48 h-64 md:w-64 md:h-80 relative filter drop-shadow-2xl origin-bottom"
            >
                <svg viewBox="0 0 200 250" className="w-full h-full">
                    <defs>
                        <linearGradient id="hairGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#2C2C2C" />
                            <stop offset="100%" stopColor="#1A1A1A" />
                        </linearGradient>
                        <linearGradient id="skinGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#FFF0E5" />
                            <stop offset="100%" stopColor="#FFE0D0" />
                        </linearGradient>
                    </defs>

                    {/* --- Back Hair (Long) --- */}
                    <path d="M40 60 Q 100 20 160 60 L 170 200 Q 100 240 30 200 Z" fill="url(#hairGradient)" />

                    {/* --- Body/Uniform --- */}
                    <g transform="translate(0, 140)">
                        {/* Shoulders */}
                        <path d="M50 0 Q 20 20 10 80 L 190 80 Q 180 20 150 0 L 100 10 Z" fill="#1E293B" />
                        {/* Collar */}
                        <path d="M70 0 L 130 0 L 100 40 Z" fill="#FFF" />
                        <path d="M70 0 L 100 40 L 130 0" stroke="#1E293B" strokeWidth="1" fill="none" />
                        {/* Tie */}
                        <path d="M100 15 L 90 35 L 100 45 L 110 35 Z" fill="#DC143C" />
                    </g>

                    {/* --- Neck --- */}
                    <path d="M85 120 L 85 145 L 115 145 L 115 120" fill="url(#skinGradient)" />
                    <path d="M85 145 Q 100 155 115 145" fill="url(#skinGradient)" /> {/* Neck base */}

                    {/* --- Face (Jawline) --- */}
                    <path d="M60 70 Q 60 130 100 140 Q 140 130 140 70 Q 140 30 100 30 Q 60 30 60 70" fill="url(#skinGradient)" />

                    {/* --- Bangs/Front Hair --- */}
                    <path d="M55 70 Q 60 40 100 40 Q 140 40 145 70" fill="none" stroke="url(#hairGradient)" strokeWidth="0" />
                    {/* Hime cut sides */}
                    <path d="M55 60 L 55 110 L 65 110 L 60 60" fill="url(#hairGradient)" />
                    <path d="M145 60 L 145 110 L 135 110 L 140 60" fill="url(#hairGradient)" />
                    {/* Forehead bangs */}
                    <path d="M60 50 Q 80 80 100 60 Q 120 80 140 50 L 140 30 Q 100 20 60 30 Z" fill="url(#hairGradient)" />

                    {/* --- Red Ribbon (Side) --- */}
                    <path d="M45 50 Q 35 40 45 30 Q 55 40 45 50" fill="#DC143C" />

                    {/* --- Features --- */}
                    {getEyes()}

                    {/* Blush */}
                    <ellipse cx="75" cy="105" rx="6" ry="3" fill="#FF9999" opacity="0.4" />
                    <ellipse cx="125" cy="105" rx="6" ry="3" fill="#FF9999" opacity="0.4" />

                    {getMouth()}
                </svg>
            </motion.div>
        </div>
    );
};

export default AnimeMascot;
