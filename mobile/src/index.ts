import { registerRootComponent } from 'expo';
import TrackPlayer from 'react-native-track-player';

import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);

// Registering playback service
// https://react-native-track-player.js.org/docs/basics/getting-started
TrackPlayer.registerPlaybackService(() => require('./services/player/index'));
