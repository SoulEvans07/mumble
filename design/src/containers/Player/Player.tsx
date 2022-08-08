import { CSSProperties, ReactElement } from 'react';
import './Player.scss';

import { useDispatch, useSelector } from '../../contexts/store/StoreContext';
import { getPlayerState, getPlayerVisibility } from '../../contexts/store/selectors';
import { changePlayerVisibility } from '../../contexts/store/actions';
import { Icon } from '../../components/ui/Icon/Icon';
import { CoverImage } from '../common/CoverImage/CoverImage';

export function Player(): ReactElement {
  const dispatch = useDispatch();
  const isVisible = useSelector(getPlayerVisibility);

  const { isPlaying, track, artist, percent, position, duration } = useSelector(getPlayerState);

  if (!isVisible || !track) return <></>;

  const onBack = () => dispatch(changePlayerVisibility(false));

  const progressStyle = { '--progress': `${percent}%` } as CSSProperties;

  return (
    <section className="player">
      <header>
        <Icon icon="chevron-down" className="close-btn" onClick={onBack} />
        <div className="track-block">
          <CoverImage albumId={track.albumId} />
          <div className="text-block">
            <span className="title">{track.title}</span>
            <span className="artist">{artist?.name || 'Unknown artist'}</span>
          </div>
        </div>
        <Icon icon="heart" className="fav-btn" />
      </header>
      <div className="background" />
      <section className="lyrics">
        <div className="line">You make me feel like a child, it's true</div>
        <div className="line current">You make it seem like it is something brand new</div>
        <div className="line">I've never met as agile as you</div>
        <div className="line">You have a way with doing the things you do, yeah</div>
      </section>
      <section className="controls">
        <div className="timeline">
          <div className="slider">
            <div className="knob" style={progressStyle} />
            <div className="progress" style={progressStyle} />
          </div>
          <div className="times">
            <span className="position">{position}</span>
            <span className="duration">{duration}</span>
          </div>
        </div>
      </section>
    </section>
  );
}
