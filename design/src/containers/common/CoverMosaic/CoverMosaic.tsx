import { ReactElement, useMemo } from 'react';
import './CoverMosaic.scss';

import { Track } from '../../../types/model';
import { CoverImage } from '../CoverImage/CoverImage';
import { stringToHash } from '../../../utils/stringToHash';
import { getAlbums } from '../../../contexts/store/selectors';
import { useSelector } from '../../../contexts/store/StoreContext';

interface CoverMosaicProps {
  tracks: Track[];
}

export function CoverMosaic(props: CoverMosaicProps): ReactElement {
  const { tracks } = props;
  const albums = useSelector(getAlbums);

  const [topLeft, topRight, bottomLeft, bottomRight] = useMemo(() => {
    const covers: string[] = [];

    for (const track of tracks) {
      if (!track.albumId) continue;

      const album = albums[track.albumId];
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
