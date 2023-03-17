import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { extendTheme, NativeBaseProvider } from "native-base";
import route from "./route";

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

const Stack = createNativeStackNavigator();
// extend the theme
export const theme = extendTheme({
  config: config, colors: {
    primary: {
      100: 'rgba(61, 97, 251, 1)',
      90: 'rgba(61, 97, 251, 0.9)',
      80: 'rgba(61, 97, 251, 0.8)',
      70: 'rgba(61, 97, 251, 0.7)',
      60: 'rgba(61, 97, 251, 0.6)',
    }
  }
});
type MyThemeType = typeof theme;
declare module "native-base" {
  interface ICustomTheme extends MyThemeType { }
}
export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator >
          {route.map(i => <Stack.Screen key={i.name} options={i.options} name={i.name} component={i.component} />)}
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}