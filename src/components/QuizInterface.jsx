import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Circle, Clock } from 'lucide-react';

const QuizInterface = ({ topic, onSubmit, onBack }) => {
    // Shuffle questions if All Topics mode
    const shuffledQuestions = topic.isAllTopics
        ? [...topic.questions].sort(() => Math.random() - 0.5)
        : topic.questions;

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

    const handleOptionToggle = (optionIndex) => {
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

    const handleNext = () => {
        if (currentQuestionIndex < totalQuestions - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            handleSubmit();
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleSubmit = () => {
        // Calculate score
        let score = 0;
        shuffledQuestions.forEach(q => {
            const userSelected = answers[q.id] || [];
            const correctIndices = q.options
                .map((opt, idx) => opt.isCorrect ? idx : -1)
                .filter(idx => idx !== -1);

            // Check if arrays match (ignoring order)
            const isCorrect = userSelected.length === correctIndices.length &&
                userSelected.every(val => correctIndices.includes(val));

            if (isCorrect) {
                score++;
            }
        });

        onSubmit(answers, score, elapsedTime);
    };

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
                            return (
                                <button
                                    key={idx}
                                    onClick={() => handleOptionToggle(idx)}
                                    className={`w-full text-left p-4 rounded-lg border transition-all flex items-start gap-3
                    ${isSelected
                                            ? 'bg-primary/20 border-primary text-white'
                                            : 'bg-slate-700/50 border-slate-600 hover:bg-slate-700 hover:border-slate-500'
                                        }`}
                                >
                                    <div className={`mt-1 ${isSelected ? 'text-primary' : 'text-slate-400'}`}>
                                        {isSelected ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                                    </div>
                                    <span>{option.text}</span>
                                </button>
                            );
                        })}
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="mt-8 flex justify-between">
                <button
                    onClick={handlePrevious}
                    disabled={currentQuestionIndex === 0}
                    className={`px-6 py-2 rounded-lg font-medium ${currentQuestionIndex === 0
                        ? 'opacity-50 cursor-not-allowed text-slate-500'
                        : 'text-white hover:bg-slate-700'
                        }`}
                >
                    Previous
                </button>
                <button
                    onClick={handleNext}
                    className="px-6 py-2 bg-primary hover:bg-indigo-600 text-white rounded-lg font-medium transition-colors shadow-lg shadow-primary/25"
                >
                    {currentQuestionIndex === totalQuestions - 1 ? 'Submit Quiz' : 'Next Question'}
                </button>
            </div>
        </div>
    );
};

export default QuizInterface;
