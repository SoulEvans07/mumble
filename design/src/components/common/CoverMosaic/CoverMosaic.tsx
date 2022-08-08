import { ReactElement, useMemo } from 'react';
import './CoverMosaic.scss';

import { albums } from '../../../types/mockData';
import { Track } from '../../../types/model';
import { CoverImage } from '../CoverImage/CoverImage';
import { stringToHash } from '../../../utils/stringToHash';

interface CoverMosaicProps {
  tracks: Track[];
}

export function CoverMosaic(props: CoverMosaicProps): ReactElement {
  const { tracks } = props;

  const [topLeft, topRight, bottomLeft, bottomRight] = useMemo(() => {
    const covers: string[] = [];

    for (const track of tracks) {
      const album = albums.find(a => a.id === track.albumId);
      if (album && album.coverImage && !covers.includes(album.coverImage)) covers.push(album.coverImage);
      if (covers.length === 4) break;
    }

    return covers;
  }, [tracks, albums]);

  const hues = useMemo(() => tracks.map(t => stringToHash(t.title) % 360), [tracks]);

  return (
    <div className="cover-mosaic">
      <CoverImage src={topLeft} hue={hues[0]} />
      <CoverImage src={topRight} hue={hues[1]} />
      <CoverImage src={bottomLeft} hue={hues[2]} />
      <CoverImage src={bottomRight} hue={hues[3]} />
    </div>
  );
}
