
import React from 'react';

const WpsOfficeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect width="24" height="24" rx="4" fill="#D82E21"/>
        <path d="M6 7L8 17L10 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 7V17" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <path d="M12 12C14 12 15 10 15 8.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <path d="M16 7H18L16 12L18 17H16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export default WpsOfficeIcon;
