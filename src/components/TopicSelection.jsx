import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Cpu, Wifi, Layers, Activity, Terminal } from 'lucide-react';

const TopicSelection = ({ topics, onSelect }) => {
    // Helper to get icon based on topic name
    const getIcon = (name) => {
        const lower = name.toLowerCase();
        if (lower.includes('adc')) return <Activity className="w-8 h-8" />;
        if (lower.includes('gpio')) return <Cpu className="w-8 h-8" />;
        if (lower.includes('communication')) return <Wifi className="w-8 h-8" />;
        if (lower.includes('os')) return <Layers className="w-8 h-8" />;
        if (lower.includes('c')) return <Terminal className="w-8 h-8" />;
        return <BookOpen className="w-8 h-8" />;
    };

    return (
        <div className="space-y-6" role="region" aria-label="Topic selection">
            <h2 className="text-xl sm:text-2xl font-semibold text-center mb-4 sm:mb-6 text-white">Choose a Topic</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {/* All Topics Option */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSelect({
                        topic: "All Topics",
                        questions: topics.flatMap(t => t.questions),
                        isAllTopics: true
                    })}
                    className="flex flex-col items-center justify-center p-5 sm:p-6 rounded-lg border-2 sm:border-4 transition-all group sm:col-span-2 lg:col-span-3 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    style={{
                        background: 'linear-gradient(135deg, #FF6B9D 0%, #FFD93D 25%, #6BCB77 50%, #4D96FF 75%, #FF6B9D 100%)',
                        backgroundSize: '200% 200%',
                        animation: 'gradient 3s ease infinite',
                    }}
                    aria-label={`All Topics - ${topics.reduce((sum, t) => sum + t.questions.length, 0)} questions`}
                >
                    <span className="text-2xl sm:text-3xl font-bold text-white text-center mb-2">
                        All Topics - Ultimate Challenge
                    </span>
                    <span className="text-base sm:text-lg text-white font-medium">
                        {topics.reduce((sum, t) => sum + t.questions.length, 0)} Questions • Randomized Order
                    </span>
                </motion.button>

                {/* Individual Topics */}
                {topics.map((topic, index) => (
                    <motion.button
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onSelect(topic)}
                        className="flex flex-col items-center justify-center p-5 sm:p-6 bg-slate-700 rounded-lg border-2 border-slate-600 hover:border-primary transition-all group min-h-[140px] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        aria-label={`${topic.topic} - ${topic.questions.length} questions`}
                    >
                        <div className="mb-3 sm:mb-4 text-slate-300 group-hover:text-primary transition-colors" aria-hidden="true">
                            {getIcon(topic.topic)}
                        </div>
                        <span className="text-base sm:text-lg font-semibold text-center text-white mb-1">{topic.topic}</span>
                        <span className="text-sm text-slate-300">{topic.questions.length} Questions</span>
                    </motion.button>
                ))}
            </div>
        </div>
    );
};

export default TopicSelection;
