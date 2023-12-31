/**
 * Bildet die Maske zum Bearbeiten einer vorhandenen Pflanze ab.
 * Enthält Eingabefelder für Name, Pflanze, Standort und Kategorie,
 * die mit den vorhandenen Daten der Pflanze vorbefüllt sind.
 * Führt eine Validierung der Eingabefelder durch und aktualisiert
 * die Pflanze in der Datenbank bei erfolgreichem Bearbeiten.
 *
 * @param {object} navigation - Das Navigation-Objekt für die Navigation zwischen Bildschirmen.
 * @param {object} route - Die React Navigation Route.
 */

import React, { useEffect, useState } from 'react';
import { Dimensions, View } from 'react-native';
import { Button } from 'react-native-paper';
import Background from '../components/Background';
import Header from '../components/Header';
import TextInput from '../components/TextInput';
import { getDbInstance, getPlantById, updatePlantById } from '../database/Database';
import { wortValidator } from '../validator/wortValidator';

export default function EditPlant({ navigation, route }) {
    // Bildschirmbreite für das Layout berechnen
    const screenWidth = Dimensions.get('window').width * 0.95;

    // Pflanzen-ID aus der Navigationsroute erhalten
    const { plantId } = route.params;

    // Zustände für die Eingabefelder und deren Fehler initialisieren
    const [plant, setPlant] = useState([]);
    const [name, setName] = useState({ value: '', error: '' });
    const [plantName, setPlantName] = useState({ value: '', error: '' });
    const [place, setPlace] = useState({ value: '', error: '' });
    const [category, setCategory] = useState({ value: '', error: '' });

    // Effekt-Hook zum Laden der Pflanzendaten beim Rendern der Komponente
    useEffect(() => {
        fetchData();
    }, []);

    // Funktion zum Laden der Pflanzendaten aus der Datenbank
    const fetchData = async () => {
        try {
            setPlant([]);
            const db = await getDbInstance();
            const result = await getPlantById(db, plantId);

            // Eingabefelder mit vorhandenen Pflanzendaten vorbefüllen
            setName({ value: result.Name });
            setPlantName({ value: result.PflanzenName });
            setPlace({ value: result.Standort });
            setCategory({ value: result.Kategorie });
            setPlant(result);
            console.log('Pflanze zum Bearbeiten geladen:', result);
        } catch (error) {
            console.error('Fehler beim Laden der Pflanze:', error);
        }
    }

    // Funktion zum Bearbeiten der Pflanze
    const onEditPress = async () => {
        // Validierung der Eingabefelder
        const nameError = wortValidator(name.value, 'Name');
        const plantNameError = wortValidator(plantName.value, 'Pflanze');
        const placeError = wortValidator(place.value, 'Standort');
        const categoryError = wortValidator(category.value, 'Kategorie');

        // Fehler setzen und Funktion abbrechen, falls Validierung fehlschlägt
        if (nameError || plantNameError || placeError || categoryError) {
            setName({ ...name, error: nameError });
            setPlantName({ ...plantName, error: plantNameError });
            setPlace({ ...place, error: placeError });
            setCategory({ ...category, error: categoryError });
            return;
        }

        try {
            // Datenbankinstanz abrufen
            const db = await getDbInstance();
            // Pflanze in der Datenbank aktualisieren
            const result = await updatePlantById(db, plantId, name.value, plantName.value, place.value, category.value);
            console.log('Pflanze erfolgreich aktualisiert.');
            // Zur Detailansicht der aktualisierten Pflanze navigieren
            navigation.navigate('ShowPlant', plantId);
        } catch (error) {
            // Fehlerbehandlung, falls ein Fehler auftritt
            console.error('Fehler beim Aktualisieren der Pflanze:', error);
        }
    }

    // UI-Komponente rendern
    return (
        <Background>
            {/* Header-Komponente mit Titel und Navigationsfunktion */}
            <Header title="Pflanze ändern" onPress={() => navigation.navigate('OverviewPlants')} />
            <View style={{ flex: 1, width: screenWidth }}>
                {/* Abstandhalter für den Header */}
                <View style={{ height: 60 }} />
                {/* Eingabefelder für Name, Pflanze, Standort und Kategorie */}
                <TextInput
                    label="Name"
                    returnKeyType="next"
                    autoCapitalize="none"
                    onChangeText={(text) => setName({ value: text })}
                    error={!!name.error}
                    errorText={name.error}
                    value={name.value}
                    autoCompleteType="off"
                    textContentType="none"
                    keyboardType="default"
                />
                <TextInput
                    label="Pflanze"
                    returnKeyType="next"
                    autoCapitalize="none"
                    onChangeText={(text) => setPlantName({ value: text })}
                    error={!!plantName.error}
                    errorText={plantName.error}
                    value={plantName.value}
                    autoCompleteType="off"
                    textContentType="none"
                    keyboardType="default"
                />
                <TextInput
                    label="Standort"
                    returnKeyType="next"
                    autoCapitalize="none"
                    onChangeText={(text) => setPlace({ value: text })}
                    error={!!place.error}
                    errorText={place.error}
                    value={place.value}
                    autoCompleteType="off"
                    textContentType="none"
                    keyboardType="default"
                />
                <TextInput
                    label="Kategorie"
                    returnKeyType="next"
                    autoCapitalize="none"
                    onChangeText={(text) => setCategory({ value: text })}
                    error={!!category.error}
                    errorText={category.error}
                    value={category.value}
                    autoCompleteType="off"
                    textContentType="none"
                    keyboardType="default"
                />
                {/* Button zum Aktualisieren der Pflanze */}
                <Button mode="contained" onPress={onEditPress}>
                    Pflanze ändern
                </Button>
            </View>
        </Background>
    );
}
