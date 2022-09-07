import * as MediaLibrary from 'expo-media-library';
import { PermissionStatus } from 'expo-media-library';
import { Alert, BackHandler } from 'react-native';

export class MediaService {
  public static async fetchLibrary() {
    this.getPermission();
    const { totalCount } = await MediaLibrary.getAssetsAsync({ mediaType: 'audio', first: 1 });
    const { assets } = await MediaLibrary.getAssetsAsync({ mediaType: 'audio', first: totalCount });
    return assets;
  }

  public static async getPermission() {
    const permission = await MediaLibrary.getPermissionsAsync();
    if (permission.granted) return;
    if (permission.canAskAgain) return await this.requestPermission();
    throw new Error("Couldn't get Media permission.");
  }

  private static async requestPermission() {
    const { status, canAskAgain } = await MediaLibrary.requestPermissionsAsync();
    if (status === PermissionStatus.GRANTED) return;
    if (status === PermissionStatus.DENIED && canAskAgain) return this.permissionAlert();
    throw new Error("Couldn't get Media permission.");
  }

  private static permissionAlert() {
    Alert.alert('Permission Required!', 'This app needs to read audio files', [
      { text: 'Try again', onPress: () => this.getPermission() },
      { text: 'Close App', onPress: () => BackHandler.exitApp() },
    ]);
  }
}
