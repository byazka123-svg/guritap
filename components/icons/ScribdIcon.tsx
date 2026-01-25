
import React from 'react';

const ScribdIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect width="24" height="24" rx="4" fill="#1A7BBA"/>
        <path d="M8 6H16V18H8V6Z" fill="#FFFFFF"/>
        <path d="M12 6V18" stroke="#1A7BBA" strokeWidth="2"/>
    </svg>
);

export default ScribdIcon;
