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
import { AssessmentContext } from "./AssessmentContext";
import BackButton from "../BackButton";

const options = [
  {
    title: "Short-term profit",
    value: "short_term_profit",
  },
  {
    title: `Long-term savings`,
    value: "long_term_savings",
  },
  {
    title: `I just want to learn more about it`,
    value: "learn",
  },
  {
    title: `I'm not sure yet`,
    value: "not_sure",
  },
];

const App = ({ navigation }) => {
  const { financialExpectation, dispatch } = useContext(AssessmentContext);
  useEffect(() => {
    navigation.setOptions({
      title: ``,
      headerLeft: () => <BackButton {...{ navigation }} />,
    });
  }, []);

  return (
    <>
      <View style={{ alignItems: "center", padding: 20 }}>
        <Text style={{ fontSize: 16 }}>[Progress bar ...]</Text>
      </View>

      <View style={{ alignItems: "center", marginLeft: 20, marginRight: 20 }}>
        <Selector
          options={options}
          title={`When thinking about investing, how do you see it helping your financial future?`}
          value={financialExpectation}
          onSelection={(v) => {
            dispatch({
              type: "set_financial_expectation",
              financialExpectation: v,
            });
          }}
        />
      </View>

      <View
        style={{ position: "absolute", bottom: 20, width: "100%", padding: 20 }}
      >
        <Button
          style={{ borderRadius: 20, backgroundColor: "#142C8E" }}
          full
          onPress={() => {
            navigation.navigate("InterestingCategories");
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
  price: { fontSize: 44, },
  activeText: { color: "#FFF" },
  inActiveText: { color: "#515354" },
  checkbox: { padding: 10 },
});

export default App;
