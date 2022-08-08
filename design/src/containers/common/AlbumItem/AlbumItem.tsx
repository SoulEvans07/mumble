import { ReactElement, useMemo } from 'react';
import './AlbumItem.scss';

import { Album } from '../../../types/model';
import { CoverImage } from '../CoverImage/CoverImage';
import { getArtists } from '../../../contexts/store/selectors';
import { useSelector } from '../../../contexts/store/StoreContext';

interface AlbumItemProps {
  item: Album;
}

export function AlbumItem(props: AlbumItemProps): ReactElement {
  const { item } = props;
  const artists = useSelector(getArtists);

  const artist = useMemo(() => (!!item.artistId ? artists[item.artistId] : undefined), [artists, item]);

  return (
    <li className="album-item">
      <CoverImage src={item.coverImage} />
      <div className="text-block">
        <span className="title">{item.title}</span>
        <span className="artist">{artist?.name || 'Unknown artist'}</span>
      </div>
    </li>
  );
}
