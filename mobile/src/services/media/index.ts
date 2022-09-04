import * as MediaLibrary from 'expo-media-library';

export class MediaService {
  public static async fetchLibrary() {
    const { totalCount } = await MediaLibrary.getAssetsAsync({ mediaType: 'audio', first: 1 });
    const { assets } = await MediaLibrary.getAssetsAsync({ mediaType: 'audio', first: totalCount });
    return assets;
  }
}
