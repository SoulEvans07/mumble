import { ReactElement, useMemo } from 'react';
import './TrackItem.scss';

import { Track } from '../../../types/model';
import { artists } from '../../../types/mockData';
import { CoverImage } from '../CoverImage/CoverImage';

interface TrackItemProps {
  item: Track;
}

export function TrackItem(props: TrackItemProps): ReactElement {
  const { item } = props;

  const artist = useMemo(() => artists.find(a => a.id === item.artistId), [artists]);

  return (
    <li className="track-item">
      <CoverImage albumId={item.albumId} />
      <div className="text-block">
        <span className="title">{item.title}</span>
        <span className="artist">{artist?.name || 'Unknown artist'}</span>
      </div>
    </li>
  );
}
