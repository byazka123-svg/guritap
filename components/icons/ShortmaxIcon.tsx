
import React from 'react';

const ShortmaxIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect width="24" height="24" rx="4" fill="#1E1E1E"/>
        <path d="M8 8L16 8" stroke="#FFD700" strokeWidth="2" strokeLinecap="round"/>
        <path d="M8 12L14 12" stroke="#FFD700" strokeWidth="2" strokeLinecap="round"/>
        <path d="M8 16L12 16" stroke="#FFD700" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

export default ShortmaxIcon;
