import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Button, Text } from "native-base";
import MultipleRadio from "../MultipleRadio";
import * as flexbox from "./../../styles/flexbox.js";
import * as onboarding from "./../../styles/onboarding.js";
import { OnboardingContext } from "./../onboarding/OnboardingContext";
import BackButton from "../BackButton";
import ButtonSheet from "./ButtonSheet";

const SpecialConsiderations = ({ navigation }) => {
  const { special_considerations, dispatch } = useContext(OnboardingContext);
  const [isFooterButtonDisabled, setIsFooterButtonDisabled] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      title: ``,
      headerLeft: () => <BackButton {...{ navigation }} />,
    });
  }, []);

  useEffect(() => {
    if (special_considerations === "") {
      setIsFooterButtonDisabled(true);
    } else {
      setIsFooterButtonDisabled(false);
    }
  }, [special_considerations]);

  const onSelection = (value) => {
    dispatch({
      type: "set_special_considerations",
      special_considerations: value,
    });
    navigation.navigate("StatusEmployment");
  };

  const onButtonPress = () => {
    navigation.navigate("StatusEmployment");
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
          Do any of these apply to you?
        </Text>

        </ScrollView>
      <ButtonSheet>
      <MultipleRadio
          data={multipleChoiceOptions}
          selectedValue={special_considerations}
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
    title:
      "10% shareholder or senior executive \n at a publicly traded company",
    value: "public_company",
  },
  {
    title: `You or a family member work for another brokerage`,
    value: "brokerage",
  },
  {
    title: `You or a family member is Finra employee`,
    value: "finra_employee",
  },
  {
    title: `None apply`,
    value: "none",
  },
];

export default SpecialConsiderations;
