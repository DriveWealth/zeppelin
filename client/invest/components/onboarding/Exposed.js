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
  // const [isBusy, setIsBusy] = useState(false)
  const { exposure, dispatch } = useContext(OnboardingContext);
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
          title={`Do any of these apply?`}
          subTitle={`Lorem ipsum dolor sit amet, consectetur`}
          value={exposure}
          onSelection={(v) => {
            dispatch({
              type: "set_exposure",
              exposure: v,
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
            navigation.navigate("Citizenship");
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
