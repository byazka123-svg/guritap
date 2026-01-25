
import React from 'react';

const GrammarlyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <circle cx="12" cy="12" r="12" fill="#2E9D66"/>
        <path d="M12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20C13.84 20 15.54 19.38 16.87 18.35L12 12.5V4Z" fill="white"/>
    </svg>
);

export default GrammarlyIcon;
