import { PropsWithChildren } from 'react';
import { View, Text, StyleSheet, Pressable, Modal, ViewStyle, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '../../hooks/useTheme';

interface FullScreenModalProps {
  title?: string;
  open?: boolean;
  onClose: VoidFunction;
  headerStyle?: ViewStyle;
}

export function FullScreenModal(props: PropsWithChildren<FullScreenModalProps>) {
  const { title, open, onClose, headerStyle, children } = props;

  const [color, backgroundColor] = useTheme(['black', 'white'], ['white', 'black']);

  const header = (
    <View style={[styles.header, headerStyle]}>
      {title && <Text style={[styles.title, { color }]}>{title}</Text>}
      <Pressable onPress={onClose} style={styles.closeBtn}>
        <Ionicons name="close" size={32} color={color} />
      </Pressable>
    </View>
  );

  return (
    <Modal visible={open} transparent={true} animationType="slide">
      <SafeAreaView style={[styles.container, { backgroundColor }]}>
        {header}
        {children}
      </SafeAreaView>
    </Modal>
  );
}

const paddingHorizontal = 20;
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    height: 60,
    marginTop: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '500',
    opacity: 0.5,
    paddingHorizontal,
  },
  closeBtn: {
    marginLeft: 'auto',
    paddingHorizontal,
  },
});
