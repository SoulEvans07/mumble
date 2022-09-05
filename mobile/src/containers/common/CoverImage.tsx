import { ReactElement, useMemo } from 'react';
import { Image, View, StyleSheet, ViewStyle, ImageStyle } from 'react-native';

import { NumberProp } from '../../types/props';
import { useAppSelector } from '../../store/hooks';
import { selectAlbums } from '../../store/library/selectors';
import { Icon } from '../../components/ui/Icon/Icon';
import { Intersect } from '../../types/helpers';

interface CoverImageBaseProps {
  size?: NumberProp;
  hue?: NumberProp;
  style?: Intersect<ViewStyle, ImageStyle>;
}

interface CoverImageBySourceProps extends CoverImageBaseProps {
  src: string;
}

interface CoverImageByAlbumProps extends CoverImageBaseProps {
  albumId: string | undefined;
}

type CoverImageProps = CoverImageBySourceProps | CoverImageByAlbumProps;

export function CoverImage(props: CoverImageProps): ReactElement {
  const { hue, style } = props;
  const size = Number(props.size || 32);
  const { data: albums } = useAppSelector(selectAlbums);

  const image = useMemo(() => {
    if ('src' in props) return props.src;
    if ('albumId' in props && props.albumId && albums[props.albumId]) return albums[props.albumId].coverImage;
    return undefined;
  }, [props, albums]);

  const imageStyle: ImageStyle = {
    width: size,
    height: size,
  };

  return image ? (
    <Image source={{ uri: image }} style={[styles.image, imageStyle, style]} />
  ) : (
    <FallbackCoverImage size={size} hue={hue} style={style} />
  );
}

function FallbackCoverImage(props: CoverImageBaseProps) {
  const { hue, style } = props;

  const size = Number(props.size);
  const bgStyle: ViewStyle = {
    backgroundColor: hue !== undefined ? `hsl(${hue}, 40%, 40%)` : 'hsl(0, 0%, 20%)',
    width: size,
    height: size,
  };

  return (
    <View style={[styles.fallbackContainer, bgStyle, style]}>
      <Icon name="music-note" size={size * 0.33} fill="#ffffff80" />
    </View>
  );
}

const borderRadius = 5;
const styles = StyleSheet.create({
  image: {
    borderRadius,
  },
  fallbackContainer: {
    borderRadius,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
