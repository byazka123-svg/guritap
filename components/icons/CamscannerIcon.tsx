
import React from 'react';

const CamscannerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect width="24" height="24" rx="4" fill="#2E7D32"/>
        <path d="M7 4H17V8H7V4Z" fill="white"/>
        <path d="M7 10H17V20H7V10Z" fill="#A5D6A7"/>
        <path d="M10 12H14" stroke="#2E7D32" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M10 15H14" stroke="#2E7D32" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
);

export default CamscannerIcon;
