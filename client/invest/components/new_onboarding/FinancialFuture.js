import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Button, Text } from "native-base";
import MultipleRadio from "../MultipleRadio";
import * as flexbox from "./../../styles/flexbox.js";
import * as onboarding from "./../../styles/onboarding.js";
import { OnboardingContext } from "./../onboarding/OnboardingContext";
import BackButton from "../BackButton";
import ButtonSheet from "./ButtonSheet";

const FinancialFuture = ({ navigation }) => {
  const { financial_future, dispatch } = useContext(OnboardingContext);
  const [isFooterButtonDisabled, setIsFooterButtonDisabled] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      title: ``,
      headerLeft: () => <BackButton {...{ navigation }} />,
    });
  }, []);

  useEffect(() => {
    if (financial_future === "") {
      setIsFooterButtonDisabled(true);
    } else {
      setIsFooterButtonDisabled(false);
    }
  }, [financial_future]);

  const onSelection = (value) => {
    dispatch({
      type: "set_financial_future",
      financial_future: value,
    });
    navigation.navigate("AreasOfInterest");
  };

  const onButtonPress = () => {
    navigation.navigate("AreasOfInterest");
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
          When thinking about investing, how do you see it helping your
          financial future?
        </Text>
      </ScrollView>
      <ButtonSheet>
        <MultipleRadio
          data={multipleChoiceOptions}
          selectedValue={financial_future}
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
    title: "Short-term profile",
    value: "short_term",
  },
  {
    title: `Long-term savings`,
    value: "long_term",
  },
  {
    title: `I just want to learn more`,
    value: "curious",
  },
  {
    title: `I'm not sure yet`,
    value: "undecided",
  },
];

export default FinancialFuture;
