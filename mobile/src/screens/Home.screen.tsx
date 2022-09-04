import { ReactElement } from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface HomeScreenProps {}

export function HomeScreen(props: HomeScreenProps): ReactElement {
  const {} = props;
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
