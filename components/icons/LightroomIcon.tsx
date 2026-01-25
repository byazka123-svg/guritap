
import React from 'react';

const LightroomIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect width="24" height="24" rx="4" fill="#313131"/>
        <path d="M6 7H11V17H8V11H6V7Z" fill="#999999"/>
        <path d="M13 7H18V9H15V17H13V7Z" fill="#ADD8E6"/>
    </svg>
);

export default LightroomIcon;
