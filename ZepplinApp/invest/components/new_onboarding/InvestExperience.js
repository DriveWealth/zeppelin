import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Button, Text } from "native-base";
import MultipleRadio from "../MultipleRadio";
import * as flexbox from "./../../styles/flexbox.js";
import * as onboarding from "./../../styles/onboarding.js";
import { OnboardingContext } from "./../onboarding/OnboardingContext";
import BackButton from "../BackButton";
import ButtonSheet from "./ButtonSheet";

const InvestExperience = ({ navigation }) => {
  const { invest_experience, dispatch } = useContext(OnboardingContext);
  const [isFooterButtonDisabled, setIsFooterButtonDisabled] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      title: ``,
      headerLeft: () => <BackButton {...{ navigation }} />,
    });
  }, []);

  useEffect(() => {
    if (invest_experience === "") {
      setIsFooterButtonDisabled(true);
    } else {
      setIsFooterButtonDisabled(false);
    }
  }, [invest_experience]);

  const onSelection = (value) => {
    dispatch({
      type: "set_invest_experience",
      invest_experience: value,
    });
    navigation.navigate("FinancialFuture");
  };

  const onButtonPress = () => {
    navigation.navigate("FinancialFuture");
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
          How much experience do you have with investing?
        </Text>
        <View style={{ width: "100%", marginTop: 10 }}></View>
      </ScrollView>

      <ButtonSheet>
        <MultipleRadio
          data={multipleChoiceOptions}
          selectedValue={invest_experience}
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
    title: "None",
    value: "none",
  },
  {
    title: `A little bit`,
    value: "minimal",
  },
  {
    title: `I know what I'm doing`,
    value: "considerable",
  },
  {
    title: `I'm an expert`,
    value: "expert",
  },
];

export default InvestExperience;
