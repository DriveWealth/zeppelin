import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Image, NativeModules } from "react-native";
import {
  Button,
  Text,
  Spinner,
  ListItem,
  CheckBox,
  Body,
  H2,
} from "native-base";
import { Header } from "../Navigation";

const MiniAppsManager = NativeModules.MiniAppsManager;

const App = ({ navigation }) => {
  
    useEffect(() => {
    navigation.setOptions({
      title: ``,
      headerLeft: null,
    });
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF" }}>
      <View
        style={{ margin: 10, justifyContent: "center", alignItems: "center" }}
      >
        <Image source={require("../img/Congrats.png")} />
      </View>

      <View style={{ alignItems: "center", margin: 10 }}>
        <Text style={{ width: 350, textAlign: "center", fontSize: 24 }}>
          Congrats! You are ready to trade
        </Text>
      </View>
      <View style={{ alignItems: "center", margin: 20 }}>
        <Text style={{ textAlign: "center", fontSize: 16 }}>
          You will get $5 as a credit when. you buy your first stock
        </Text>
      </View>
      <View style={{ alignItems: "center", margin: 20 }}>
        <Text style={{ textAlign: "center", fontSize: 16 }}>
          Let’s check out your new Dashboard.
        </Text>
      </View>
      <View
        style={{ position: "absolute", bottom: 20, width: "100%", padding: 20 }}
      >
        <Button
          style={{ borderRadius: 20, backgroundColor: "#142C8E" }}
          full
          onPress={() => {
            MiniAppsManager.dismiss();
          }}
        >
          <Text>Go To My Dashboard</Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  assetName: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
    color: "#515354",
  },
  price: { fontSize: 44,  },
  activeText: { color: "#FFF" },
  inActiveText: { color: "#515354" },
  checkbox: { padding: 10 },
});

export default App;
