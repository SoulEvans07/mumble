import { MouseEvent, ReactElement, useMemo } from 'react';
import './PlayerBar.scss';

import { useDispatch } from '../../contexts/store/StoreContext';
import { artists, tracks } from '../../types/mockData';
import { Icon } from '../../components/ui/Icon/Icon';
import { CoverImage } from '../../components/common/CoverImage/CoverImage';
import { changePlayerVisibility } from '../../contexts/store/actions';

export function PlayerBar(): ReactElement {
  const [track, artist] = useMemo(() => {
    const track = tracks[0];
    const artist = artists.find(a => a.id === track.artistId);

    return [track, artist];
  }, [tracks, artists]);

  const dispatch = useDispatch();
  const openPlayer = () => dispatch(changePlayerVisibility(true));

  const onPlayPause = (e: MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <section className="player-bar" onClick={openPlayer}>
      <CoverImage albumId={track.albumId} />
      <div className="text-block">
        <span className="title">{track.title}</span>
        <span className="artist">{artist?.name || 'Unknown artist'}</span>
      </div>
      <Icon icon="play" className="play-icon" onClick={onPlayPause} />
    </section>
  );
}
