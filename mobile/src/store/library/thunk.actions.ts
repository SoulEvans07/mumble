import { createAppAsyncThunk } from '../helpers';
import { MediaService } from '../../services/media';

export const fetchTracks = createAppAsyncThunk('library/fetchTracks', async () => await MediaService.fetchLibrary());
