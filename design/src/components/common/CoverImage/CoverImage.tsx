import { CSSProperties, ReactElement, useMemo } from 'react';
import './CoverImage.scss';

import { albums } from '../../../types/mockData';
import { Icon } from '../../ui/Icon/Icon';

interface CoverImageProps {
  src?: string;
  albumId?: string;
  hue?: number;
}

export function CoverImage(props: CoverImageProps): ReactElement {
  const { src, albumId, hue } = props;

  const coverImage = useMemo(() => {
    if (src) return src;

    if (albumId) {
      const album = albums.find(a => a.id === albumId);
      return album?.coverImage;
    }

    return undefined;
  }, [src, albumId, albums]);

  const hueStyle = {
    ...(hue ? { '--hue': `${hue}deg` } : {}),
    ...(hue ? { '--sat': '40%' } : {}),
    ...(hue ? { '--lit': '40%' } : {}),
  } as CSSProperties;

  return (
    <>
      {coverImage ? (
        <img className="cover-image" src={coverImage} alt="album cover" />
      ) : (
        <div className="cover-image cover-placeholder" style={hueStyle}>
          <Icon icon="music-note" />
        </div>
      )}
    </>
  );
}
