/**
 * Logo-Komponente für den Header. Zeigt das Anwendungslogo in Form einer Bildressource an.
 */

import React from 'react';
import { Image, StyleSheet } from 'react-native';

export default function LogoHeader() {
  return <Image source={require('../assets/green_guardian_logo.png')} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
  },
});
