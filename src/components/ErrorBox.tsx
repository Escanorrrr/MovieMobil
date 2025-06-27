import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../styles/colors';
import { SPACING } from '../styles/theme';

type Props = {
  message: string;
  onClose: () => void;
};

export default function ErrorBox({ message, onClose }: Props) {
  return (
    <View style={styles.errorBox}>
      <Text style={styles.errorText}>{message}</Text>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>X</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  errorBox: {
    backgroundColor: COLORS.error,
    padding: SPACING.md,
    borderRadius: 8,
    marginBottom: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  errorText: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
  },
  closeButton: {
    marginLeft: SPACING.md,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
}); 