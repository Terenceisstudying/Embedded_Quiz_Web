import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, AlertCircle, Clock } from 'lucide-react';

const ResultScreen = ({ topic, answers, score, timeTaken, onRestart }) => {
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
        <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold mb-2">Quiz Completed!</h2>
                <div className="text-6xl font-black my-4">
                    <span className={getGradeColor(percentage)}>{percentage}%</span>
                </div>
                <p className="text-slate-400">
                    You scored {score} out of {totalQuestions}
                </p>
                <div className="flex items-center justify-center gap-2 mt-3 text-secondary">
                    <Clock size={20} />
                    <span className="text-lg font-semibold">Completed in {formatTime(timeTaken)}</span>
                </div>
                <button
                    onClick={onRestart}
                    className="mt-6 px-8 py-3 bg-secondary hover:bg-purple-600 text-white rounded-full font-bold transition-all shadow-lg shadow-secondary/25"
                >
                    Try Another Topic
                </button>
            </div>

            <div className="space-y-8">
                <h3 className="text-xl font-semibold border-b border-slate-700 pb-2">Review Answers</h3>

                {topic.questions.map((q, qIdx) => {
                    const userSelected = answers[q.id] || [];
                    const correctIndices = q.options
                        .map((opt, idx) => opt.isCorrect ? idx : -1)
                        .filter(idx => idx !== -1);

                    const isCorrect = userSelected.length === correctIndices.length &&
                        userSelected.every(val => correctIndices.includes(val));

                    return (
                        <div key={q.id} className={`p-6 rounded-xl border ${isCorrect ? 'border-green-500/30 bg-green-500/5' : 'border-red-500/30 bg-red-500/5'}`}>
                            <div className="flex gap-3 mb-4">
                                <div className="mt-1">
                                    {isCorrect ? (
                                        <Check className="text-green-400 w-6 h-6" />
                                    ) : (
                                        <X className="text-red-400 w-6 h-6" />
                                    )}
                                </div>
                                <div>
                                    <h4 className="text-lg font-medium text-slate-200">{q.question}</h4>
                                </div>
                            </div>

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
                                    } else if (isSelected && isActuallyCorrect) {
                                        // Handled by first if, but strictly speaking if we want to show user selection specifically
                                        // The first if covers "Correct Answer", we might want to highlight if user picked it too.
                                        // But usually showing the correct answer is enough.
                                        // Let's refine:
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
