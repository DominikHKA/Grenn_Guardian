/**
 * Bildet die Übersicht aller Pflanzen, die es ermöglicht zu sortieren, zu löschen und zur Detailansicht
 * einer Pflanze zu gelangen.
 *
 * @param {object} navigation - Das Navigation-Objekt für die Navigation zwischen Bildschirmen.
 */

import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import { Button, IconButton, List, Portal, Modal as RNModal } from 'react-native-paper';
import Background from '../components/Background';
import Header from '../components/Header';
import OverviewPlantView from '../components/OverviewPlantView';
import { deletePlantById, getAllPlants, getDbInstance } from '../database/Database';

export default function OverviewPlants({ navigation }) {
  // Bildschirmbreite für das Layout berechnen
  const screenWidth = Dimensions.get('window').width * 0.95;

  // States für die Komponente
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [plants, setPlants] = useState([]);
  const [isSortModalVisible, setIsSortModalVisible] = useState(false);
  const [selectedSortOption, setSelectedSortOption] = useState('name');
  const [db, setDb] = useState();

  // Daten von der Datenbank abrufen und aktualisieren
  const fetchData = async () => {
    try {
      setPlants([]);
      const db = await getDbInstance();
      setDb(db);
      const result = await getAllPlants(db);
      console.log('Pflanzen geladen:', result);
      setPlants(result);
      sortPlants(result, selectedSortOption);
    } catch (error) {
      console.log('Fehler beim Laden aller Pflanzen:', error);
    }
  }

  // useFocusEffect-Hook für die Navigation und Aktualisierung
  useFocusEffect(
    useCallback(() => {
      // Verzögerung hinzufügen, um die Aktualisierung sicherzustellen
      setTimeout(function () {
        fetchData();
      }, 500);
    }, [navigation, selectedSortOption])
  );

  // Pflanze löschen
  const handleDelete = async (id) => {
    await deletePlantById(db, id);
    handleRefresh();
  };

  // Liste aktualisieren
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchData();
    setIsRefreshing(false);
  };

  // Sortiermodal öffnen
  const openSortModal = () => {
    setIsSortModalVisible(true);
  };

  // Sortiermodal schließen
  const closeSortModal = () => {
    setIsSortModalVisible(false);
  };

  // Sortieroption auswählen und Modal schließen
  const handleSortOptionSelect = (option) => {
    setSelectedSortOption(option);
    closeSortModal();
  };

  // Pflanzen sortieren
  const sortPlants = (data, option) => {
    let sortedData = [...data];
    switch (option) {
      case 'name':
        sortedData.sort((a, b) => a.Name.localeCompare(b.Name));
        break;
      case 'plant':
        sortedData.sort((a, b) => a.PflanzenName.localeCompare(b.PflanzenName));
        break;
      case 'createdAt':
        sortedData.sort((a, b) => new Date(b.Erstellungsdatum) - new Date(a.Erstellungsdatum));
        break;
      default:
        break;
    }
    setPlants(sortedData);
  };

  // Sortiermodal rendern
  const renderSortModal = () => (
    <RNModal visible={isSortModalVisible} onDismiss={closeSortModal} contentContainerStyle={styles.modalContent}>
      <List.Item
        title="Nach Name sortieren"
        onPress={() => handleSortOptionSelect('name')}
        right={() => <List.Icon icon={selectedSortOption === 'name' ? 'check' : 'cancel'} />}
      />
      <List.Item
        title="Nach Pflanze sortieren"
        onPress={() => handleSortOptionSelect('plant')}
        right={() => <List.Icon icon={selectedSortOption === 'plant' ? 'check' : 'cancel'} />}
      />
      <List.Item
        title="Nach Hinzugefügt am sortieren"
        onPress={() => handleSortOptionSelect('createdAt')}
        right={() => <List.Icon icon={selectedSortOption === 'createdAt' ? 'check' : 'cancel'} />}
      />
    </RNModal>
  );

  // Liste rendern
  const renderItem = ({ item }) => (
    <OverviewPlantView
      id={item.PflanzenID}
      name={item.Name}
      plantName={item.PflanzenName}
      createDate={item.Erstellungsdatum}
      place={item.Standort}
      category={item.Kategorie}
      onDelete={() => {
        handleDelete(item.PflanzenID)
      }}
      navigation={navigation}
    />
  );

  // Hauptrendermethode
  return (
    <Background>
      <Header title="Pflanzen"></Header>
      <View style={{ flex: 1, width: screenWidth }}>
        {/* Abstandhalter für den Header */}
        <View style={{ height: 60 }} />

        {/* Filter-Icon für Sortierung */}
        <View style={{ height: 50, alignSelf: 'flex-end' }}>
          <IconButton
            icon='filter-variant'
            size={30}
            onPress={openSortModal}
          />
        </View>

        {/* Liste der Pflanzen */}
        <View>
          <FlatList
            data={plants}
            keyExtractor={(item) => item.PflanzenID}
            renderItem={renderItem}
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
          />
          {/* Button zum Hinzufügen einer Pflanze */}
          <Button icon='plus' mode='contained' onPress={() => navigation.navigate('AddPlant')}>Hinzufügen</Button>
        </View>
      </View>
      {/* Platzhalter am unteren Rand für das Modal */}
      <View style={{ height: 155 }} />
      {/* Sortiermodal über Portal rendern */}
      <Portal>{renderSortModal()}</Portal>
    </Background>
  )
}

// Styles für das Sortiermodal
const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
  },
});
