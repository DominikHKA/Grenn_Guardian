/**
 * Bildet die Maske zum Hinzufügen einer neuen Pflanze ab.
 * Enthält Eingabefelder für Name, Pflanze, Standort und Kategorie.
 * Führt eine Validierung der Eingabefelder durch und fügt die Pflanze der Datenbank hinzu.
 *
 * @param {object} navigation - Das Navigation-Objekt für die Navigation zwischen Bildschirmen.
 */

import React, { useState } from 'react';
import { Dimensions, View } from 'react-native';
import { Button } from 'react-native-paper';
import Background from '../components/Background';
import Header from '../components/Header';
import TextInput from '../components/TextInput';
import { getDbInstance, insertPlant } from '../database/Database';
import { wortValidator } from '../validator/wortValidator';

export default function AddPlant({ navigation }) {
    // Bildschirmbreite für das Layout berechnen
    const screenWidth = Dimensions.get('window').width * 0.95;

    // Zustände für die Eingabefelder und deren Fehler initialisieren
    const [name, setName] = useState({ value: '', error: '' });
    const [plantName, setPlantName] = useState({ value: '', error: '' });
    const [place, setPlace] = useState({ value: '', error: '' });
    const [category, setCategory] = useState({ value: '', error: '' });

    // Funktion zum Hinzufügen einer Pflanze
    const onCreate = async () => {
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
            // Pflanze in die Datenbank einfügen
            const result = await insertPlant(db, name.value, plantName.value, place.value, category.value);
            // Zur Übersicht der Pflanzen navigieren
            navigation.navigate('OverviewPlants');
        } catch (error) {
            // Fehlerbehandlung, falls ein Fehler auftritt
            console.error('Fehler beim Hinzufügen der Pflanze:', error);
        }
    };

    return (
        <Background>
            {/* Header-Komponente mit Titel und Navigationsfunktion */}
            <Header title="Pflanze hinzufügen" onPress={() => navigation.navigate('OverviewPlants')} />
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
                {/* Button zum Hinzufügen einer Pflanze */}
                <Button mode="contained" onPress={onCreate}>
                    Pflanze hinzufügen
                </Button>
            </View>
        </Background>
    );
}
