import React from 'react'

const logoUrl = `${import.meta.env.BASE_URL}logo.png`

interface SkullProps {
  className?: string
  size?: number
  blushColor?: string
}

export function Skull({ className = '', size = 120 }: SkullProps) {
  return (
    <img
      src={logoUrl}
      alt="Death By Sweets"
      width={size}
      height={size}
      className={`rounded-full ${className}`}
      style={{ width: size, height: size, objectFit: 'contain' }}
      draggable={false}
    />
  )
}

export function MiniSkull({ className = '', size = 40 }: { className?: string; size?: number }) {
  return (
    <img
      src={logoUrl}
      alt="Death By Sweets"
      width={size}
      height={size}
      className={`rounded-full ${className}`}
      style={{ width: size, height: size, objectFit: 'contain' }}
      draggable={false}
    />
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
