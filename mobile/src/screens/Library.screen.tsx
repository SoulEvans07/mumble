import { ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import { Text, View, StyleSheet, Button, Image, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as fs from 'expo-file-system';
import { EncodingType } from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import produce from 'immer';
import { decode, encode } from 'base-64';
import id3 from 'node-id3';

import { millisToMin } from '../utils/timeUtils';
import { Buffer } from '../types/Buffer';

const BUFFER_SIZE = 256 * 1024;

const ID3_TOKEN = 'ID3';
const TITLE_TOKEN = 'TIT2';
const ARTIST_TOKEN = 'TPE1';
const ALBUM_TOKEN = 'TALB';
const GENRE_TOKEN = 'TCON';
const PICTURE_TOKEN = 'APIC';

interface TrackMeta {
  title: string;
  artist?: string;
  album?: string;
  genre?: string;
  cover?: string;
  asset: MediaLibrary.Asset;
}

type TrackMap = Record<string, TrackMeta>;

export function LibraryScreen(): ReactElement {
  const { top } = useSafeAreaInsets();

  const [total, setTotal] = useState(0);
  const [tracks, setTracks] = useState<TrackMap>({});
  const [buffer, setBuffer] = useState<Buffer>();
  const [out, setOut] = useState('');

  const refresh = async () => {
    const { totalCount, assets } = await MediaLibrary.getAssetsAsync({
      mediaType: 'audio',
      first: 1,
    });

    // const data = await MediaLibrary.getAssetsAsync({
    //   mediaType: 'audio',
    //   first: totalCount,
    // });

    setTotal(totalCount);
    setTracks(
      assets.reduce((map: TrackMap, asset) => {
        return {
          ...map,
          [asset.id]: {
            title: asset.filename,
            asset,
          },
        };
      }, {})
    );
  };

  const readMeta = async () => {
    if (Object.values(tracks).length === 0) return;
    const track = Object.values(tracks)[0];
    const uri = track.asset.uri;

    const info = await fs.getInfoAsync(uri);
    const length = info.size;

    const data = await fs.readAsStringAsync(uri, {
      encoding: EncodingType.Base64,
      position: 0,
      length: BUFFER_SIZE,
    });

    // const bytes = Uint8Array.from(decode(data), c => c.charCodeAt(0));

    const tags = id3.read(data);
    setOut(JSON.stringify(tags));
    // setBuffer(new Buffer(bytes));

    // buffer.current.setData();
  };

  useEffect(() => {
    // refresh();
  }, [tracks]);

  return (
    <View style={{ marginTop: top }}>
      <Button title="Refresh" onPress={refresh} />
      <Button title="Update" onPress={readMeta} />
      <Text>Total: {total}</Text>
      <ScrollView>
        <Text>Out: {out}</Text>
        {/* {Object.values(tracks).map(item => (
          <View key={item.asset.id}>
            {item.cover && <Image source={{ uri: item.cover }} />}
            <Text>{item.title}</Text>
            {item.artist && <Text>{item.artist}</Text>}
            {item.album && <Text>{item.album}</Text>}
            <Text>{millisToMin(item.asset.duration * 1000)}</Text>
          </View>
        ))} */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
