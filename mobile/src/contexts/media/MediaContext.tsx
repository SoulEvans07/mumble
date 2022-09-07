import { createContext, PropsWithChildren, ReactElement, useContext, useState } from 'react';

import { initLoadable, Loadable, LoadableStatus } from '../../utils/loadableData';
import { MediaService } from '../../services/media';
import { MediaAsset } from '../../types/media';

interface MediaContext extends Loadable<MediaAsset[]> {
  fetch: () => Promise<MediaAsset[]>;
}

const Media = createContext<MediaContext | undefined>(undefined);

export const MediaConsumer = Media.Consumer;

export function useMedia() {
  const context = useContext(Media);
  if (!context) throw new Error('useMedia must be used within an MediaProvider');
  return context;
}

export type MediaState = Omit<MediaContext, 'fetch'>;

export const initialState: MediaState = initLoadable([]);

export function MediaProvider(props: PropsWithChildren<{}>): ReactElement {
  const [status, setStatus] = useState(initialState.status);
  const [assets, setAssets] = useState(initialState.data);
  const [error, setError] = useState(initialState.error);

  const fetch = async () => {
    try {
      setStatus('loading');

      const assets = await MediaService.fetchLibrary();
      setAssets(assets);

      setStatus('succeeded');
      return assets;
    } catch (error) {
      setStatus('failed');
      setError((error as Error).message);
      throw error;
    }
  };

  return <Media.Provider value={{ data: assets, status, error: error, fetch }} {...props} />;
}
