import React, { useEffect, useContext } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  StatusBar,
  Image,
} from "react-native";
import * as flexbox from './../styles/flexbox.js'

import { InvestmentContext } from "../InvestmentProvider";
import numeral from "numeral";
import { width } from "dom-helpers";
import {VStack} from 'native-base';

// const currency = {
//   'USD': '$'
// }

const App = () => {
  const {  account, positions } = useContext(InvestmentContext);

  // const portfolioValue = positions.reduce( (sum, current ) => {
  //   return sum + current.marketValue
  // }, 0 )
  // console.log('ACCOJUNT ', account)
  // console.log('>>>> positions.data', positions.data)

  return (
    <VStack>
        <Text
          style={{
            fontSize: 20,
            color: "#515354",
            textAlign: 'center',
            fontWeight: 'bold',
            width: "100%",
            textAlign: "left",
            marginBottom: 10
          }}
        >
          Holdings
        </Text>
        <Text style={{ fontSize: 40 }}>
          {account.status === 'loading' && "..."}
          {positions.status === 'loading' && "..."}
          {positions.data && numeral( positions.data.equityValue || account.data.cashAvailableForTrading || 0).format("$0.00")}          
        </Text>
    </VStack>
      
  )
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginTop: 5,
  },
});

export default App;
