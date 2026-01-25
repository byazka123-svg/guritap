
import React from 'react';

const MeituIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect width="24" height="24" rx="4" fill="#FF5A79"/>
        <path d="M12 5L15 10H9L12 5Z" fill="white"/>
        <path d="M12 19L9 14H15L12 19Z" fill="white"/>
    </svg>
);

export default MeituIcon;
