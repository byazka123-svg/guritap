
import React from 'react';

const PicsartIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect width="24" height="24" rx="12" fill="url(#picsart-grad)" />
        <path d="M12 7V17" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <path d="M12 12C14.5 12 16 10 16 8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <defs>
            <linearGradient id="picsart-grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop stopColor="#902BFF"/>
            <stop offset="1" stopColor="#30D4DB"/>
            </linearGradient>
        </defs>
    </svg>
);

export default PicsartIcon;
