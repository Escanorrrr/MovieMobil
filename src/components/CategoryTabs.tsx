import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '../styles/colors';
import { FONT, SPACING } from '../styles/theme';
import { MovieCategory } from '../services/movieService';

const CATEGORIES: { key: MovieCategory; label: string }[] = [
  { key: 'popular', label: 'Popüler' },
  { key: 'now_playing', label: 'Vizyonda' },
  { key: 'top_rated', label: 'En Çok Oy' },
  { key: 'upcoming', label: 'Yakında' },
];

type Props = {
  selected: MovieCategory;
  onSelect: (category: MovieCategory) => void;
};

export default function CategoryTabs({ selected, onSelect }: Props) {
  return (
    <View style={styles.container}>
      {CATEGORIES.map((cat) => (
        <TouchableOpacity
          key={cat.key}
          style={[styles.tab, selected === cat.key && styles.tabSelected]}
          onPress={() => onSelect(cat.key)}
        >
          <Text style={[styles.tabText, selected === cat.key && styles.tabTextSelected]}>{cat.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
    backgroundColor: COLORS.background,
    borderRadius: 8,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: SPACING.sm,
    marginHorizontal: 2,
    borderRadius: 8,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
    minWidth: 70,
    paddingHorizontal: 2,
  },
  tabSelected: {
    backgroundColor: COLORS.primary,
  },
  tabText: {
    color: COLORS.textLight,
    fontWeight: 'bold',
    fontSize: FONT.size.sm,
  },
  tabTextSelected: {
    color: '#fff',
  },
}); 