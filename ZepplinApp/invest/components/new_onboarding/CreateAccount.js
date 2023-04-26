import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Button, Text, ScrollView, Center } from "native-base";
import * as flexbox from "./../../styles/flexbox.js";
import * as onboarding from "./../../styles/onboarding.js";
import BackButton from "../BackButton";
import { InvestmentContext } from "../../InvestmentProvider.js";
import ButtonSheet from "./ButtonSheet.js";
import { OnboardingContext } from "../onboarding/OnboardingContext.js";

const CreateAccount = ({ navigation }) => {
  const { createAccount, dispatch } = useContext(InvestmentContext);
  const {
    firstName,
    lastName,
    email,
    phone,
    street1,
    province,
    city,
    country,
    dob,
    ssn,
    language,
  } = useContext(OnboardingContext);

  useEffect(() => {
    navigation.setOptions({
      title: ``,
      headerLeft: () => <BackButton {...{ navigation }} />,
    });
  }, []);

  const onButtonPress = () => {
    createAccount()
      .then(() => {
        navigation.navigate("OnboardingSuccess");
      })
      .catch((e) => {
        console.error("Issue creating account");
        console.error(e);
      });
  };

  return (
    <View style={onboarding.main_container}>
      <ScrollView
        style={{ width: "100%", flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <Center>
          <Image
            source={require("../img/Signup.png")}
            style={{ marginTop: 50, width: 100, height: 100 }}
          />
          <Text style={{ ...onboarding.text_title, marginTop: 20 }}>
            You are all set!
          </Text>
          <Text style={{ ...onboarding.text_body, marginTop: 20 }}>
            Everything looks great. We will now set up your account for trading.
            Click on 'Submit' below and sit tight.
          </Text>
        </Center>
      </ScrollView>
      <ButtonSheet>
        <Button onPress={onButtonPress}>
          <Text style={onboarding.button_text}>Submit</Text>
        </Button>
      </ButtonSheet>
    </View>
  );
};

// const styles = StyleSheet.create({
// });

export default CreateAccount;
