const Logo = ({ size = 32 }) => {
  return (
    <svg 
      width={size * 4} 
      height={size} 
      viewBox="0 0 200 50" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Network/Connection Icon */}
      <g>
        {/* Dots */}
        <circle cx="12" cy="25" r="3" fill="#F97316" />
        <circle cx="22" cy="15" r="3" fill="#00F5D4" />
        <circle cx="22" cy="35" r="3" fill="#00F5D4" />
        <circle cx="32" cy="25" r="3" fill="#F97316" />
        <circle cx="18" cy="25" r="2" fill="#7C3AED" opacity="0.6" />
        
        {/* Lines connecting dots */}
        <line x1="12" y1="25" x2="22" y2="15" stroke="#00F5D4" strokeWidth="2" opacity="0.6" />
        <line x1="12" y1="25" x2="22" y2="35" stroke="#00F5D4" strokeWidth="2" opacity="0.6" />
        <line x1="22" y1="15" x2="32" y2="25" stroke="#F97316" strokeWidth="2" opacity="0.6" />
        <line x1="22" y1="35" x2="32" y2="25" stroke="#F97316" strokeWidth="2" opacity="0.6" />
      </g>
      
      {/* Text "eventify" */}
      <text x="42" y="35" fontFamily="Arial, sans-serif" fontSize="28" fontWeight="700" fill="#1E3A8A">
        e
      </text>
      <text x="58" y="35" fontFamily="Arial, sans-serif" fontSize="28" fontWeight="700" fill="#F97316">
        v
      </text>
      <text x="72" y="35" fontFamily="Arial, sans-serif" fontSize="28" fontWeight="700" fill="#1E3A8A">
        e
      </text>
      <text x="88" y="35" fontFamily="Arial, sans-serif" fontSize="28" fontWeight="700" fill="#1E3A8A">
        n
      </text>
      <text x="106" y="35" fontFamily="Arial, sans-serif" fontSize="28" fontWeight="700" fill="#1E3A8A">
        t
      </text>
      <text x="118" y="35" fontFamily="Arial, sans-serif" fontSize="28" fontWeight="700" fill="#1E3A8A">
        i
      </text>
      <text x="128" y="35" fontFamily="Arial, sans-serif" fontSize="28" fontWeight="700" fill="#1E3A8A">
        f
      </text>
      <text x="140" y="35" fontFamily="Arial, sans-serif" fontSize="28" fontWeight="700" fill="#00F5D4">
        y
      </text>
    </svg>
  );
};

export default Logo;
