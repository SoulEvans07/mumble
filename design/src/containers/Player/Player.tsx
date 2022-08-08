import { ReactElement } from 'react';
import './Player.scss';

import { useDispatch, useSelector } from '../../contexts/store/StoreContext';
import { getPlayerState, getPlayerVisibility } from '../../contexts/store/selectors';
import { changePlayerVisibility } from '../../contexts/store/actions';
import { Icon } from '../../components/ui/Icon/Icon';
import { CoverImage } from '../common/CoverImage/CoverImage';

export function Player(): ReactElement {
  const dispatch = useDispatch();
  const isVisible = useSelector(getPlayerVisibility);

  const { isPlaying, track, artist, percent } = useSelector(getPlayerState);

  if (!isVisible || !track) return <></>;

  const onBack = () => dispatch(changePlayerVisibility(false));

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
    </section>
  );
}
