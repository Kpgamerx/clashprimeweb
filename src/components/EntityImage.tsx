import { useState } from 'react';
import { getEntityImage } from '../data/assetMap';

interface EntityImageProps {
  name: string;
  level?: number;
  size?: number;
  className?: string;
  fallback?: React.ReactNode;
  isMaxed?: boolean;
}

export default function EntityImage({
  name,
  level,
  size = 40,
  className = '',
  fallback,
  isMaxed = false,
}: EntityImageProps) {
  const [error, setError] = useState(false);
  const src = getEntityImage(name);

  if (!src || error) {
    return (
      <div
        className={`flex items-center justify-center bg-bg-tertiary rounded-md ${isMaxed ? 'gold-glow' : ''} ${className}`}
        style={{ width: size, height: size }}
      >
        {fallback || (
          <span className="text-xs text-text-muted font-medium">
            {name.slice(0, 2).toUpperCase()}
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      className={`relative rounded-md overflow-hidden ${isMaxed ? 'gold-glow' : ''} ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        src={src}
        alt={name}
        width={size}
        height={size}
        className="w-full h-full object-contain"
        onError={() => setError(true)}
        loading="lazy"
      />
      {isMaxed && (
        <div className="absolute inset-0 ring-1 ring-inset ring-gold/40 rounded-md" />
      )}
    </div>
  );
}
