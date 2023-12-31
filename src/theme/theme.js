/**
 * Das Theme für die React Native Paper-Komponenten.
 * Das Theme basiert auf dem DefaultTheme und wurde angepasst.
 */
import { DefaultTheme } from 'react-native-paper';

export const theme = {
  // DefaultTheme-Attribute übernehmen
  ...DefaultTheme,
  // Farbanpassungen vornehmen
  colors: {
    ...DefaultTheme.colors,
    // Textfarbe auf Schwarz setzen
    text: '#000000',
    // Primärfarbe auf Dunkelgrau setzen
    primary: '#0E0E0E',
    // Sekundärfarbe auf Dunkelgrau setzen
    secondary: '#414757',
    // Fehlerfarbe auf Rosa setzen
    error: '#f13a59',
  },
};
