'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import type { ImgHTMLAttributes } from 'react';

type Props = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  style?: React.CSSProperties;
} & ImgHTMLAttributes<HTMLImageElement>;

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill,
  className,
  priority,
  style,
  ...rest
}: Props) {
  // Derive webp path — only for local images (starts with /).
  // For external URLs (Sanity CDN, etc.) do NOT replace extension, since the file may not exist.
  const isExternal = /^https?:\/\//i.test(src);
  const webp = isExternal ? null : src.replace(/\.(jpe?g|png)$/i, '.webp');
  const webpHref = webp ? encodeURI(webp) : null;

  useEffect(() => {
    if (!priority || !webpHref) return;
    // Add preload for webp to prefer it over png when priority image
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = webpHref;
    link.type = 'image/webp';
    document.head.appendChild(link);

    return () => {
      try {
        document.head.removeChild(link);
      } catch (e) {
        // ignore
      }
    };
  }, [priority, webpHref]);

  return (
    <picture>
      {webpHref && <source srcSet={webpHref} type="image/webp" />}
      {fill ? (
        <Image
          src={src}
          alt={alt}
          fill
          className={className}
          style={style}
          priority={priority}
          {...rest}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={className}
          style={style}
          priority={priority}
          {...rest}
        />
      )}
    </picture>
  );
}
