import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  NativeModules,
  ScrollView,
} from "react-native";
import { Button, Center, Text } from "native-base";
import MultipleRadio from "../MultipleRadio";
import * as flexbox from "./../../styles/flexbox.js";
import * as onboarding from "./../../styles/onboarding.js";
import { OnboardingContext } from "./../onboarding/OnboardingContext";
import BackButton from "../BackButton";
import * as api from "./../../utils/api.js";
import ButtonSheet from "./ButtonSheet";
const MiniAppsManager = NativeModules.MiniAppsManager;

const OnboardingSuccess = ({ navigation }) => {
  const allData = useContext(OnboardingContext);
  console.log("--------------------------------ONBOARDING DATA ", allData);

  useEffect(() => {
    navigation.setOptions({
      title: ``,
      headerLeft: () => <BackButton {...{ navigation }} />,
    });

    const saveStuff = async () => {
      try {
        const profileObject = {
          tenant: 2,
          accountNumber: 123,
        };
        const response1 = await api.postProfile(profileObject);
        const newProfile = response1.data.postProfile;
        const onboardingObject = {
          profileId: newProfile.profileId,
          type: "none",
          address: allData.address,
          dob: allData.dob,
          employmentType: allData.employment_status,
          company: "some company",
          designation: "some designation",
          income: allData.yearly_income,
          ssn: allData.ssn,
          itin: "some itin",
          kycStatus: "verified",
          phoneConfStatus: "verified",
          investExperience: allData.invest_experience,
          financialFuture: allData.financial_future,
        };
        const response2 = await api.postOnboarding(onboardingObject);
        const newlyCreatedOnboarding = response2.data.postOnboarding;
        allData.dispatch({
          type: "set_account",
          account: newlyCreatedOnboarding,
        });
      } catch (error) {
        console.log("----saveStuff error ", error);
      }
    };
    // saveStuff() // COMMENT OUT FOR TESTING
  }, []);

  const onButtonPress = () => {
    navigation.navigate("Dashboard");
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
          contentContainerStyle={flexbox.flex_col_start_center}
        >
          <Center>
          <Image source={require("../img/Congrats.png")} style={{marginTop: 50, width: 100, height: 100}} />
          <Text
            style={{
              ...onboarding.text_title,
              marginTop: 20,
              textAlign: "left",
              width: "100%",
            }}
          >
            Congrats! You are ready to trade.
          </Text>
          <Text
            style={{
              ...onboarding.text_body,
              marginTop: 15,
              width: "100%",
              marginBottom: 50,
            }}
          >
            You will get $5 as credit when you buy your first stock.
          </Text>
          </Center>
        </ScrollView>
      </View>

      <ButtonSheet>
        <Button
          onPress={onButtonPress}
        >
          <Text style={onboarding.button_text}>Go to Dashboard</Text>
        </Button>
        </ButtonSheet>
    </View>
  );
};

// const styles = StyleSheet.create({
// })

export default OnboardingSuccess;
