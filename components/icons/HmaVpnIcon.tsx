
import React from 'react';

const HmaVpnIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect width="24" height="24" rx="4" fill="#FFC107"/>
        <path d="M6 7V17" stroke="black" strokeWidth="2" strokeLinecap="round"/>
        <path d="M18 7V17" stroke="black" strokeWidth="2" strokeLinecap="round"/>
        <path d="M6 12H18" stroke="black" strokeWidth="2" strokeLinecap="round"/>
        <path d="M10 7L12 12L14 7" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export default HmaVpnIcon;
