import React from 'react';
// import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const AppNavigator = ({children}) => {

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode={'none'}>
        <Stack.Screen name="App">
          {({navigation}) =>
            React.cloneElement(children, {
              navigation,
              getStack: () => Stack,
            })
          }
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AppNavigator;
