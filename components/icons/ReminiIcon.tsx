
import React from 'react';

const ReminiIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect width="24" height="24" rx="4" fill="#1A1A1A"/>
        <path d="M4 12H20" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="2 2"/>
        <path d="M4 4L12 12L4 20" fill="#4BFFF4"/>
        <path d="M20 4L12 12L20 20" fill="white"/>
    </svg>
);

export default ReminiIcon;
