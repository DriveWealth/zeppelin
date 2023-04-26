import React, {useEffect, useContext} from 'react';
import moment from 'moment';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from './LoginScreen';
import CaptchaScreen from './CaptchaScreen';
import AppStore from './appstore';

import {NativeModules, View} from 'react-native';

import {DWContext} from '../DWProvider'

const Stack = createStackNavigator();

const AuthStack = () => {  
  return (
    <Stack.Navigator headerMode={'none'}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Captcha" component={CaptchaScreen} />
    </Stack.Navigator>
  );  
};

const exitApp = () => {
  NativeModules.AppManager.popToTop();
};

const AppNavigator = ({children}) => {
  const { auth } = useContext(PYPLContext) 
  const account = auth.currentUserId && auth.accounts[auth.currentUserId]

  let isLoggedIn = false

  if (account && account.firstPartyUserAccessToken && moment().isBefore(account.firstPartyUserAccessToken.expires)) {
    isLoggedIn = true
  }
  if (auth.loginExtension && moment().isBefore(auth.loginExtension)) {
    isLoggedIn = true
  }

  // console.log(isLoggedIn, auth.currentUserId, '<<< Is logged in')
  // alert(isLoggedIn)

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode={'none'}>
        {isLoggedIn ? (
          <Stack.Screen name="App">
            {({navigation}) =>
              React.cloneElement(children, {
                navigation,
                getStack: () => Stack,
                exitApp,
              })
            }
          </Stack.Screen>
        ) : (
          <Stack.Screen name="Auth" component={AuthStack} />
        )}
        <Stack.Screen name="AppStore" component={AppStore} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AppNavigator;
