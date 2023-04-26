import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Button, Text } from "native-base";
import MultipleRadio from "../MultipleRadio";
import * as flexbox from "./../../styles/flexbox.js";
import * as onboarding from "./../../styles/onboarding.js";
import { OnboardingContext } from "./../onboarding/OnboardingContext";
import BackButton from "../BackButton";
import ButtonSheet from "./ButtonSheet";

const NonUSTaxpayer = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      title: ``,
      headerLeft: () => <BackButton {...{ navigation }} />,
    });
  }, []);

  const onButtonPress = () => {
    navigation.navigate("Dashboard");
  };

  return (
    <View style={onboarding.main_container}>
      <ScrollView
        style={{ width: "100%", flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={{ ...onboarding.text_title, marginTop: 20 }}>
          Sorry, but you’re not eligible for this app
        </Text>
        <Text style={{ ...onboarding.text_body, marginTop: 15 }}>
          You can still use your PayPal account to send, receive money and shop
          online.
        </Text>
      </ScrollView>

      <ButtonSheet>
        <Button          
          onPress={onButtonPress}
        >
          <Text style={onboarding.button_text}>Go to Invest home</Text>
        </Button>
      </ButtonSheet>
    </View>
  );
};

// const styles = StyleSheet.create({
// });

export default NonUSTaxpayer;
