import { ReactElement, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Slider } from '@sharcoux/slider';
import { SliderProps } from '@sharcoux/slider/dist/Slider';

type SeekSliderProps = SliderProps;

export function SeekSlider(props: SeekSliderProps): ReactElement {
  const { style, onSlidingStart, onSlidingComplete, ...restProps } = props;

  const [drag, setDrag] = useState(false);
  const onDragStart = (value: number) => {
    setDrag(true);
    if (onSlidingStart) onSlidingStart(value);
  };
  const onDragEnd = (value: number) => {
    setDrag(false);
    if (onSlidingComplete) onSlidingComplete(value);
  };

  return (
    <Slider
      style={[styles.slider, style]}
      onSlidingStart={onDragStart}
      onSlidingComplete={onDragEnd}
      trackHeight={4}
      thumbSize={16}
      thumbTintColor="white"
      minimumTrackTintColor="white"
      maximumTrackTintColor="#ffffff40"
      slideOnTap
      {...restProps}
    />
  );
}

const styles = StyleSheet.create({
  slider: {},
});
