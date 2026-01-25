
import React from 'react';

const Microsoft365Icon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect width="24" height="24" rx="4" fill="#F25022"/>
        <path d="M5 5H11V11H5V5Z" fill="#7FBA00"/>
        <path d="M13 5H19V11H13V5Z" fill="#00A4EF"/>
        <path d="M5 13H11V19H5V13Z" fill="#FFB900"/>
    </svg>
);

export default Microsoft365Icon;
