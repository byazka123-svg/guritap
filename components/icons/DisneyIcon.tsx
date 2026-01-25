
import React from 'react';

const DisneyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M22.9997 11.026C22.6647 6.096 18.2397 3 12.4917 3C6.4997 3 2.1587 6.492 2.0007 12C2.1587 17.508 6.4997 21 12.4917 21C18.2397 21 22.6647 17.904 22.9997 12.974V11.026Z" fill="#001D84"/>
    <path d="M12.4919 3C11.5309 3 10.6389 3.12 9.8029 3.336C12.3949 5.052 16.4989 9.12 18.2869 11.52H22.9279C22.8469 6.888 18.1789 3 12.4919 3Z" fill="url(#disney_grad)"/>
    <defs>
        <linearGradient id="disney_grad" x1="16.3654" y1="3" x2="16.3654" y2="11.52" gradientUnits="userSpaceOnUse">
        <stop stopColor="#99E5FF"/>
        <stop offset="1" stopColor="#0063E5"/>
        </linearGradient>
    </defs>
  </svg>
);

export default DisneyIcon;
