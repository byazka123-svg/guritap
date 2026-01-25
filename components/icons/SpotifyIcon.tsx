
import React from 'react';

const SpotifyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="12" cy="12" r="12" fill="#1DB954"/>
    <path d="M7.68262 12.3023C11.5369 14.4938 15.7176 13.5683 18.5919 12.0199" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6.81836 9.80078C11.4549 11.9923 16.5912 10.9254 19.9547 8.99969" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8.72754 14.8037C11.6018 16.2403 14.9094 15.8943 17.2276 14.6285" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default SpotifyIcon;
