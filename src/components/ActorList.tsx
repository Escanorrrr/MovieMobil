import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ActorCard from './ActorCard';
import { FONT, SPACING } from '../styles/theme';

interface Actor {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

type Props = {
  actors: Actor[];
  imageBaseUrl: string;
};

export default function ActorList({ actors, imageBaseUrl }: Props) {
  if (!actors.length) return null;
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Oyuncular</Text>
      {actors.map((actor) => (
        <ActorCard
          key={actor.id}
          name={actor.name}
          character={actor.character}
          profilePath={actor.profile_path ? `${imageBaseUrl}${actor.profile_path}` : null}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: SPACING.lg },
  sectionTitle: {
    fontSize: FONT.size.lg,
    fontWeight: 'bold',
    marginBottom: SPACING.sm,
    fontFamily: FONT.family.bold,
  },
}); 