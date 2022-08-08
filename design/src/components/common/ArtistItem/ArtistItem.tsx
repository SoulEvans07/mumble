import { ReactElement } from 'react';
import { Artist } from '../../../types/model';
import './ArtistItem.scss';

interface ArtistItemProps {
  item: Artist;
}

export function ArtistItem(props: ArtistItemProps): ReactElement {
  const { item } = props;

  return (
    <li className="artist-item">
      <span className="name">{item.name}</span>
      <span className="details">
        {} Albums, {} Songs
      </span>
    </li>
  );
}
