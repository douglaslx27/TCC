import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import Routes from './src/routes';
import imagem from './assets/splash.png';

import {
  useFonts,
  RobotoSlab_400Regular,
  RobotoSlab_600SemiBold,
  RobotoSlab_500Medium
} from '@expo-google-fonts/roboto-slab';

export default function App() {

  const [fontsLoaded] = useFonts({
    RobotoSlab_400Regular,
    RobotoSlab_600SemiBold,
    RobotoSlab_500Medium
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={imagem}
          style={styles.imagem}
        />

      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Routes />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imagem: {
    width: 380,
    height: 600
  }
});
