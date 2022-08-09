import { CSSProperties, MouseEvent, ReactElement, TouchEvent, useMemo, useState } from 'react';
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

  const [dragging, setDragging] = useState(false);
  const [posY, setPosY] = useState<number | undefined>(0);
  const [offset, setOffset] = useState(0);
  const maskOffset = useMemo(() => ({ '--offset': `${offset}px` } as CSSProperties), [offset]);

  if (!isVisible || !track) return <></>;

  const onBack = () => dispatch(changePlayerVisibility(false));

  const progressStyle = { '--progress': `${percent}%` } as CSSProperties;

  const onPlay = () => dispatch(resumePlay());
  const onPause = () => dispatch(pausePlay());

  const onPrev = () => dispatch(queuePrev());
  const onNext = () => dispatch(queueNext());

  const onRepeat = (mode: RepeatMode) => dispatch(setRepeatMode(mode));
  const onShuffle = () => dispatch(toggleShuffle());

  const min = -195;
  const max = 0;
  const onDragStart = (e: MouseEvent) => {
    setDragging(true);
    setPosY(e.clientY);
  };
  const onDragStop = () => {
    setDragging(false);
    setPosY(undefined);
    if (offset > min / 2) setOffset(max);
    else setOffset(min);
  };
  const onDrag = (e: MouseEvent) => {
    if (dragging && posY !== undefined) {
      setPosY(e.clientY);
      setOffset(prev => Math.min(Math.max(prev + posY - e.clientY, min), max));
    }
  };

  const onTouchDragStart = (e: TouchEvent) => {
    setDragging(true);
    setPosY(e.touches[0].clientY);
  };
  const onTouchDragStop = () => {
    setDragging(false);
    setPosY(undefined);
    if (offset > min / 2) setOffset(max);
    else setOffset(min);
  };
  const onTouchDrag = (e: TouchEvent) => {
    if (dragging && posY !== undefined) {
      setPosY(e.touches[0].clientY);
      setOffset(prev => Math.min(Math.max(prev + posY - e.touches[0].clientY, min), max));
    }
  };

  return (
    <section
      className="player"
      onMouseMove={onDrag}
      onMouseUp={onDragStop}
      onMouseLeave={onDragStop}
      onTouchMove={onTouchDrag}
      onTouchEnd={onTouchDragStop}
    >
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
        <div className="controls-handle" onMouseDown={onDragStart} onTouchStart={onTouchDragStart}>
          <div className="handle" />
        </div>
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
