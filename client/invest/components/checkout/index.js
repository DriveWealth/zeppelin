import React, {useContext, useEffect, useState} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Instruments from './Instruments';
import BuyReview from './BuyReview';
import SellReview from './SellReview';
import BuySuccess from './BuySuccess';
import SellSuccess from './SellSuccess';
import {CloseIcon, IconButton, Spinner, Text, View, VStack} from 'native-base';
import {InvestmentContext} from '../../InvestmentContext';
import UIProvider from '../UIContext'
import { useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const BuyStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Instruments" component={Instruments} />
      <Stack.Screen name="Review" component={BuyReview} />
      <Stack.Screen name="Success" component={BuySuccess} />
    </Stack.Navigator>
  );
};

const SellStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Review" component={SellReview} />
      <Stack.Screen name="Success" component={SellSuccess} />
    </Stack.Navigator>
  );
};

const App = ({handleClose}) => {
  const {orderDetails} = useContext(InvestmentContext);
  const navigation = useNavigation();
  useEffect(() => {
    if (!orderDetails) return;
    if (orderDetails.side === 'buy') {
      navigation.navigate('Buy');
    } else {
      navigation.navigate('Sell');
    }
  }, [orderDetails]);

  return (
    <UIProvider handleClose={handleClose}>
      <View style={{height: '100%'}}>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Wait" component={Spinner} />
        <Stack.Screen name="Buy" component={BuyStack} />
        <Stack.Screen name="Sell" component={SellStack} />
      </Stack.Navigator>
      </View>
      <IconButton
        style={{position: 'absolute', right: 10, top: 14}}
        icon={<CloseIcon size="3" mt="0.5" />}
        borderRadius="full"
        onPress={() => {
          handleClose();
        }}
      />
    </UIProvider>
  );
};

export default App;
