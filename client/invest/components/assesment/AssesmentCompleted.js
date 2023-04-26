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
import { AssessmentContext } from "./AssessmentContext";

const message = {
  novice:
    "Based on your answers, it looks like you’re relatively new to investing.",
  proficient:
    "Based on your answers, it looks like you know what you are doing.",
  expert: "Based on your answers, it looks like you’re an expert at investing!",
};

const MiniAppsManager = NativeModules.MiniAppsManager;

const App = ({ navigation }) => {
  const { experienceLevel, dispatch } = useContext(AssessmentContext);
  useEffect(() => {
    navigation.setOptions({
      title: ``,
      headerLeft: null,
    });
  }, []);

  return (
    <>
      <View style={{ alignItems: "center", padding: 20 }}>
        <Text style={{ fontSize: 16 }}></Text>
      </View>
      <View
        style={{ margin: 10, justifyContent: "center", alignItems: "center" }}
      >
        <Image source={require("../img/AssessmentCompleted.png")} />
      </View>

      <View style={{ alignItems: "center", margin: 10 }}>
        <Text style={{ width: 350, textAlign: "center", fontSize: 24 }}>
          Congrats! Your customized Invest experience is ready
        </Text>
      </View>
      <View style={{ alignItems: "center", margin: 20 }}>
        <Text style={{ textAlign: "center", fontSize: 16 }}>
          {message[experienceLevel]}
        </Text>
      </View>
      <View style={{ alignItems: "center", margin: 20 }}>
        <Text style={{ textAlign: "center", fontSize: 16 }}>
          Let’s check out your personalized page and get started.
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
          <Text>Get Started</Text>
        </Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  assetName: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
    color: "#515354",
  },
  price: { fontSize: 44, },
  activeText: { color: "#FFF" },
  inActiveText: { color: "#515354" },
  checkbox: { padding: 10 },
});

export default App;
