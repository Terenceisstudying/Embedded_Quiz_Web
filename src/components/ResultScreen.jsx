import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, AlertCircle, Clock } from 'lucide-react';

const ResultScreen = ({ topic, answers, rankingAnswers = {}, textAnswers = {}, matchingAnswers = {}, score, timeTaken, onRestart }) => {
    const totalQuestions = topic.questions.length;
    const percentage = Math.round((score / totalQuestions) * 100);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}m ${secs}s`;
    };

    const getGradeColor = (p) => {
        if (p >= 80) return 'text-green-400';
        if (p >= 50) return 'text-yellow-400';
        return 'text-red-400';
    };

    return (
        <div className="max-w-3xl mx-auto" role="main" aria-label="Quiz results">
            <div className="text-center mb-8 sm:mb-10">
                <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-white">Quiz Completed!</h2>
                <div className="text-5xl sm:text-6xl font-black my-4 sm:my-6" aria-label={`Score: ${percentage} percent`}>
                    <span className={getGradeColor(percentage)}>{percentage}%</span>
                </div>
                <p className="text-base sm:text-lg text-slate-300 mb-2">
                    You scored <span className="font-bold text-white">{score}</span> out of <span className="font-bold text-white">{totalQuestions}</span>
                </p>
                <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4 text-yellow-400" aria-label={`Time taken: ${formatTime(timeTaken)}`}>
                    <Clock size={20} aria-hidden="true" />
                    <span className="text-base sm:text-lg font-semibold">Completed in {formatTime(timeTaken)}</span>
                </div>
                <button
                    onClick={onRestart}
                    className="mt-6 sm:mt-8 min-h-[44px] px-6 sm:px-8 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-slate-900 rounded-full font-bold text-base transition-all shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
                    aria-label="Start a new quiz"
                >
                    Try Another Topic
                </button>
            </div>

            <div className="space-y-6 sm:space-y-8">
                <h3 className="text-lg sm:text-xl font-semibold border-b-2 border-slate-700 pb-3 text-white">Review Answers</h3>

                {topic.questions.map((q, qIdx) => {
                    let isCorrect = false;
                    let userSelected = [];
                    
                    if (q.type === 'matching') {
                        const userMatches = matchingAnswers[q.id] || {};
                        isCorrect = q.options.every((opt, idx) => {
                            const userMatch = userMatches[opt.symbol];
                            return userMatch === idx;
                        });
                    } else if (q.type === 'ranking') {
                        const userOrder = rankingAnswers[q.id] || [];
                        const correctRankMap = {};
                        q.options.forEach((opt, idx) => {
                            if (opt.rank !== undefined) {
                                correctRankMap[opt.rank] = idx;
                            }
                        });
                        const correctOrder = Object.keys(correctRankMap)
                            .sort((a, b) => parseInt(a) - parseInt(b))
                            .map(rank => correctRankMap[rank]);
                        isCorrect = userOrder.length === correctOrder.length &&
                            userOrder.every((idx, pos) => idx === correctOrder[pos]);
                        userSelected = userOrder; // For display purposes
                    } else if (q.type === 'fill_in_the_blank') {
                        const userInputs = textAnswers[q.id] || [];
                        isCorrect = q.options.every((opt, idx) => {
                            const userVal = (userInputs[idx] || '').trim().toLowerCase();
                            const correctVal = opt.text.trim().toLowerCase();
                            return userVal === correctVal;
                        });
                    } else {
                        userSelected = answers[q.id] || [];
                        const correctIndices = q.options
                            .map((opt, idx) => opt.isCorrect ? idx : -1)
                            .filter(idx => idx !== -1);
                        isCorrect = userSelected.length === correctIndices.length &&
                            userSelected.every(val => correctIndices.includes(val));
                    }

                    return (
                        <div key={q.id} className={`p-4 sm:p-6 rounded-xl border-2 ${isCorrect ? 'border-green-500/50 bg-green-500/10' : 'border-red-500/50 bg-red-500/10'}`} role="article" aria-label={isCorrect ? 'Correct answer' : 'Incorrect answer'}>
                            <div className="flex gap-3 mb-4">
                                <div className="mt-1 flex-shrink-0" aria-hidden="true">
                                    {isCorrect ? (
                                        <Check className="text-green-400 w-6 h-6" />
                                    ) : (
                                        <X className="text-red-400 w-6 h-6" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-base sm:text-lg font-semibold text-white whitespace-pre-line leading-relaxed">{q.question}</h4>
                                </div>
                            </div>

                            {q.image && (
                                <div className="mb-4 ml-9 flex justify-center">
                                    <img 
                                        src={`${import.meta.env.BASE_URL || '/'}images/${q.image}`}
                                        alt="Question diagram"
                                        className="max-w-full h-auto rounded-lg border border-slate-600 shadow-lg"
                                        style={{ maxHeight: '300px' }}
                                        onError={(e) => {
                                            console.error('Image failed to load:', e.target.src);
                                            // Try fallback path
                                            const fallbackSrc = `/images/${q.image}`;
                                            if (e.target.src !== fallbackSrc) {
                                                e.target.src = fallbackSrc;
                                            } else {
                                                e.target.style.display = 'none';
                                            }
                                        }}
                                    />
                                </div>
                            )}

                            {q.type === 'ranking' ? (
                                <div className="space-y-2 ml-9">
                                    <p className="text-sm text-slate-400 mb-3">Your ranking vs Correct ranking:</p>
                                    {(rankingAnswers[q.id] || []).map((optionIdx, position) => {
                                        const option = q.options[optionIdx];
                                        const correctRank = option.rank;
                                        const userRank = position + 1;
                                        const isRankCorrect = correctRank === userRank;
                                        
                                        // Find correct position for this option
                                        const correctRankMap = {};
                                        q.options.forEach((opt, idx) => {
                                            if (opt.rank !== undefined) {
                                                correctRankMap[opt.rank] = idx;
                                            }
                                        });
                                        const correctOrder = Object.keys(correctRankMap)
                                            .sort((a, b) => parseInt(a) - parseInt(b))
                                            .map(rank => correctRankMap[rank]);
                                        const correctPosition = correctOrder.indexOf(optionIdx);

                                        return (
                                            <div
                                                key={optionIdx}
                                                className={`p-3 rounded border text-sm flex items-center gap-3
                                                    ${isRankCorrect 
                                                        ? 'bg-green-500/10 border-green-500/50 text-green-200'
                                                        : 'bg-red-500/10 border-red-500/50 text-red-200'
                                                    }
                                                `}
                                            >
                                                <span className="font-bold w-12">#{userRank}</span>
                                                <span className="flex-1">{option.text}</span>
                                                {isRankCorrect ? (
                                                    <Check size={16} className="text-green-400" />
                                                ) : (
                                                    <span className="text-xs">Should be #{correctRank}</span>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : q.type === 'fill_in_the_blank' ? (
                                <div className="space-y-2 ml-9">
                                    {q.options.map((opt, idx) => {
                                        const userVal = (textAnswers[q.id] || [])[idx] || '';
                                        const isCorrect = userVal.trim().toLowerCase() === opt.text.trim().toLowerCase();
                                        
                                        return (
                                            <div
                                                key={idx}
                                                className={`p-3 rounded border text-sm flex items-center gap-3
                                                    ${isCorrect 
                                                        ? 'bg-green-500/10 border-green-500/50 text-green-200'
                                                        : 'bg-red-500/10 border-red-500/50 text-red-200'
                                                    }
                                                `}
                                            >
                                                <span className="font-mono text-xs w-8">{idx + 1}.</span>
                                                <span className="flex-1">Your answer: <strong>{userVal || '(empty)'}</strong></span>
                                                <span className="text-xs">Expected: {opt.text}</span>
                                                {isCorrect ? (
                                                    <Check size={16} className="text-green-400" />
                                                ) : (
                                                    <X size={16} className="text-red-400" />
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="space-y-2 ml-9">
                                    {q.options.map((opt, optIdx) => {
                                        const isSelected = userSelected.includes(optIdx);
                                        const isActuallyCorrect = opt.isCorrect;

                                        let styleClass = "text-slate-400 border-slate-700";
                                        let icon = null;

                                        if (isActuallyCorrect) {
                                            styleClass = "text-green-300 border-green-500/50 bg-green-500/10 font-medium";
                                            icon = <Check size={16} className="ml-auto text-green-400" />;
                                        } else if (isSelected && !isActuallyCorrect) {
                                            styleClass = "text-red-300 border-red-500/50 bg-red-500/10";
                                            icon = <X size={16} className="ml-auto text-red-400" />;
                                        }

                                        return (
                                            <div
                                                key={optIdx}
                                                className={`p-3 rounded border text-sm flex items-center ${styleClass}`}
                                            >
                                                <span className="flex-1">{opt.text}</span>
                                                {icon}
                                                {isSelected && isActuallyCorrect && <span className="text-xs bg-green-500 text-black px-2 py-0.5 rounded ml-2">You Selected</span>}
                                                {isSelected && !isActuallyCorrect && <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded ml-2">You Selected</span>}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}

                            {q.explanation && (
                                <div className="mt-4 ml-9 p-4 bg-slate-800 rounded-lg text-sm text-slate-300 flex gap-3">
                                    <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0" />
                                    <div>
                                        <span className="font-bold text-blue-400 block mb-1">Explanation:</span>
                                        {q.explanation}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ResultScreen;
