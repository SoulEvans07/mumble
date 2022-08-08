import { ReactElement, useMemo } from 'react';
import './CoverMosaic.scss';

import { albums } from '../../../types/mockData';
import { Track } from '../../../types/model';
import { CoverImage } from '../CoverImage/CoverImage';
import { Random } from '../../../utils/Random';

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

  return (
    <div className="cover-mosaic">
      <CoverImage src={topLeft} hue={Random.number(360)} />
      <CoverImage src={topRight} hue={Random.number(360)} />
      <CoverImage src={bottomLeft} hue={Random.number(360)} />
      <CoverImage src={bottomRight} hue={Random.number(360)} />
    </div>
  );
}
