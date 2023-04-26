import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Button, Text } from "native-base";
import { Header } from "../Navigation";
import MultipleRadio from "../MultipleRadio";
import * as flexbox from "./../../styles/flexbox.js";
import * as onboarding from "./../../styles/onboarding.js";
import { OnboardingContext } from "./../onboarding/OnboardingContext";
import BackButton from "../BackButton";
import ButtonSheet from "./ButtonSheet";

const USCitizenship = ({ navigation }) => {
  const { us_citizenship_status, dispatch } = useContext(OnboardingContext);
  const [isFooterButtonDisabled, setIsFooterButtonDisabled] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      title: ``,
      headerLeft: () => <BackButton {...{ navigation }} />,
    });
  }, []);

  useEffect(() => {
    if (us_citizenship_status === "") {
      setIsFooterButtonDisabled(true);
    } else {
      setIsFooterButtonDisabled(false);
    }
  }, [us_citizenship_status]);

  const onSelection = (value) => {
    dispatch({
      type: "set_us_citizenship_status",
      us_citizenship_status: value,
    });
    onButtonPress();
  };

  const onButtonPress = () => {
    navigation.navigate("TermsAndConditions");
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
          Are you a U.S citizen?
        </Text>
      </ScrollView>

      <ButtonSheet>
        <MultipleRadio
          data={multipleChoiceOptions}
          selectedValue={us_citizenship_status}
          onSelection={onSelection}
        />
      </ButtonSheet>
    </View>
  );
};

const multipleChoiceOptions = [
  {
    title: "Yes",
    value: "is_us_citizen",
  },
  {
    title: "No",
    value: "is_not_us_citizen",
  },
];

// const styles = StyleSheet.create({
// });

export default USCitizenship;
