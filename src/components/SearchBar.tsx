import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '../styles/colors';
import { FONT, SPACING } from '../styles/theme';

type Props = {
  onSearch: (query: string) => void;
  onClose: () => void;
  loading?: boolean;
};

export default function SearchBar({ onSearch, onClose, loading }: Props) {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    if (searchText.trim()) {
      onSearch(searchText.trim());
    }
  };

  return (
    <View style={styles.searchArea}>
      <TextInput
        style={styles.searchInput}
        placeholder="Film adı girin..."
        value={searchText}
        onChangeText={setSearchText}
        onSubmitEditing={handleSearch}
        editable={!loading}
        returnKeyType="search"
      />
      <TouchableOpacity style={styles.searchActionButton} onPress={handleSearch} disabled={loading}>
        <Text style={styles.searchActionButtonText}>{loading ? 'Aranıyor...' : 'Ara'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.closeSearchButton} onPress={onClose}>
        <Text style={styles.closeSearchButtonText}>X</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  searchArea: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  searchInput: {
    flex: 1,
    backgroundColor: COLORS.cardBackground,
    borderColor: COLORS.cardBorder,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    fontSize: FONT.size.md,
    marginRight: SPACING.sm,
  },
  searchActionButton: {
    backgroundColor: COLORS.primaryDark,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: SPACING.sm,
  },
  searchActionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: FONT.size.md,
  },
  closeSearchButton: {
    backgroundColor: COLORS.error,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeSearchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: FONT.size.md,
  },
}); 