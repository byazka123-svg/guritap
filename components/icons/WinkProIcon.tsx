
import React from 'react';

const WinkProIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect width="24" height="24" rx="12" fill="black"/>
        <path d="M7 12C7 12 9 9 12 9C15 9 17 12 17 12" stroke="#FF69B4" strokeWidth="2" strokeLinecap="round"/>
        <path d="M15 15L17 12" stroke="#FF69B4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export default WinkProIcon;
