import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Button, Text } from "native-base";
import MultipleRadio from "../MultipleRadio";
import * as flexbox from "./../../styles/flexbox.js";
import * as onboarding from "./../../styles/onboarding.js";
import { OnboardingContext } from "./../onboarding/OnboardingContext";
import BackButton from "../BackButton";
import ButtonSheet from "./ButtonSheet";

const StatusEmployment = ({ navigation }) => {
  const { employment_status, dispatch } = useContext(OnboardingContext);
  const [isFooterButtonDisabled, setIsFooterButtonDisabled] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      title: ``,
      headerLeft: () => <BackButton {...{ navigation }} />,
    });
  }, []);

  useEffect(() => {
    if (employment_status === "") {
      setIsFooterButtonDisabled(true);
    } else {
      setIsFooterButtonDisabled(false);
    }
  }, [employment_status]);

  const onSelection = (value) => {
    dispatch({
      type: "set_employment_status",
      employment_status: value,
    });
    navigation.navigate("YearlyIncome");
  };

  const onButtonPress = () => {
    navigation.navigate("YearlyIncome");
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
          What is your employment status?
        </Text>
      </ScrollView>

      <ButtonSheet>
        <MultipleRadio
          data={multipleChoiceOptions}
          selectedValue={employment_status}
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
    title: "Employed",
    value: "employed",
  },
  {
    title: `Unemployed`,
    value: "unemployed",
  },
  {
    title: `Retired`,
    value: "retired",
  },
  {
    title: `Student`,
    value: "student",
  },
];

export default StatusEmployment;
