
import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import MultipleRadio from "../MultipleRadio";

const ButtonSheet = ({ children }) => {
    return <View
    style={{
      width: "100%",
      padding: 10,
    }}
  >
    {/* <View style={{backgroundColor: 'red', alignItems: 'center'}}> */}
        {children}
    {/* </View> */}
  </View>
}

export default ButtonSheet

