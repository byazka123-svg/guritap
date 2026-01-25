
import React from 'react';

const ZoomIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect width="24" height="24" rx="4" fill="#2D8CFF"/>
        <path d="M7 9H17V15H7V9Z" fill="white"/>
        <path d="M17 12L20 15V9L17 12Z" fill="white"/>
    </svg>
);

export default ZoomIcon;
