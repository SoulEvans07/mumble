import { ReactElement, useMemo } from 'react';
import './PlaylistItem.scss';

import { Playlist } from '../../../types/model';
import { CoverMosaic } from '../CoverMosaic/CoverMosaic';
import { getTracks } from '../../../contexts/store/selectors';
import { useSelector } from '../../../contexts/store/StoreContext';

interface PlaylistItemProps {
  item: Playlist;
}

export function PlaylistItem(props: PlaylistItemProps): ReactElement {
  const { item } = props;
  const tracks = useSelector(getTracks);

  const trackList = useMemo(() => item.items.map(tid => tracks[tid]).filter(t => !!t), [tracks, item]);

  return (
    <li className="playlist-item">
      <CoverMosaic tracks={trackList} />
      <div className="text-block">
        <span className="title">{item.title}</span>
        <span className="details">{item.items.length} Songs</span>
      </div>
    </li>
  );
}
