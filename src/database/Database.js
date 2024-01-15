/**
 * Enthält Funktionen für die Verwaltung und Interaktion mit der SQLite-Datenbank im Kontext der Pflanzenanwendung.
 */

import * as SQLite from "expo-sqlite";

// Name der Datenbankdatei
const databaseName = "PlantDatabase.db";

// Instanz der Datenbank
let dbInstance = null;

/**
 * Gibt eine Promise zurück, die eine Instanz der SQLite-Datenbank liefert.
 * Falls bereits eine Instanz vorhanden ist, wird diese zurückgegeben, ansonsten wird eine neue erstellt.
 *
 * @returns {Promise<SQLite.SQLiteDatabase>} - Eine Promise, die die Datenbankinstanz enthält.
 * @throws {Error} - Ein Fehler, falls beim Öffnen oder Erstellen der Datenbank auftritt.
 */
const getDbInstance = async () => {
  if (dbInstance) {
    return Promise.resolve(dbInstance);
  } else {
    try {
      dbInstance = await openDatabase();
      return Promise.resolve(dbInstance);
    } catch (error) {
      return Promise.reject(error);
    }
  }
};

/**
 * Öffnet die SQLite-Datenbank und gibt die Datenbankinstanz zurück.
 *
 * @returns {Promise<SQLite.SQLiteDatabase>} - Eine Promise, die die geöffnete Datenbankinstanz enthält.
 * @throws {Error} - Ein Fehler, falls beim Öffnen der Datenbank auftritt.
 */
const openDatabase = () => {
  try {
    console.log("openDatabase wird aufgerufen");
    const db = SQLite.openDatabase(databaseName);
    console.log("Datenbank erfolgreich geöffnet:", db);
    return Promise.resolve(db);
  } catch (error) {
    console.error("Fehler beim Öffnen der Datenbank:", error);
    return Promise.reject(error);
  }
};

/**
 * Initialisiert die Datenbank, erstellt die notwendigen Tabellen, falls sie nicht vorhanden sind.
 *
 * @param {SQLite.SQLiteDatabase} db - Die Datenbankinstanz.
 * @returns {Promise<any>} - Eine Promise, die den Erfolg der Initialisierung signalisiert.
 * @throws {Error} - Ein Fehler, falls beim Erstellen der Tabellen auftritt.
 */
const initializeDatabase = (db) => {
  console.log(`DB Tabelle wird angelegt`);
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS Pflanzen (PflanzenID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, PflanzenName TEXT, Standort TEXT, Kategorie TEXT, Bild TEXT, Erstellungsdatum DATE)",
          [],
          (tx, result) => {
            console.log("Tabelle Plants erstellt:", result);
            resolve(result);
          },
          (error) => {
            console.log("Fehler beim Erstellen der Tabelle Plants:", error);
            reject(error);
          }
        );
      },
      (error) => {
        console.log("Fehler beim Starten der Transaktion:", error);
        reject(error);
      }
    );
  });
};

/**
 * Löscht alle Datensätze in der Tabelle "Pflanzen".
 *
 * @param {SQLite.SQLiteDatabase} db - Die Datenbankinstanz.
 * @returns {Promise<any>} - Eine Promise, die den Erfolg des Löschvorgangs signalisiert.
 * @throws {Error} - Ein Fehler, falls beim Löschen der Datensätze auftritt.
 */
const clearTable = (db) => {
  console.log(`DB leeren wird ausgeführt`);
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          `DELETE FROM Pflanzen`,
          [],
          (tx, result) => {
            console.log(`Tabelle Pflanzen erfolgreich geleert:`, result);
            resolve(result);
          },
          (error) => {
            console.log(`Fehler beim Leeren der Tabelle Pflanzen:`, error);
            reject(error);
          }
        );
      },
      (error) => {
        console.log("Fehler beim Starten der Transaktion:", error);
        reject(error);
      }
    );
  });
};

/**
 * Fügt Dummy-Daten in die Tabelle "Pflanzen" ein.
 *
 * @param {SQLite.SQLiteDatabase} db - Die Datenbankinstanz.
 * @returns {Promise<any>} - Eine Promise, die den Erfolg des Einfügevorgangs signalisiert.
 * @throws {Error} - Ein Fehler, falls beim Einfügen der Dummy-Daten auftritt.
 */
const insertDummyData = (db) => {
  return new Promise(async (resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "INSERT INTO Pflanzen (Name, PflanzenName, Standort, Kategorie, Erstellungsdatum, Bild) VALUES (?, ?, ?, ?, ?, ?)",
          [
            "Pflanze 1",
            "Blume",
            "Garten",
            "Zierpflanze",
            "2023-01-01",
            "https://www.infranken.de/storage/image/1/3/1/2/3262131_noscale_1ArrXd_35THwI.jpg",
          ],
          (tx, result) => {
            console.log("Dummy-Datensatz 1 eingefügt:", result);
            resolve(result);
          },
          (error) => {
            console.log("Fehler beim Einfügen von Dummy-Datensatz 1:", error);
            reject(error);
          }
        );

        tx.executeSql(
          "INSERT INTO Pflanzen (Name, PflanzenName, Standort, Kategorie, Erstellungsdatum, Bild) VALUES (?, ?, ?, ?, ?, ?)",
          [
            "Pflanze 2",
            "Kaktus",
            "Wohnzimmer",
            "Zimmerpflanze",
            "2023-02-15",
            "https://www.baywa-baumarkt.de/thumbnail/5e/02/e7/1681399412/K000055254_Kaktus_Schwiegermuttersitz_Goldkugelkaktus_28-30_ECHI-GRUS-2720_01_800x800.jpg",
          ],
          (tx, result) => {
            console.log("Dummy-Datensatz 2 eingefügt:", result);
            resolve(result);
          },
          (error) => {
            console.log("Fehler beim Einfügen von Dummy-Datensatz 2:", error);
            reject(error);
          }
        );

        tx.executeSql(
          "INSERT INTO Pflanzen (Name, PflanzenName, Standort, Kategorie, Erstellungsdatum, Bild) VALUES (?, ?, ?, ?, ?, ?)",
          [
            "Pflanze 3",
            "Farn",
            "Badezimmer",
            "Zimmerpflanze",
            "2023-03-10",
            "https://www.bund.net/fileadmin/_processed_/8/4/csm_farn_naturtipp_juni_b5b31ca623.jpg",
          ],
          (tx, result) => {
            console.log("Dummy-Datensatz 3 eingefügt:", result);
            resolve(result);
          },
          (error) => {
            console.log("Fehler beim Einfügen von Dummy-Datensatz 3:", error);
            reject(error);
          }
        );
      },
      (error) => {
        console.log("Fehler beim Starten der Transaktion:", error);
        reject(error);
      }
    );
  });
};

/**
 * Gibt alle Pflanzen in der Tabelle "Pflanzen" zurück.
 *
 * @param {SQLite.SQLiteDatabase} db - Die Datenbankinstanz.
 * @returns {Promise<Array<Object>>} - Eine Promise, die ein Array mit den abgerufenen Pflanzendaten enthält.
 * @throws {Error} - Ein Fehler, falls beim Abrufen der Daten auftritt.
 */
const getAllPlants = (db) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "SELECT * FROM Pflanzen",
          [],
          (tx, result) => {
            const len = result.rows.length;
            const plants = [];

            for (let i = 0; i < len; i++) {
              plants.push(result.rows.item(i));
            }

            resolve(plants);
          },
          (error) => {
            console.log("Fehler beim Abrufen aller Datensätze:", error);
            reject(error);
          }
        );
      },
      (error) => {
        console.log("Fehler beim Starten der Transaktion:", error);
        reject(error);
      }
    );
  });
};

/**
 * Löscht eine Pflanze in der Tabelle "Pflanzen" anhand ihrer ID.
 *
 * @param {SQLite.SQLiteDatabase} db - Die Datenbankinstanz.
 * @param {number} plantId - Die ID der zu löschenden Pflanze.
 * @returns {Promise<any>} - Eine Promise, die den Erfolg des Löschvorgangs signalisiert.
 * @throws {Error} - Ein Fehler, falls beim Löschen der Pflanze auftritt.
 */
const deletePlantById = (db, plantId) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "DELETE FROM Pflanzen WHERE PflanzenID = ?",
          [plantId],
          (tx, result) => {
            console.log(`Datensatz mit ID ${plantId} gelöscht:`, result);
            resolve(result);
          },
          (error) => {
            console.log(
              `Fehler beim Löschen des Datensatzes mit ID ${plantId}:`,
              error
            );
            reject(error);
          }
        );
      },
      (error) => {
        console.log("Fehler beim Starten der Transaktion:", error);
        reject(error);
      }
    );
  });
};

/**
 * Fügt eine Pflanze in die Tabelle "Pflanzen" ein.
 *
 * @param {SQLite.SQLiteDatabase} db - Die Datenbankinstanz.
 * @param {string} name - Der Name der Pflanze.
 * @param {string} plantName - Der Pflanzenname.
 * @param {string} place - Der Standort der Pflanze.
 * @param {string} category - Die Kategorie der Pflanze.
 * @param {string} image - Der Bildpfad oder URL der Pflanze.
 * @returns {Promise<any>} - Eine Promise, die den Erfolg des Einfügevorgangs signalisiert.
 * @throws {Error} - Ein Fehler, falls beim Einfügen der Pflanze auftritt.
 */
const insertPlant = (db, name, plantName, place, category, image) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "INSERT INTO Pflanzen (Name, PflanzenName, Standort, Kategorie, Bild, Erstellungsdatum) VALUES (?, ?, ?, ?, ?, ?)",
          [name, plantName, place, category, image, getSysDate()],
          (tx, result) => {
            console.log("Pflanze erfolgreich hinzugefügt:", result);
            resolve(result);
          },
          (error) => {
            console.log("Fehler beim Einfügen der Pflanze:", error);
            reject(error);
          }
        );
      },
      (error) => {
        console.log("Fehler beim Starten der Transaktion:", error);
        reject(error);
      }
    );
  });
};

/**
 * Gibt das aktuelle Datum im Format 'YYYY-MM-DD' zurück.
 *
 * @returns {string} - Das aktuelle Datum im gewünschten Format.
 */
const getSysDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

/**
 * Gibt die Pflanzendaten für eine bestimmte Pflanzen-ID zurück.
 *
 * @param {SQLite.SQLiteDatabase} db - Die Datenbankinstanz.
 * @param {number} plantId - Die ID der abzurufenden Pflanze.
 * @returns {Promise<Object>} - Eine Promise, die die Pflanzendaten enthält.
 * @throws {Error} - Ein Fehler, falls beim Abrufen der Pflanzendaten auftritt.
 */
const getPlantById = (db, plantId) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "SELECT * FROM Pflanzen WHERE PflanzenID = ?",
          [plantId],
          (tx, result) => {
            if (result.rows.length > 0) {
              const plantData = result.rows.item(0);
              resolve(plantData);
            } else {
              reject(new Error("Pflanze nicht gefunden"));
            }
          },
          (error) => {
            console.log("Fehler beim Abrufen der Pflanze nach ID:", error);
            reject(error);
          }
        );
      },
      (error) => {
        console.log("Fehler beim Starten der Transaktion:", error);
        reject(error);
      }
    );
  });
};

/**
 * Aktualisiert die Pflanzendaten für eine bestimmte Pflanzen-ID.
 *
 * @param {SQLite.SQLiteDatabase} db - Die Datenbankinstanz.
 * @param {number} plantId - Die ID der zu aktualisierenden Pflanze.
 * @param {string} name - Der aktualisierte Name der Pflanze.
 * @param {string} plantName - Der aktualisierte Pflanzenname.
 * @param {string} place - Der aktualisierte Standort der Pflanze.
 * @param {string} category - Die aktualisierte Kategorie der Pflanze.
 * @param {string} image - Der aktualisierte Bildpfad oder URL der Pflanze.
 * @returns {Promise<any>} - Eine Promise, die den Erfolg der Aktualisierung signalisiert.
 * @throws {Error} - Ein Fehler, falls beim Aktualisieren der Pflanzendaten auftritt.
 */
const updatePlantById = (
  db,
  plantId,
  name,
  plantName,
  place,
  category,
  image
) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "UPDATE Pflanzen SET Name = ?, PflanzenName = ?, Standort = ?, Kategorie = ?, Bild = ? WHERE PflanzenID = ?",
          [name, plantName, place, category, image, plantId],
          (tx, result) => {
            console.log(`Pflanze mit ID ${plantId} aktualisiert:`, result);
            resolve(result);
          },
          (error) => {
            console.log(
              `Fehler beim Aktualisieren der Pflanze mit ID ${plantId}:`,
              error
            );
            reject(error);
          }
        );
      },
      (error) => {
        console.log("Fehler beim Starten der Transaktion:", error);
        reject(error);
      }
    );
  });
};

/**
 * Löscht die Tabelle "Pflanzen" aus der Datenbank.     WIRD NUR IN DEV MODUS BENÖTIGT!
 *
 * @param {SQLite.SQLiteDatabase} db - Die Datenbankinstanz.
 * @returns {Promise<any>} - Eine Promise, die den Erfolg des Löschvorgangs signalisiert.
 * @throws {Error} - Ein Fehler, falls beim Löschen der Tabelle auftritt.
 */
const deletePlantsTable = (db) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "DROP TABLE IF EXISTS Pflanzen",
          [],
          (tx, result) => {
            console.log("Tabelle Pflanzen erfolgreich gelöscht:", result);
            resolve(result);
          },
          (error) => {
            console.log("Fehler beim Löschen der Tabelle Pflanzen:", error);
            reject(error);
          }
        );
      },
      (error) => {
        console.log("Fehler beim Starten der Transaktion:", error);
        reject(error);
      }
    );
  });
};

export {
  clearTable,
  deletePlantById,
  deletePlantsTable,
  getAllPlants,
  getDbInstance,
  getPlantById,
  initializeDatabase,
  insertDummyData,
  insertPlant,
  openDatabase,
  updatePlantById,
};
