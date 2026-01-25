
import React from 'react';

const FizzoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect width="24" height="24" rx="4" fill="#FF6D00"/>
        <path d="M8 8V16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <path d="M8 8H12C14 8 14 10 12 10H10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14 16H16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

export default FizzoIcon;
