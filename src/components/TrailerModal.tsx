import React from 'react';
import { Modal, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { COLORS } from '../styles/colors';
import { FONT, SPACING } from '../styles/theme';

type Props = {
  visible: boolean;
  onClose: () => void;
  trailerKey: string;
};

export default function TrailerModal({ visible, onClose, trailerKey }: Props) {
  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={{ flex: 1, backgroundColor: '#000' }}>
        <TouchableOpacity style={styles.closeModalButton} onPress={onClose}>
          <Text style={styles.closeModalButtonText}>Kapat</Text>
        </TouchableOpacity>
        <WebView
          style={{ flex: 1 }}
          source={{ uri: `https://www.youtube.com/embed/${trailerKey}` }}
          allowsFullscreenVideo
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  closeModalButton: {
    backgroundColor: COLORS.error,
    padding: SPACING.md,
    alignItems: 'center',
  },
  closeModalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: FONT.size.md,
  },
}); 