/**
 * Header-Komponente für die Anwendung. Zeigt einen zentrierten Appbar an, der den Titel, einen Zurück-Pfeil und das Logo enthält.
 *
 * @param {object} props.title - Der Titel, der im Header angezeigt werden soll.
 * @param {function} props.onPress - Die Funktion, die beim Klicken auf den Zurück-Pfeil ausgeführt wird.
 */

import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import Logo from '../components/LogoHeader';

export default function Header({ title, onPress }) {
  const screenWidth = Dimensions.get('window').width;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Appbar.Header mode='center-aligned'
        style={{ width: screenWidth, height: "auto" }}
        theme={{ colors: { primary: 'white' } }}
      >
        <Appbar.Action icon='arrow-left-bold' onPress={onPress} />
        <Appbar.Content title={title} />
        <Logo />
      </Appbar.Header>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0
  }
});
