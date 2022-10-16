import { MediaService } from '../../services/media';
import { Exception } from '../../types/error';
import { Track } from '../../types/model';
import { createThunk } from '../helpers';
import { AssetWatcher } from './helpers';
import { librarySlice } from './index';

const fetchTracks = createThunk(async (_: void, { getState, dispatch }) => {
  try {
    dispatch(libraryActions.setListPending('Tracks'));

    const { includedFolders, excludedFolders } = getState().library;
    const assetWatcher = new AssetWatcher(includedFolders, excludedFolders);

    const assets = await MediaService.fetchLibrary();
    const data = assets.reduce((map: Record<string, Track>, asset) => {
      if (!assetWatcher.isWatched(asset)) return map;
      return {
        ...map,
        [asset.id]: Track.from(asset),
      };
    }, {});

    dispatch(libraryActions.setTracksList({ data }));
  } catch (e) {
    const error = Exception.from(e);
    dispatch(libraryActions.setListFailed({ tab: 'Tracks', error: error.message }));
  }
});

export const libraryActions = {
  ...librarySlice.actions,
  fetchTracks,
};
