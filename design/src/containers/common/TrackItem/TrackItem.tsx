import { ReactElement, useMemo } from 'react';
import './TrackItem.scss';

import { Track } from '../../../types/model';
import { CoverImage } from '../CoverImage/CoverImage';
import { useDispatch, useSelector } from '../../../contexts/store/StoreContext';
import { getArtists } from '../../../contexts/store/selectors';
import { queueTracks } from '../../../contexts/store/actions';

interface TrackItemProps {
  item: Track;
}

export function TrackItem(props: TrackItemProps): ReactElement {
  const { item } = props;
  const dispatch = useDispatch();
  const artists = useSelector(getArtists);

  const artist = useMemo(() => (!!item.artistId ? artists[item.artistId] : undefined), [artists, item]);

  const startTrack = () => dispatch(queueTracks(item));

  return (
    <li className="track-item" onClick={startTrack}>
      <CoverImage albumId={item.albumId} />
      <div className="text-block">
        <span className="title">{item.title}</span>
        <span className="artist">{artist?.name || 'Unknown artist'}</span>
      </div>
    </li>
  );
}
