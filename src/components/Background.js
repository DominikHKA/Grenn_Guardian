/**
 * Hintergrundkomponente für die Anwendung. Verwendet ein wiederholendes Bild als Hintergrund und ermöglicht das Vermeiden
 * der Tastatur durch `KeyboardAvoidingView`.
 *
 * @param {object} props.children - Die untergeordneten Komponenten, die innerhalb des Hintergrunds gerendert werden sollen.
 */

import React from 'react';
import { ImageBackground, KeyboardAvoidingView, StyleSheet } from 'react-native';

export default function Background({ children }) {
  return (
    <ImageBackground
      source={require('../assets/background_dot.png')}
      resizeMode="repeat"
      style={styles.background}
    >
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        {children}
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: '#f8f4ec',
  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
