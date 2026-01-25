
import React from 'react';

const IbisPaintIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect width="24" height="24" rx="4" fill="#1C1C1E"/>
        <path d="M12 6C12 6 8 10 8 13C8 15.2091 9.79086 17 12 17C14.2091 17 16 15.2091 16 13C16 10 12 6 12 6Z" fill="#40C4FF"/>
        <path d="M12 17L12 20" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

export default IbisPaintIcon;
