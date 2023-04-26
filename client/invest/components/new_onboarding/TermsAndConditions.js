import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Button, Text } from "native-base";
import { Header } from "../Navigation";
import * as flexbox from "./../../styles/flexbox.js";
import * as onboarding from "./../../styles/onboarding.js";
import { OnboardingContext } from "./../onboarding/OnboardingContext";
import BackButton from "../BackButton";
import ButtonSheet from "./ButtonSheet";

const TermsAndConditions = ({ navigation }) => {
  const { taxpayer_status, dispatch } = useContext(OnboardingContext);

  useEffect(() => {
    navigation.setOptions({
      title: ``,
      headerLeft: () => <BackButton {...{ navigation }} />,
    });
  }, []);

  const onButtonPress = () => {
    navigation.navigate("BasicInfo");
  };

  return (
    <View style={onboarding.main_container}>
      <ScrollView
        style={{ width: "100%", flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={{ ...onboarding.text_title, marginTop: 20 }}>
          Terms and Conditions
        </Text>
        <Text style={{ ...onboarding.text_body, marginTop: 15 }}>
          {"\u2022"} This app let’s you buy, sell, and hold stock with
          PayPal.
        </Text>
        <Text style={{ ...onboarding.text_body, marginTop: 15 }}>
          {"\u2022"} Remember, investing involves financial risk so only invest
          what you’re comfortable with.
        </Text>
        <Text style={{ ...onboarding.text_body, marginTop: 15 }}>
          {"\u2022"} Any gains or losses made investing may need to be reported
          on your yearly taxes.
        </Text>
        <Text style={{ ...onboarding.text_smallest, marginTop: 15 }}>
          PayPal protects you against fraud and theft, but is not responsible
          for money lost as a result from market declines.{" "}
        </Text>
        <Text
          style={{
            ...onboarding.text_smallest,
            marginTop: 15,
            marginBottom: 50,
          }}
        >
          By continueing, you confirm that you’ve read and agree to the PayPal
          Invest Terms and Conditions.
        </Text>
      </ScrollView>
      <ButtonSheet>
        <Button onPress={onButtonPress}>
          <Text style={onboarding.button_text}>Agree and Continue</Text>
        </Button>
      </ButtonSheet>
    </View>
  );
};

// const styles = StyleSheet.create({
// });

export default TermsAndConditions;
