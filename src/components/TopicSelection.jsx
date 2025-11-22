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
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-center mb-6">Choose a Topic</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* All Topics Option */}
                <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSelect({
                        topic: "🌟 All Topics",
                        questions: topics.flatMap(t => t.questions),
                        isAllTopics: true
                    })}
                    className="flex flex-col items-center justify-center p-6 rounded-lg border-4 transition-all group md:col-span-2 lg:col-span-3"
                    style={{
                        background: 'linear-gradient(135deg, #FF6B9D 0%, #FFD93D 25%, #6BCB77 50%, #4D96FF 75%, #FF6B9D 100%)',
                        backgroundSize: '200% 200%',
                        animation: 'gradient 3s ease infinite',
                        borderImage: 'linear-gradient(45deg, #FF6B9D, #FFD93D, #6BCB77, #4D96FF) 1',
                    }}
                >
                    <div className="mb-4 text-white text-6xl">🎯</div>
                    <span className="text-2xl font-bold text-white text-center drop-shadow-lg">
                        All Topics - Ultimate Challenge
                    </span>
                    <span className="text-lg text-white mt-2 font-semibold">
                        {topics.reduce((sum, t) => sum + t.questions.length, 0)} Questions • Randomized Order
                    </span>
                </motion.button>

                {/* Individual Topics */}
                {topics.map((topic, index) => (
                    <motion.button
                        key={index}
                        whileHover={{ scale: 1.03, backgroundColor: 'rgba(51, 65, 85, 1)' }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onSelect(topic)}
                        className="flex flex-col items-center justify-center p-6 bg-slate-700 rounded-lg border border-slate-600 hover:border-primary transition-colors group"
                    >
                        <div className="mb-4 text-slate-400 group-hover:text-primary transition-colors">
                            {getIcon(topic.topic)}
                        </div>
                        <span className="text-lg font-medium text-center">{topic.topic}</span>
                        <span className="text-sm text-slate-400 mt-2">{topic.questions.length} Questions</span>
                    </motion.button>
                ))}
            </div>
        </div>
    );
};

export default TopicSelection;
