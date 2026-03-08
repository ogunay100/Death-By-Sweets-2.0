import React from 'react'

interface SkullProps {
  className?: string
  size?: number
  blushColor?: string
}

export function Skull({ className = '', size = 120, blushColor = '#F5A0C0' }: SkullProps) {
  return (
    <svg
      viewBox="0 0 200 220"
      width={size}
      height={size * 1.1}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main skull shape */}
      <ellipse cx="100" cy="95" rx="80" ry="88" fill="#E8D5BF" />
      {/* Jaw */}
      <ellipse cx="100" cy="160" rx="50" ry="35" fill="#E8D5BF" />
      {/* Left eye socket */}
      <ellipse cx="70" cy="85" rx="22" ry="26" fill="#0D0A0E" />
      {/* Right eye socket */}
      <ellipse cx="130" cy="85" rx="22" ry="26" fill="#0D0A0E" />
      {/* Left eye shine */}
      <ellipse cx="62" cy="78" rx="6" ry="7" fill="#1A1520" opacity="0.4" />
      {/* Right eye shine */}
      <ellipse cx="122" cy="78" rx="6" ry="7" fill="#1A1520" opacity="0.4" />
      {/* Nose */}
      <path d="M95 115 Q100 125 105 115 Q102 120 100 122 Q98 120 95 115Z" fill="#C4A882" />
      {/* Mouth line */}
      <path d="M80 150 Q100 160 120 150" stroke={blushColor} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Blush left */}
      <ellipse cx="55" cy="115" rx="12" ry="7" fill={blushColor} opacity="0.35" />
      {/* Blush right */}
      <ellipse cx="145" cy="115" rx="12" ry="7" fill={blushColor} opacity="0.35" />
      {/* Teeth marks */}
      <line x1="90" y1="145" x2="90" y2="155" stroke="#C4A882" strokeWidth="1" opacity="0.4" />
      <line x1="100" y1="143" x2="100" y2="155" stroke="#C4A882" strokeWidth="1" opacity="0.4" />
      <line x1="110" y1="145" x2="110" y2="155" stroke="#C4A882" strokeWidth="1" opacity="0.4" />
    </svg>
  )
}

export function MiniSkull({ className = '', size = 40 }: { className?: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 200 220"
      width={size}
      height={size * 1.1}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="100" cy="95" rx="80" ry="88" fill="#E8D5BF" />
      <ellipse cx="100" cy="160" rx="50" ry="35" fill="#E8D5BF" />
      <ellipse cx="70" cy="85" rx="22" ry="26" fill="#0D0A0E" />
      <ellipse cx="130" cy="85" rx="22" ry="26" fill="#0D0A0E" />
      <ellipse cx="55" cy="115" rx="12" ry="7" fill="#F5A0C0" opacity="0.35" />
      <ellipse cx="145" cy="115" rx="12" ry="7" fill="#F5A0C0" opacity="0.35" />
      <path d="M80 150 Q100 160 120 150" stroke="#F5A0C0" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  )
}

export function Rose({ className = '', size = 60, color = '#2A1F33' }: { className?: string; size?: number; color?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer petals */}
      <ellipse cx="50" cy="45" rx="30" ry="20" fill={color} transform="rotate(0 50 50)" />
      <ellipse cx="50" cy="45" rx="30" ry="20" fill={color} transform="rotate(60 50 50)" />
      <ellipse cx="50" cy="45" rx="30" ry="20" fill={color} transform="rotate(120 50 50)" />
      {/* Inner petals */}
      <ellipse cx="50" cy="48" rx="18" ry="12" fill={color} opacity="0.7" transform="rotate(30 50 50)" />
      <ellipse cx="50" cy="48" rx="18" ry="12" fill={color} opacity="0.7" transform="rotate(90 50 50)" />
      <ellipse cx="50" cy="48" rx="18" ry="12" fill={color} opacity="0.7" transform="rotate(150 50 50)" />
      {/* Center */}
      <circle cx="50" cy="50" r="8" fill={color} opacity="0.9" />
      {/* Stem */}
      <path d="M50 70 Q48 85 50 100" stroke="#1A3A1A" strokeWidth="2" fill="none" opacity="0.3" />
    </svg>
  )
}

export function Heart({ className = '', size = 20, color = '#F5A0C0' }: { className?: string; size?: number; color?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        fill={color}
      />
    </svg>
  )
}

export function Sparkle({ className = '', size = 16 }: { className?: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z"
        fill="#F5A0C0"
      />
    </svg>
  )
}
