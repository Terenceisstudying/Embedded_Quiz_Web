import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

const ConfirmationDialog = ({ isOpen, onConfirm, onCancel, title, message, confirmText = 'Confirm', cancelText = 'Cancel', type = 'warning' }) => {
    if (!isOpen) return null;

    const typeStyles = {
        warning: {
            icon: 'text-yellow-400',
            button: 'bg-yellow-500 hover:bg-yellow-600 text-slate-900'
        },
        danger: {
            icon: 'text-red-400',
            button: 'bg-red-500 hover:bg-red-600 text-white'
        },
        info: {
            icon: 'text-blue-400',
            button: 'bg-blue-500 hover:bg-blue-600 text-white'
        }
    };

    const styles = typeStyles[type] || typeStyles.warning;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-[100] backdrop-blur-sm"
                        onClick={onCancel}
                        aria-hidden="true"
                    />
                    
                    {/* Dialog */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 z-[101] flex items-center justify-center p-4"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="dialog-title"
                        aria-describedby="dialog-message"
                    >
                        <div className="bg-slate-800 rounded-xl border-2 border-slate-600 shadow-2xl max-w-md w-full p-6">
                            <div className="flex items-start gap-4 mb-4">
                                <AlertTriangle className={`w-6 h-6 ${styles.icon} flex-shrink-0 mt-1`} aria-hidden="true" />
                                <div className="flex-1">
                                    <h3 id="dialog-title" className="text-xl font-bold text-white mb-2">
                                        {title}
                                    </h3>
                                    <p id="dialog-message" className="text-slate-300">
                                        {message}
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex gap-3 justify-end mt-6">
                                <button
                                    onClick={onCancel}
                                    className="min-h-[44px] px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
                                    aria-label={cancelText}
                                >
                                    {cancelText}
                                </button>
                                <button
                                    onClick={onConfirm}
                                    className={`min-h-[44px] px-6 py-2 ${styles.button} rounded-lg font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400`}
                                    aria-label={confirmText}
                                >
                                    {confirmText}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ConfirmationDialog;

