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
