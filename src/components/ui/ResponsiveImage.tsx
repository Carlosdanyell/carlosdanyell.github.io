import { useState, type ImgHTMLAttributes } from 'react'
import type { ImageAsset } from '@/data/projects'

interface Props extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet' | 'width' | 'height'> {
  image: ImageAsset
  alt: string
  sizes: string
  priority?: boolean
}

/** WebP responsivo com placeholder desfocado enquanto carrega. */
export function ResponsiveImage({ image, alt, sizes, priority = false, className = '', style, ...props }: Props) {
  const [loaded, setLoaded] = useState(false)
  return (
    <img
      src={image.src}
      srcSet={image.srcset}
      sizes={sizes}
      width={image.width}
      height={image.height}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      onLoad={() => setLoaded(true)}
      className={className}
      style={{
        backgroundImage: loaded ? undefined : `url(${image.placeholder})`,
        backgroundSize: 'cover',
        ...style,
      }}
      {...props}
    />
  )
}
