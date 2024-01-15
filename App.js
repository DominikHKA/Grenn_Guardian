/**
 * Die Hauptkomponente der Anwendung, die die Navigation und Initialisierung der Datenbank verwaltet.
 */

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { Provider } from "react-native-paper";
import "setimmediate";
import {
  clearTable,
  deletePlantsTable,
  getDbInstance,
  initializeDatabase,
  insertDummyData,
} from "./src/database/Database";
import { AddPlant, EditPlant, OverviewPlants, ShowPlant } from "./src/screens";
import { theme } from "./src/theme/theme";

const Stack = createStackNavigator();

export default function App() {
  // useEffect wird genutzt, um die Initialisierung einmalig durchzuführen
  useEffect(() => {
    // Funktion für die Initialisierung, die asynchron aufgerufen wird
    const initialize = async () => {
      try {
        // Datenbankinstanz abrufen
        const db = await getDbInstance();

        // await deletePlantsTable(db);  // Nur im Falle einer Tabellen-Erweiterung verwenden

        // Datenbank initialisieren
        await initializeDatabase(db);
        // Tabelle leeren (Entwicklungszwecke)
        await clearTable(db);
        // Dummy-Daten einfügen (Entwicklungszwecke)
        await insertDummyData(db);
        console.log("Datenbank und Dummy-Daten erfolgreich initialisiert.");
      } catch (error) {
        // Fehlerbehandlung, falls ein Fehler auftritt
        console.log(
          "Fehler bei der Initialisierung oder beim Einfügen von Dummy-Daten:",
          error
        );
      }
    };

    // Initialisierungsfunktion aufrufen
    initialize();
  }, []);

  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="OverviewPlants"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="AddPlant" component={AddPlant} />
          <Stack.Screen name="EditPlant" component={EditPlant} />
          <Stack.Screen name="OverviewPlants" component={OverviewPlants} />
          <Stack.Screen name="ShowPlant" component={ShowPlant} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
