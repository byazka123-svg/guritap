
import React from 'react';

const CanvaIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" {...props}>
        <circle cx="128" cy="128" r="128" fill="#00c4cc"/>
        <path fill="#fff" d="M128 55.42a72.58 72.58 0 1 0 72.58 72.58A72.67 72.67 0 0 0 128 55.42zm-3.52 98a25.53 25.53 0 1 1 25.53-25.53 25.53 25.53 0 0 1-25.53 25.53z"/>
        <path fill="#00c4cc" d="M124.48 128a25.53 25.53 0 1 1 25.53-25.53A25.53 25.53 0 0 1 124.48 128z"/>
    </svg>
);

export default CanvaIcon;
