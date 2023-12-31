/**
 * Zeigt die Detailansicht einer Pflanze mit Informationen wie Name, Pflanzenname, Hinzugefügt am, Standort und Kategorie.
 * Bietet Optionen zum Bearbeiten und Zugriff auf zusätzliche Funktionen wie Notizen, Pflanzeninfo und Pflegeplan.
 *
 * @param {object} navigation - Das Navigation-Objekt für die Navigation zwischen Bildschirmen.
 * @param {object} route - Die Route-Parameter, die Informationen über die ausgewählte Pflanze (plantId) enthalten.
 */

import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Button, Card, IconButton, Text } from 'react-native-paper';
import Background from '../components/Background';
import Header from '../components/Header';
import { getDbInstance, getPlantById } from '../database/Database';

export default function ShowPlant({ navigation, route }) {
  // Bildschirmbreite für das Layout berechnen
  const screenWidth = Dimensions.get('window').width * 0.95;
  // Pflanzen-ID aus den Route-Parametern extrahieren
  const { plantId } = route.params;
  // Zustand für die geladene Pflanze initialisieren
  const [plant, setPlant] = useState([]);

  // useFocusEffect-Hook für die Navigation und Aktualisierung beim Fokus auf den Bildschirm
  useFocusEffect(
    useCallback(() => {
      // Verzögerung hinzufügen, um die Aktualisierung sicherzustellen
      setTimeout(function () {
        fetchData();
      }, 500);
    }, [navigation])
  );

  // Funktion zum Abrufen der Pflanzendaten aus der Datenbank
  const fetchData = async () => {
    try {
      // Zustand zurücksetzen
      setPlant([]);
      // Datenbankinstanz abrufen
      const db = await getDbInstance();
      // Pflanze anhand der ID aus der Datenbank abrufen
      const result = await getPlantById(db, plantId);
      console.log('Pflanze geladen:', result);
      // Geladene Pflanze im Zustand setzen
      setPlant(result);
    } catch (error) {
      console.error('Fehler beim Laden der Pflanze:', error);
    }
  };

  // Funktion zum Navigieren zur Bearbeitungsseite der Pflanze
  const onEditPress = () => {
    navigation.navigate('EditPlant', { plantId: plantId });
  };

  // Hauptrendermethode
  return (
    <Background>
      {/* Header-Komponente mit Titel und Navigationsfunktion */}
      <Header title="Pflanze" onPress={() => navigation.navigate('OverviewPlants')}></Header>
      <View style={{ flex: 1, width: screenWidth }}>
        {/* Abstandhalter für den Header */}
        <View style={{ height: 60 }} />
        {/* Card-Komponente für die Anzeige der Pflanzeninformationen */}
        <Card>
          <Card.Title
            title={plant.Name}
            right={(props) => <IconButton icon='application-edit-outline' onPress={onEditPress} />}
          />
          <Card.Content>
            {/* Textkomponenten für verschiedene Pflanzeninformationen */}
            <Text variant="bodyMedium">Pflanze: {plant.PflanzenName}</Text>
            <Text variant="bodyMedium">Hinzugefügt am: {plant.Erstellungsdatum}</Text>
            <Text variant="bodyMedium">Standort: {plant.Standort}</Text>
            <Text variant="bodyMedium">Kategorie: {plant.Kategorie}</Text>
          </Card.Content>
        </Card>
        {/* Button-Komponenten für zusätzliche Funktionen */}
        <Button style={styles.button} mode="contained" onPress={() => {}}>
          Notizen
        </Button>
        <Button style={styles.button} mode="contained" onPress={() => {}}>
          Pflanzen Info
        </Button>
        <Button style={styles.button} mode="contained" onPress={() => {}}>
          Pflegeplan
        </Button>
      </View>
    </Background>
  );
}

// Styles für den Button
const styles = StyleSheet.create({
  button: {
    padding: 10,
    marginTop: 20,
  },
});
