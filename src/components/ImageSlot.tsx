import React, { useState, useRef, useEffect, useCallback } from 'react';

interface ImageSlotProps {
  src: string;
  srcSet?: string;
  sizes?: string;
  alt?: string;
  label?: string;
  spec?: string;
  className?: string;
  isMystery?: boolean;
}

export const ImageSlot: React.FC<ImageSlotProps> = ({
  src,
  srcSet,
  sizes,
  alt,
  label = 'Image',
  spec = '',
  className = '',
  isMystery = false,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const checkStatus = useCallback((node: HTMLImageElement | null) => {
    if (node) {
      imgRef.current = node;
      if (node.complete && node.naturalWidth > 0) {
        setLoaded(true);
      }
    }
  }, []);

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setLoaded(true);
    }
  }, [src, srcSet]);

  if (isMystery) {
    return (
      <div
        className={`ph ph--square ph--mystery ${className}`}
        role="img"
        aria-label={`${label} (placeholder)`}
      >
        <span className="ph__label">{label}</span>
      </div>
    );
  }

  return (
    <div
      className={`ph ${loaded ? 'is-loaded' : ''} ${className}`}
      role={loaded ? undefined : 'img'}
      aria-label={loaded ? undefined : `${label} (placeholder)`}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {!loaded && !failed && (
        <div className="ph__fallback-text" style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 0, padding: '1rem', textAlign: 'center' }}>
          <span className="ph__label" style={{ fontWeight: 600, fontSize: '0.85rem' }}>{label}</span>
          {spec && <span className="ph__spec" style={{ fontSize: '0.75rem', opacity: 0.7 }}>{spec}</span>}
        </div>
      )}
      <img
        ref={checkStatus}
        className="ph__img"
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt || label}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.25s ease-in-out',
          zIndex: 1
        }}
      />
    </div>
  );
};
