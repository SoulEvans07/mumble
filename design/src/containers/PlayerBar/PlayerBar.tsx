import { CSSProperties, MouseEvent, ReactElement } from 'react';
import './PlayerBar.scss';

import { useDispatch, useSelector } from '../../contexts/store/StoreContext';
import { Icon } from '../../components/ui/Icon/Icon';
import { CoverImage } from '../common/CoverImage/CoverImage';
import { changePlayerVisibility, pausePlay, resumePlay } from '../../contexts/store/actions';
import { getPlayerState } from '../../contexts/store/selectors';

export function PlayerBar(): ReactElement {
  const dispatch = useDispatch();
  const { hasPlaylist, isPlaying, track, artist, percent } = useSelector(getPlayerState);

  if (!hasPlaylist) return <></>;

  const openPlayer = () => dispatch(changePlayerVisibility(true));

  const onPlay = (e: MouseEvent) => {
    e.stopPropagation();
    dispatch(resumePlay());
  };

  const onPause = (e: MouseEvent) => {
    e.stopPropagation();
    dispatch(pausePlay());
  };

  const progressStyle = { '--progress': `${percent}%` } as CSSProperties;

  return (
    <section className="player-bar" onClick={openPlayer}>
      <div className="track-block">
        <CoverImage albumId={track.albumId} />
        <div className="text-block">
          <span className="title">{track.title}</span>
          <span className="artist">{artist?.name || 'Unknown artist'}</span>
        </div>
        {isPlaying ? (
          <Icon icon="pause" className="play-icon" onClick={onPause} />
        ) : (
          <Icon icon="play" className="play-icon" onClick={onPlay} />
        )}
      </div>
      <div className="timeline">
        <div className="current-time" style={progressStyle} />
      </div>
    </section>
  );
}
