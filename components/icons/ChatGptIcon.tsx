
import React from 'react';

const ChatGptIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect width="24" height="24" rx="4" fill="#74AA9C"/>
        <path d="M12 4L6 9.33333V14.6667L12 20L18 14.6667V9.33333L12 4Z" stroke="white" strokeWidth="1.5"/>
        <path d="M12 12L18 9.33333" stroke="white" strokeWidth="1.5"/>
        <path d="M12 12V20" stroke="white" strokeWidth="1.5"/>
        <path d="M12 12L6 9.33333" stroke="white" strokeWidth="1.5"/>
    </svg>
);

export default ChatGptIcon;
