import { ReactElement, useMemo } from 'react';
import './PlayerBar.scss';

import { artists, tracks } from '../../../types/mockData';
import { Icon } from '../../ui/Icon/Icon';
import { CoverImage } from '../../common/CoverImage/CoverImage';

interface PlayerBarProps {}

export function PlayerBar(props: PlayerBarProps): ReactElement {
  const {} = props;

  const [track, artist] = useMemo(() => {
    const [track] = tracks;
    const artist = artists.find(a => a.id === track.artistId);

    return [track, artist];
  }, [tracks, artists]);

  return (
    <div className="player-bar">
      <CoverImage albumId={track.albumId} />
      <div className="text-block">
        <span className="title">{track.title}</span>
        <span className="artist">{artist?.name || 'Unknown artist'}</span>
      </div>
      <Icon icon="play" className="play-icon" />
    </div>
  );
}
