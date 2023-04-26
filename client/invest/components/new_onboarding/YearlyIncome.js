import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Button, Text } from "native-base";
import MultipleRadio from "../MultipleRadio";
import * as flexbox from "./../../styles/flexbox.js";
import * as onboarding from "./../../styles/onboarding.js";
import { OnboardingContext } from "./../onboarding/OnboardingContext";
import BackButton from "../BackButton";
import ButtonSheet from "./ButtonSheet"

const YearlyIncome = ({ navigation }) => {
  const { yearly_income, dispatch } = useContext(OnboardingContext);
  const [isFooterButtonDisabled, setIsFooterButtonDisabled] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      title: ``,
      headerLeft: () => <BackButton {...{ navigation }} />,
    });
  }, []);

  useEffect(() => {
    if (yearly_income === "") {
      setIsFooterButtonDisabled(true);
    } else {
      setIsFooterButtonDisabled(false);
    }
  }, [yearly_income]);

  const onSelection = (value) => {
    dispatch({
      type: "set_yearly_income",
      yearly_income: value,
    });
    navigation.navigate("InvestExperience");
  };

  const onButtonPress = () => {
    navigation.navigate("InvestExperience");
  };

  const getFooterButtonStyle = () => {
    if (isFooterButtonDisabled === true) {
      return {
        ...onboarding.footer_button_disabled,
        ...flexbox.flex_row_center_center,
      };
    } else {
      return {
        ...onboarding.footer_button,
        ...flexbox.flex_row_center_center,
      };
    }
  };

  return (
    <View style={onboarding.main_container}>
      <ScrollView
        style={{ width: "100%", flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={{ ...onboarding.text_title, marginTop: 20 }}>
          What is your yearly income?
        </Text>
        <View style={{ width: "100%", marginTop: 10 }}></View>
      </ScrollView>
      <ButtonSheet>
        <MultipleRadio
          data={multipleChoiceOptions}
          selectedValue={yearly_income}
          onSelection={onSelection}
        />
      </ButtonSheet>
    </View>
  );
};

// const styles = StyleSheet.create({
// })

const multipleChoiceOptions = [
  {
    title: "Under $25,000",
    value: "under_25k",
  },
  {
    title: `$25,000 to $50,000`,
    value: "25k_to_50k",
  },
  {
    title: `$50,000 to $100,000`,
    value: "50k_to_100k",
  },
  {
    title: `$100,000 to $200,000`,
    value: "100k_to_200k",
  },
  {
    title: `Over $200,000`,
    value: "over_200k",
  },
];

export default YearlyIncome;
