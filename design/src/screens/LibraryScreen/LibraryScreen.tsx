import { ReactElement, useMemo } from 'react';
import classNames from 'classnames';
import './LibraryScreen.scss';

import { Page } from '../../components/layout/Page/Page';
import { albums, artists, playlists, tracks } from '../../types/mockData';
import { isAlbum, isArtist, isPlaylist, isTrack } from '../../types/model';
import { TrackItem } from '../../containers/common/TrackItem/TrackItem';
import { AlbumItem } from '../../containers/common/AlbumItem/AlbumItem';
import { ArtistItem } from '../../containers/common/ArtistItem/ArtistItem';
import { PlaylistItem } from '../../containers/common/PlaylistItem/PlaylistItem';
import { useDispatch, useSelector } from '../../contexts/store/StoreContext';
import { getActiveLibraryTab, getLibraryTabs } from '../../contexts/store/selectors';
import { setActiveLibraryTab } from '../../contexts/store/actions';
import { LibraryTab } from '../../contexts/store/types';

export function LibraryScreen(): ReactElement {
  const dispatch = useDispatch();
  const tabs = useSelector(getLibraryTabs);
  const activeTab = useSelector(getActiveLibraryTab);

  const onSelectTab = (tab: LibraryTab) => () => dispatch(setActiveLibraryTab(tab));

  const activeList = useMemo(() => {
    return tabs.find(tab => tab.title === activeTab);
  }, [activeTab]);

  return (
    <Page className="library-screen">
      <header>
        <h1>Library</h1>
      </header>
      <nav className="top-tab">
        {tabs.map(tab => (
          <div
            key={tab.title}
            className={classNames('top-tab-item', { active: activeTab === tab.title })}
            onClick={onSelectTab(tab.title)}
          >
            {tab.title}
          </div>
        ))}
      </nav>
      <section className="list-section">
        <ol className="item-list">{activeList?.items.map(item => renderItem(item))}</ol>
      </section>
    </Page>
  );
}

const tabs = [
  { title: 'Tracks', items: tracks },
  { title: 'Artists', items: artists },
  { title: 'Albums', items: albums },
  { title: 'Playlists', items: playlists },
] as const;

function renderItem(item: typeof tabs[number]['items'][number]) {
  if (isArtist(item)) return <ArtistItem key={item.id} item={item} />;
  if (isAlbum(item)) return <AlbumItem key={item.id} item={item} />;
  if (isTrack(item)) return <TrackItem key={item.id} item={item} />;
  if (isPlaylist(item)) return <PlaylistItem key={item.id} item={item} />;
  return null;
}
