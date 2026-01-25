
import React from 'react';

const LinktreeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect width="24" height="24" rx="4" fill="#43E560"/>
        <path d="M12 4V20" stroke="black" strokeWidth="2" strokeLinecap="round"/>
        <path d="M8 8L16 8" stroke="black" strokeWidth="2" strokeLinecap="round"/>
        <path d="M8 16L16 16" stroke="black" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

export default LinktreeIcon;
