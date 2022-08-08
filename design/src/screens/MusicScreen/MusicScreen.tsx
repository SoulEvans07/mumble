import { ReactElement, useMemo, useState } from 'react';
import classNames from 'classnames';
import './MusicScreen.scss';

import { Page } from '../../components/layout/Page/Page';
import { albums, artists, playlists, tracks } from '../../types/mockData';
import { isAlbum, isArtist, isPlaylist, isTrack } from '../../types/model';
import { TrackItem } from '../../components/common/TrackItem/TrackItem';
import { AlbumItem } from '../../components/common/AlbumItem/AlbumItem';
import { ArtistItem } from '../../components/common/ArtistItem/ArtistItem';
import { PlaylistItem } from '../../components/common/PlaylistItem/PlaylistItem';

export function MusicScreen(): ReactElement {
  const [activeTab, setActiveTab] = useState<TopTabTitle>(tabs[0].title);
  const onSelectTab = (tab: TopTabTitle) => () => setActiveTab(tab);

  const activeList = useMemo(() => {
    return tabs.find(tab => tab.title === activeTab);
  }, [activeTab]);

  return (
    <Page className="music-screen">
      <header>
        <h1>Music</h1>
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

type TopTabTitle = typeof tabs[number]['title'];

function renderItem(item: typeof tabs[number]['items'][number]) {
  if (isArtist(item)) return <ArtistItem key={item.id} item={item} />;
  if (isAlbum(item)) return <AlbumItem key={item.id} item={item} />;
  if (isTrack(item)) return <TrackItem key={item.id} item={item} />;
  if (isPlaylist(item)) return <PlaylistItem key={item.id} item={item} />;
  return null;
}
