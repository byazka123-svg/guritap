
import React from 'react';

const AppleMusicIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect width="24" height="24" rx="4" fill="url(#apple-grad)" />
        <path d="M12 6L12 14" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <path d="M15 8L12 11L9 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="10" cy="16" r="2" fill="white"/>
        <circle cx="14" cy="15" r="2" fill="white"/>
        <defs>
            <linearGradient id="apple-grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FA243C"/>
                <stop offset="1" stopColor="#FC6884"/>
            </linearGradient>
        </defs>
    </svg>
);

export default AppleMusicIcon;
