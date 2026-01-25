
import React from 'react';

const AlightMotionIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect width="24" height="24" rx="4" fill="black"/>
        <path d="M12 4L4 20H20L12 4Z" stroke="#FF4081" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 11L14.5 16H9.5L12 11Z" fill="#FFD700"/>
    </svg>
);

export default AlightMotionIcon;
