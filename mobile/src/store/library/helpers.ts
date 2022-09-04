import { MediaAsset } from '../../types/media';

export class AssetWatcher {
  constructor(private whitelist: string[], private blacklist: string[]) {}

  isWatched(asset: MediaAsset) {
    return this.hasWhitelist()
      ? this.isWhitelisted(asset) && !this.isBlacklisted(asset)
      : !this.isBlacklisted(asset) && this.isWhitelisted(asset);
  }

  private isWhitelisted(asset: MediaAsset) {
    if (!this.hasWhitelist()) return true;
    return this.whitelist.some(white => asset.uri.startsWith(white));
  }

  private isBlacklisted(asset: MediaAsset) {
    if (!this.hasBlacklist()) return false;
    return this.blacklist.some(black => asset.uri.startsWith(black));
  }

  private hasWhitelist() {
    return this.whitelist.length > 0;
  }
  private hasBlacklist() {
    return this.blacklist.length > 0;
  }
}
