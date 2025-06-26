import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { COLORS } from '../styles/colors';
import { FONT, SPACING, RADIUS } from '../styles/theme';

interface Props {
  name: string;
  character: string;
  profilePath: string | null;
}

export default function ActorCard({ name, character, profilePath }: Props) {
  return (
    <View style={styles.actorItem}>
      <Image
        source={{
          uri: profilePath
            ? profilePath
            : 'https://via.placeholder.com/50x50?text=?',
        }}
        style={styles.actorImage}
      />
      <View style={styles.actorInfo}>
        <Text style={styles.actorName}>{name}</Text>
        <Text style={styles.actorCharacter}>{character}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  actorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
    backgroundColor: COLORS.cardBackground,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    shadowColor: COLORS.textDark,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderColor: COLORS.cardBorder,
    borderWidth: 1,
  },
  actorImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: SPACING.md,
  },
  actorInfo: {
    flex: 1,
  },
  actorName: {
    fontSize: FONT.size.md,
    fontWeight: 'bold',
    color: COLORS.textDark,
    fontFamily: FONT.family.bold,
  },
  actorCharacter: {
    fontSize: FONT.size.sm,
    color: COLORS.textLight,
    fontStyle: 'italic',
    fontFamily: FONT.family.regular,
  },
}); 