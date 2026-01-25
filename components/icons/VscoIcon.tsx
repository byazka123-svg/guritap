
import React from 'react';

const VscoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect width="24" height="24" rx="4" fill="#000000"/>
        <circle cx="12" cy="12" r="7" stroke="white" strokeWidth="2"/>
        <circle cx="12" cy="12" r="3" fill="white"/>
    </svg>
);

export default VscoIcon;
