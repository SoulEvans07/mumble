import { ReactElement, useMemo } from 'react';
import './ArtistItem.scss';

import { useSelector } from '../../../contexts/store/StoreContext';
import { Artist } from '../../../types/model';
import { getAlbums, getTracks } from '../../../contexts/store/selectors';

interface ArtistItemProps {
  item: Artist;
}

export function ArtistItem(props: ArtistItemProps): ReactElement {
  const { item } = props;

  const albums = useSelector(getAlbums);
  const tracks = useSelector(getTracks);
  const artistsAlbums = useMemo(() => Object.values(albums).filter(a => a.artistId === item.id), [albums, item]);
  const songs = useMemo(() => Object.values(tracks).filter(t => t.artistId === item.id), [tracks, item]);

  return (
    <li className="artist-item">
      <span className="name">{item.name}</span>
      <span className="details">
        {artistsAlbums.length} Albums, {songs.length} Songs
      </span>
    </li>
  );
}
