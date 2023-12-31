/**
 * Komponente für die Übersicht einer einzelnen Pflanze in Form einer Karte.
 * Enthält Informationen wie Name, Pflanzenname, Erstellungsdatum, Standort und Kategorie.
 * Ermöglicht das Navigieren zur Detailansicht und das Löschen der Pflanze.
 *
 * @param {string} id - Die eindeutige ID der Pflanze.
 * @param {string} name - Der Name der Pflanze.
 * @param {string} plantName - Der Pflanzenname.
 * @param {string} createDate - Das Erstellungsdatum der Pflanze.
 * @param {string} place - Der Standort der Pflanze.
 * @param {string} category - Die Kategorie der Pflanze.
 * @param {function} onDelete - Die Funktion zum Löschen der Pflanze.
 */

import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { Button, Card, IconButton, Text, TouchableRipple } from 'react-native-paper';

export default function OverviewPlantView({ id, name, plantName, createDate, place, category, onDelete }) {
    const navigation = useNavigation();
    const [isModalVisible, setIsModalVisible] = useState(false);

    // Handler-Funktion beim Drücken auf Löschen
    const onDeletePress = () => {
        setIsModalVisible(false);
        onDelete(id);
    };

    // Handler-Funktion beim Drücken auf die Karte
    const onSelect = () => {
        navigation.navigate('ShowPlant', { plantId: id });
    };

    return (
        <View>
            <TouchableRipple onPress={onSelect}>
                <Card>
                    <Card.Title
                        title={name}
                        right={(props) => <IconButton icon='delete' onPress={() => setIsModalVisible(true)} />}
                    />
                    <Card.Content>
                        <Text variant="bodyMedium">Pflanze: {plantName}</Text>
                        <Text variant="bodyMedium">Hinzugefügt am: {createDate}</Text>
                        <Text variant="bodyMedium">Standort: {place}</Text>
                        <Text variant="bodyMedium">Kategorie: {category}</Text>
                    </Card.Content>
                </Card>
            </TouchableRipple>
            {/* Modal für die Löschbestätigung */}
            <Modal visible={isModalVisible} transparent={true} animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text>Wollen Sie die Pflanze endgültig löschen?</Text>
                        <View style={{ height: 10 }} />
                        <Button mode='outlined' icon={'check'} onPress={() => onDeletePress()}>
                            Ja
                        </Button>
                        <View style={{ height: 10 }} />
                        <Button mode='outlined' icon={'close'} onPress={() => setIsModalVisible(false)}>
                            Nein
                        </Button>
                    </View>
                </View>
            </Modal>
            {/* Abstandhalter */}
            <View style={{ height: 10 }} />
        </View>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
});
