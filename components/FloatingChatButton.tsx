import React from 'react';
import { WhatsappIcon } from './icons';

interface FloatingChatButtonProps {
    onClick: () => void;
}

const FloatingChatButton: React.FC<FloatingChatButtonProps> = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="fixed bottom-20 right-6 sm:bottom-8 sm:right-8 z-40 w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/40 animate-pulse hover:animate-none hover:scale-110 transition-transform duration-300"
            aria-label="Chat with admin on WhatsApp"
        >
            <WhatsappIcon className="w-8 h-8 text-white" />
        </button>
    );
};

export default FloatingChatButton;