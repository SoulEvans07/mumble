import { ReactElement, useMemo } from 'react';
import './AlbumItem.scss';

import { Album } from '../../../types/model';
import { CoverImage } from '../CoverImage/CoverImage';
import { artists } from '../../../types/mockData';

interface AlbumItemProps {
  item: Album;
}

export function AlbumItem(props: AlbumItemProps): ReactElement {
  const { item } = props;

  const artist = useMemo(() => artists.find(a => a.id === item.artistId), [artists]);

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
