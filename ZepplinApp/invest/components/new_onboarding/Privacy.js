import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Switch } from "react-native";
import { Button, Text } from "native-base";
import * as flexbox from "./../../styles/flexbox.js";
import * as onboarding from "./../../styles/onboarding.js";
import { OnboardingContext } from "./../onboarding/OnboardingContext";
import BackButton from "../BackButton";
import ButtonSheet from "./ButtonSheet";

const Privacy = ({ navigation }) => {
  const { dispatch } = useContext(OnboardingContext);
  const [isShareTradingEnabled, setIsShareTradingEnabled] = useState(false);
  const toggleShareTradingSwitch = () =>
    setIsShareTradingEnabled((previousState) => !previousState);
  const [isSharePortfolioEnabled, setIsSharePortfolioEnabled] = useState(false);
  const toggleSharePortfolioSwitch = () =>
    setIsSharePortfolioEnabled((previousState) => !previousState);

  useEffect(() => {
    navigation.setOptions({
      title: ``,
      headerLeft: () => <BackButton {...{ navigation }} />,
    });
  }, []);

  const onSelection = (value) => {
    dispatch({
      type: "set_privacy",
      privacy: value,
    });
  };

  const onButtonPress = () => {
    navigation.navigate("CreateAccount");
  };

  return (
    <View style={onboarding.main_container}>
      <View
        style={{
          ...onboarding.text_body_container,
          ...flexbox.flex_col_start_center,
        }}
      >
        <ScrollView
          style={{ width: "100%" }}
          showsVerticalScrollIndicator={false}
        >
          <Text style={{ ...onboarding.text_title, marginTop: 20 }}>
            Sharing is caring
          </Text>
          <Text style={{ ...onboarding.text_body, marginTop: 15 }}>
            Share with your community what you’re investing in and learn about
            new stocks from others.
          </Text>
          <Text style={{ ...onboarding.text_body, marginTop: 15 }}>
            We never share actual amounts from trades or your portfolio, only
            what company you’re investing in.
          </Text>

          <View style={{ width: "100%", marginTop: 20 }}>
            <View style={{ ...flexbox.flex_row_between_center, marginTop: 15 }}>
              <Text style={{ ...onboarding.text_body }}>
                Share trading activity (no amounts).
              </Text>
              <Switch
                trackColor={{ false: "#767577", true: "blue" }}
                thumbColor={isShareTradingEnabled ? "white" : "white"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleShareTradingSwitch}
                value={isShareTradingEnabled}
              />
            </View>
            <View style={{ ...flexbox.flex_row_between_center, marginTop: 15 }}>
              <Text style={{ ...onboarding.text_body }}>
                Share public portfolio (no amounts).
              </Text>
              <Switch
                trackColor={{ false: "#767577", true: "blue" }}
                thumbColor={isSharePortfolioEnabled ? "white" : "white"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSharePortfolioSwitch}
                value={isSharePortfolioEnabled}
              />
            </View>
          </View>
        </ScrollView>
      </View>
      <ButtonSheet>
        <Button onPress={onButtonPress}>
          <Text style={onboarding.button_text}>Next</Text>
        </Button>
      </ButtonSheet>
    </View>
  );
};

// const styles = StyleSheet.create({
// })

export default Privacy;
