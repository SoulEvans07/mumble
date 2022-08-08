import { ReactElement, useMemo } from 'react';
import './TrackItem.scss';

import { Track } from '../../../types/model';
import { CoverImage } from '../CoverImage/CoverImage';
import { useSelector } from '../../../contexts/store/StoreContext';
import { getArtists } from '../../../contexts/store/selectors';

interface TrackItemProps {
  item: Track;
}

export function TrackItem(props: TrackItemProps): ReactElement {
  const { item } = props;
  const artists = useSelector(getArtists);

  const artist = useMemo(() => (!!item.artistId ? artists[item.artistId] : undefined), [artists, item]);

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
