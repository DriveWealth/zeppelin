import React, { useContext, useEffect, useState } from "react";
import { VStack, Text } from "native-base";
import { AuthContext } from "../FirebaseProvider";
import { StackActions } from '@react-navigation/native';


const Waiting = ({ navigation, route }) => {
  const { user } = useContext(AuthContext);
  
  useEffect(() => {
    if (user === undefined) {
      return;
    } else if (user === null) {
      // return navigation.dispatch(
      //   StackActions.replace('Login')  
      // );
      return navigation.navigate("Login");
    } else {
      // return navigation.dispatch(
      //   StackActions.replace('InvestUser') 
      // );
      return navigation.navigate("InvestUser");
    }
  }, [user]);

  return (
    <>
      <VStack safeArea={true} flex="1">
        
      </VStack>
    </>
  );
};

export default Waiting;
