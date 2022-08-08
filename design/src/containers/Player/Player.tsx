import { ReactElement } from 'react';
import './Player.scss';

import { useDispatch, useSelector } from '../../contexts/store/StoreContext';
import { getPlayerVisibility } from '../../contexts/store/selectors';
import { changePlayerVisibility } from '../../contexts/store/actions';

export function Player(): ReactElement {
  const dispatch = useDispatch();
  const isVisible = useSelector(getPlayerVisibility);

  if (!isVisible) return <></>;

  const onBack = () => dispatch(changePlayerVisibility(false));

  return (
    <section className="player">
      <header>
        <span onClick={onBack}>Back</span>
        <h1>Player</h1>
      </header>
    </section>
  );
}
