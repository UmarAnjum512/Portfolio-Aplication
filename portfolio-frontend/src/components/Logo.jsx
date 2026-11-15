import { useId } from 'react';
import { profile } from '../data/profile';

// Naam ka logo: gradient monogram "UM" + naam.
// Apna image logo lagana ho to is component me <svg> ki jagah <img src="/logo.png" /> laga dein.
const Logo = ({ showText = true, size = 40 }) => {
  const id = useId();
  const [first, ...rest] = profile.name.split(' ');
  const initials = (first[0] + (rest[0]?.[0] || '')).toUpperCase();

  return (
    <span className="logo">
      <svg width={size} height={size} viewBox="0 0 48 48" role="img" aria-label={`${profile.name} logo`}>
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#c9aaff" />
            <stop offset="1" stopColor="#8a55f0" />
          </linearGradient>
        </defs>
        <rect width="48" height="48" rx="13" fill={`url(#${id})`} />
        <text x="24" y="31.5" textAnchor="middle" fontSize="20" fontWeight="800" fill="#101010" fontFamily="Montserrat, Arial, sans-serif">
          {initials}
        </text>
      </svg>
      {showText && (
        <span className="logo-text">
          {first} <b>{rest.join(' ')}</b>
        </span>
      )}
    </span>
  );
};

export default Logo;
