import { StyleSheet, Text } from "react-native";
import Invest from "./invest";
import {
  NativeBaseProvider,
  extendTheme,
  View,
} from "native-base";
import AuthProvider from "./invest/FirebaseProvider";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from 'react-query';
import { LogBox } from "react-native";

LogBox.ignoreLogs([
  "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage",
  "Deprecation warning: value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",
]);

const extension = {
  colors: {
    brand: {
      900: "#8287af",
      800: "#7c83db",
      700: "#b3bef6",
    },
  },
  config: {
    // Changing initialColorMode to 'dark'
    initialColorMode: 'light',
  },
  components: {
    Button: {
      baseStyle: {
        margin: 2,
        height: 12,
        borderRadius: 10,
      },
      defaultProps: {
        colorScheme: 'indigo',
      },
    },
    // Text: {
    //   baseStyle: {
    //     fontSize: 40,
    //   }
    // }
  },
};

const theme = extendTheme(extension);
const queryClient = new QueryClient();

let lookupSymbol;

if (window && window.location) {
  lookupSymbol = window.location.search.replace('?lookupSymbol=', '')
}

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <AuthProvider>
       <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Invest lookupSymbol={lookupSymbol} />
        </NavigationContainer>
        </QueryClientProvider>
      </AuthProvider>
    </NativeBaseProvider>
  );
}
