
import React from 'react';

const ViuIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect width="24" height="24" rx="4" fill="#FFC107"/>
        <path d="M6 7L9 17H11L14 7H12L10 13L8 7H6Z" fill="black"/>
        <path d="M15 7H17V17H15V7Z" fill="black"/>
    </svg>
);

export default ViuIcon;
