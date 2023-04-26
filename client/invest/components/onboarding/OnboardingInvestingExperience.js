import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import {
  Button,
  Text,
  Spinner,
  ListItem,
  CheckBox,
  Body,
  H2,
} from "native-base";
import Selector from "../Selector";
import { OnboardingContext } from "./OnboardingContext";
import { Header } from "../Navigation";
import BackButton from "../BackButton";

const options = [
  {
    title: "I am pretty new to all of this",
    subTitle: `I'd like to start somewhere approachable and easy to navigate.`,
    value: "novice",
  },
  {
    title: `I've done this before`,
    subTitle: `I've purchased stocks in the past, but not always sure I am doing the right thing.`,
    value: "proficient",
  },
  {
    title: `I'm pretty advanced`,
    subTitle: `I frequently buy and sell stock. I am confident in what I am doing.`,
    value: "expert",
  },
];

const App = ({ navigation }) => {
  const { experienceLevel, dispatch } = useContext(OnboardingContext);
  useEffect(() => {
    navigation.setOptions({
      title: ``,
      headerLeft: () => <BackButton {...{ navigation }} />,
    });
  }, []);
  return (
    <>
      <View style={{ alignItems: "center", margin: 20 }}>
        <Selector
          options={options}
          title={`What is your experience level with investing?`}
          subTitle={`Select the one that best describes you.`}
          value={experienceLevel}
          onSelection={(v) => {
            dispatch({
              type: "set_experience_level",
              experienceLevel: v,
            });
          }}
        />
      </View>
      <View style={{ alignItems: "center", margin: 20 }}></View>
      <View
        style={{ position: "absolute", bottom: 20, width: "100%", padding: 20 }}
      >
        <Button
          style={{ borderRadius: 20, backgroundColor: "#142C8E" }}
          full
          onPress={() => {
            navigation.navigate("BasicInformation");
          }}
        >
          <Text>Next</Text>
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
  price: { fontSize: 44,  },
  activeText: { color: "#FFF" },
  inActiveText: { color: "#515354" },
  checkbox: { padding: 10 },
});

export default App;
