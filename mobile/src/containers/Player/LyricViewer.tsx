import { ReactElement } from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';

interface LyricViewerProps {}

export function LyricViewer(props: LyricViewerProps): ReactElement {
  const {} = props;
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.text}>You make me feel like a child, it's true</Text>
      <Text style={styles.text}>You make it seem like it is something brand new</Text>
      <Text style={[styles.text, styles.currentText]}>I've never met as agile as you</Text>
      <Text style={styles.text}>You have a way with doing the things you do, yeah</Text>
      <Text style={styles.text}>You have a way with doing the things you do, yeah</Text>
      <Text style={styles.text}>You have a way with doing the things you do, yeah</Text>
      <Text style={styles.text}>You have a way with doing the things you do, yeah</Text>
      <Text style={styles.text}>You have a way with doing the things you do, yeah</Text>
      <Text style={styles.text}>You have a way with doing the things you do, yeah</Text>
      <Text style={styles.text}>You have a way with doing the things you do, yeah</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {},
  text: {
    opacity: 0.2,
    color: 'white',
    fontWeight: '800',
    fontSize: 30,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  currentText: {
    opacity: 1,
  },
});
