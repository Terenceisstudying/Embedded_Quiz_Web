import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Circle, Clock } from 'lucide-react';

const QuizInterface = ({ topic, onSubmit, onBack, setMascotMood, setMascotMessage }) => {
    // Shuffle questions if All Topics mode
    const shuffledQuestions = useMemo(() => {
        return topic.isAllTopics
            ? [...topic.questions].sort(() => Math.random() - 0.5)
            : topic.questions;
    }, [topic]);

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({}); // { questionId: [selectedIndices] }
    const [startTime] = useState(Date.now());
    const [elapsedTime, setElapsedTime] = useState(0);

    // Timer effect
    useEffect(() => {
        const interval = setInterval(() => {
            setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
        }, 1000);
        return () => clearInterval(interval);
    }, [startTime]);

    // Format time as MM:SS
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    const totalQuestions = shuffledQuestions.length;

    const [isAnswered, setIsAnswered] = useState(false);

    const handleOptionToggle = (optionIndex) => {
        if (isAnswered) return; // Prevent changing answer after submission

        const questionId = currentQuestion.id;
        const currentSelected = answers[questionId] || [];
        let newSelected;

        if (currentQuestion.multiSelect) {
            if (currentSelected.includes(optionIndex)) {
                newSelected = currentSelected.filter(i => i !== optionIndex);
            } else {
                newSelected = [...currentSelected, optionIndex];
            }
        } else {
            // If single select, just replace
            newSelected = [optionIndex];
        }

        setAnswers({ ...answers, [questionId]: newSelected });
    };

    const checkAnswer = () => {
        const questionId = currentQuestion.id;
        const userSelected = answers[questionId] || [];

        if (userSelected.length === 0) {
            setMascotMood('sad');
            setMascotMessage('Please select an answer first!');
            return;
        }

        setIsAnswered(true);

        const correctIndices = currentQuestion.options
            .map((opt, idx) => opt.isCorrect ? idx : -1)
            .filter(idx => idx !== -1);

        const isCorrect = userSelected.length === correctIndices.length &&
            userSelected.every(val => correctIndices.includes(val));

        if (isCorrect) {
            setMascotMood('excited');
            setMascotMessage('Correct! You are amazing!');
        } else {
            setMascotMood('sad');
            setMascotMessage('Oh no! That was incorrect.');
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < totalQuestions - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setIsAnswered(false);
            setMascotMood('thinking');
            setMascotMessage('Next question...');
        } else {
            handleSubmit();
        }
    };

    // ... (handleSubmit remains the same)

    const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

    return (
        <div className="max-w-2xl mx-auto">
            {/* Header / Progress */}
            <div className="mb-6 flex justify-between items-center">
                <button onClick={onBack} className="text-sm text-slate-400 hover:text-white">
                    &larr; Back to Topics
                </button>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-3 py-1 bg-slate-700 rounded-lg border border-slate-600">
                        <Clock size={16} className="text-secondary" />
                        <span className="text-sm font-mono font-bold text-secondary">
                            {formatTime(elapsedTime)}
                        </span>
                    </div>
                    <div className="text-sm font-medium text-slate-300">
                        Question {currentQuestionIndex + 1} / {totalQuestions}
                    </div>
                </div>
            </div>

            <div className="w-full bg-slate-700 h-2 rounded-full mb-8 overflow-hidden">
                <motion.div
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                />
            </div>

            {/* Question Card */}
            <AnimatePresence mode='wait'>
                <motion.div
                    key={currentQuestion.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                >
                    <h3 className="text-xl font-semibold mb-2">{currentQuestion.question}</h3>
                    {currentQuestion.multiSelect && (
                        <p className="text-xs text-secondary mb-4 uppercase tracking-wider font-bold">
                            Multi-Select (Select all that apply)
                        </p>
                    )}

                    <div className="space-y-3">
                        {currentQuestion.options.map((option, idx) => {
                            const isSelected = (answers[currentQuestion.id] || []).includes(idx);
                            const isCorrect = option.isCorrect;

                            let buttonStyle = 'bg-slate-700/50 border-slate-600 hover:bg-slate-700 hover:border-slate-500';
                            let icon = <Circle size={20} />;

                            if (isSelected) {
                                buttonStyle = 'bg-primary/20 border-primary text-white';
                                icon = <CheckCircle2 size={20} />;
                            }

                            if (isAnswered) {
                                if (isCorrect) {
                                    buttonStyle = 'bg-green-500/20 border-green-500 text-green-100';
                                    icon = <CheckCircle2 size={20} className="text-green-400" />;
                                } else if (isSelected && !isCorrect) {
                                    buttonStyle = 'bg-red-500/20 border-red-500 text-red-100';
                                    icon = <Circle size={20} className="text-red-400" />;
                                }
                            }

                            return (
                                <button
                                    key={idx}
                                    onClick={() => handleOptionToggle(idx)}
                                    disabled={isAnswered}
                                    className={`w-full text-left p-4 rounded-lg border transition-all flex items-start gap-3 ${buttonStyle}`}
                                >
                                    <div className={`mt-1 ${isSelected ? 'text-primary' : 'text-slate-400'}`}>
                                        {icon}
                                    </div>
                                    <span>{option.text}</span>
                                </button>
                            );
                        })}
                    </div>

                    {isAnswered && currentQuestion.explanation && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-6 p-4 bg-slate-800/80 border border-slate-600 rounded-lg text-sm text-slate-300"
                        >
                            <span className="font-bold text-secondary block mb-1">Explanation:</span>
                            {currentQuestion.explanation}
                        </motion.div>
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="mt-8 flex justify-between">
                <button
                    onClick={handlePrevious}
                    disabled={currentQuestionIndex === 0 || isAnswered}
                    className={`px-6 py-2 rounded-lg font-medium ${currentQuestionIndex === 0 || isAnswered
                        ? 'opacity-50 cursor-not-allowed text-slate-500'
                        : 'text-white hover:bg-slate-700'
                        }`}
                >
                    Previous
                </button>

                {!isAnswered ? (
                    <button
                        onClick={checkAnswer}
                        className="px-6 py-2 bg-primary hover:bg-indigo-600 text-white rounded-lg font-medium transition-colors shadow-lg shadow-primary/25"
                    >
                        Check Answer
                    </button>
                ) : (
                    <button
                        onClick={handleNext}
                        className="px-6 py-2 bg-secondary hover:bg-yellow-500 text-slate-900 rounded-lg font-bold transition-colors shadow-lg shadow-secondary/25"
                    >
                        {currentQuestionIndex === totalQuestions - 1 ? 'Finish Quiz' : 'Next Question'}
                    </button>
                )}
            </div>
        </div>
    );
};

export default QuizInterface;
