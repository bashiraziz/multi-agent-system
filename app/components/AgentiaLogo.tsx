import type React from "react"

interface AgentiaLogoProps {
  className?: string
}

export const AgentiaLogo: React.FC<AgentiaLogoProps> = ({ className = "w-10 h-10" }) => {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="centralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6B6B" />
          <stop offset="100%" stopColor="#4ECDC4" />
        </linearGradient>
        <linearGradient id="outerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#45B7D1" />
          <stop offset="100%" stopColor="#E5FCC2" />
        </linearGradient>
      </defs>

      {/* Central node */}
      <circle cx="50" cy="50" r="20" fill="url(#centralGradient)" />

      {/* Outer nodes */}
      <circle cx="20" cy="50" r="10" fill="url(#outerGradient)" />
      <circle cx="80" cy="50" r="10" fill="url(#outerGradient)" />
      <circle cx="50" cy="20" r="10" fill="url(#outerGradient)" />
      <circle cx="50" cy="80" r="10" fill="url(#outerGradient)" />

      {/* Connecting lines */}
      <line x1="30" y1="50" x2="70" y2="50" stroke="#45B7D1" strokeWidth="4" />
      <line x1="50" y1="30" x2="50" y2="70" stroke="#45B7D1" strokeWidth="4" />

      {/* Diagonal lines */}
      <line x1="35" y1="35" x2="65" y2="65" stroke="#45B7D1" strokeWidth="4" />
      <line x1="35" y1="65" x2="65" y2="35" stroke="#45B7D1" strokeWidth="4" />
    </svg>
  )
}

