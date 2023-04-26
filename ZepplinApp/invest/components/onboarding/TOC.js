import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Image, ScrollView } from "react-native";
import {
  Button,
  Text,
  Spinner,
  ListItem,
  CheckBox,
  Body,
  H2,
  Form,
  Item,
  Input,
  Label,
  Content,
} from "native-base";
import Selector from "../Selector";
import { OnboardingContext } from "./OnboardingContext";
import { Header } from "../Navigation";
import BackButton from "../BackButton";

const options = [
  {
    title: "10% shareholder or senior executive at a publicly traded company",
    // subTitle: `I'd like to start somewhere approachable and easy to navigate.`,
    value: "shareholder",
  },
  {
    title: `You or a family member work for another brokerage`,
    // subTitle: `I've purchased stocks in the past, but not always sure I am doing the right thing.`,
    value: "family",
  },
  {
    title: `A politically exposed person`,
    // subTitle: `I frequently buy and sell stock. I am confident in what I am doing.`,
    value: "political",
  },
  {
    title: `None apply`,
    // subTitle: `I frequently buy and sell stock. I am confident in what I am doing.`,
    value: "none",
  },
];

const App = ({ navigation }) => {
  const { exposure, identity, contact, dispatch } =
    useContext(OnboardingContext);

  useEffect(() => {
    navigation.setOptions({
      title: ``,
      headerLeft: () => <BackButton {...{ navigation }} />,
    });
  }, []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <View
        style={{
          justifyContent: "flex-start",
          alignItems: "flex-start",
          padding: 15,
        }}
      >
        <Text style={{ textAlign: "left", fontSize: 24, padding: 5 }}>
          {"Terms and Conditions"}
        </Text>
      </View>
      <View style={{ flex: 1, backgroundColor: "#FFF" }}>
        <View style={{ padding: 15, backgroundColor: "#F5F7FA", margin: 15 }}>
          <Text style={{ fontSize: 13, marginTop: 10 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Text>
          <Text style={{ fontSize: 13, marginTop: 10 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Text>
          <Text style={{ fontSize: 13, marginTop: 10 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Text>
          <Text style={{ fontSize: 13, marginTop: 10 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Text>
        </View>
      </View>
      <Button
        style={{ borderRadius: 20, margin: 15, backgroundColor: "#142C8E" }}
        full
        onPress={() => {
          navigation.navigate("CreateAccount");
        }}
      >
        <Text>Agree and Continue</Text>
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  item: { marginRight: 15 },
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
