
import React from 'react';

const NordVpnIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect width="24" height="24" rx="4" fill="#4687FF"/>
        <path d="M6 18L12 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 14H16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

export default NordVpnIcon;
