
import React from 'react';

const BstationIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect width="24" height="24" rx="4" fill="#00A1D6"/>
    <path d="M7.5 7.5L10 12L7.5 16.5H16.5V13.5H11.25L13.5 10.5H16.5V7.5H7.5Z" fill="white"/>
  </svg>
);

export default BstationIcon;
