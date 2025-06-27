import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MovieListScreen from './src/screens/MovieListScreen';
import MovieDetailScreen from './src/screens/MovieDetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="MovieList" component={MovieListScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MovieDetail" component={MovieDetailScreen} options={{ title: 'Film Detayı' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
