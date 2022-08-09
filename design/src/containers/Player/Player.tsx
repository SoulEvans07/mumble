import { CSSProperties, ReactElement } from 'react';
import './Player.scss';

import { useDispatch, useSelector } from '../../contexts/store/StoreContext';
import { getPlayerState, getPlayerVisibility } from '../../contexts/store/selectors';
import {
  changePlayerVisibility,
  resumePlay,
  pausePlay,
  toggleShuffle,
  setRepeatMode,
  queueNext,
  queuePrev,
} from '../../contexts/store/actions';
import { Icon } from '../../components/ui/Icon/Icon';
import { CoverImage } from '../common/CoverImage/CoverImage';
import { IconCheckbox } from '../../components/control/IconCheckbox/IconCheckbox';
import { IconMultiCheckbox } from '../../components/control/IconMultiCheckbox/IconMultiCheckbox';
import { RepeatMode } from '../../contexts/store/types';

export function Player(): ReactElement {
  const dispatch = useDispatch();
  const isVisible = useSelector(getPlayerVisibility);

  const { isPlaying, track, artist, percent, position, duration, shuffle, repeat } = useSelector(getPlayerState);

  if (!isVisible || !track) return <></>;

  const onBack = () => dispatch(changePlayerVisibility(false));

  const progressStyle = { '--progress': `${percent}%` } as CSSProperties;

  const onPlay = () => dispatch(resumePlay());
  const onPause = () => dispatch(pausePlay());

  const onPrev = () => dispatch(queuePrev());
  const onNext = () => dispatch(queueNext());

  const onRepeat = (mode: RepeatMode) => dispatch(setRepeatMode(mode));
  const onShuffle = () => dispatch(toggleShuffle());

  const maskOffset = { '--offset': `${0}rem` } as CSSProperties;

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
        <div className="line">You make it seem like it is something brand new</div>
        <div className="line current">I've never met as agile as you</div>
        <div className="line">You have a way with doing the things you do, yeah</div>
        <div className="line">You have a way with doing the things you do, yeah</div>
        <div className="line">You have a way with doing the things you do, yeah</div>
        <div className="line">You have a way with doing the things you do, yeah</div>
        <div className="line">You have a way with doing the things you do, yeah</div>
        <div className="line">You have a way with doing the things you do, yeah</div>
      </section>
      <div className="mask" style={maskOffset} />
      <section className="controls" style={maskOffset}>
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
        <div className="queue-controls">
          <IconCheckbox icon="shuffle" className="shuffle-btn" checked={shuffle} onClick={onShuffle} />
          <Icon icon="backward-step" className="prev-btn" onClick={onPrev} />
          {isPlaying ? (
            <Icon icon="pause" className="play-btn" onClick={onPause} />
          ) : (
            <Icon icon="play" className="play-btn" onClick={onPlay} />
          )}
          <Icon icon="forward-step" className="next-btn" onClick={onNext} />
          <IconMultiCheckbox
            icon="repeat"
            className="repeat-btn"
            value={repeat}
            states={[
              { value: 'no-repeat' },
              { value: 'repeat', checked: true },
              { value: 'single', checked: true, icon: 'repeat-1' },
            ]}
            onChange={onRepeat}
          />
        </div>
        <div className="bottom-menus">
          <div className="btn">
            <Icon icon="ellipsis" />
          </div>
          <div className="btn center">Lyrics</div>
          <div className="btn">
            <Icon icon="queue-list" />
          </div>
        </div>
      </section>
    </section>
  );
}
