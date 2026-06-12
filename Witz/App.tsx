import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MetasProvider } from './src/pages/goals/MetasContext';
import Routes from './src/routes';

export default function App() {
  return (
    <SafeAreaProvider>
      <MetasProvider>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </MetasProvider>
    </SafeAreaProvider>
  );
}