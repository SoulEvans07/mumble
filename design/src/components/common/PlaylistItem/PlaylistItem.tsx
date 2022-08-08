import { ReactElement, useMemo } from 'react';
import './PlaylistItem.scss';

import { Playlist } from '../../../types/model';
import { CoverMosaic } from '../CoverMosaic/CoverMosaic';
import { tracks } from '../../../types/mockData';

interface PlaylistItemProps {
  item: Playlist;
}

export function PlaylistItem(props: PlaylistItemProps): ReactElement {
  const { item } = props;

  const trackList = useMemo(() => tracks.filter(t => item.items.includes(t.id)), [item, tracks]);

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
