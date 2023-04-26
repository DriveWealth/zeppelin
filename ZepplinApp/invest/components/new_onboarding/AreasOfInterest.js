import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Button, Text } from "native-base";
import MultipleRadio from "../MultipleRadio";
import * as flexbox from "./../../styles/flexbox.js";
import * as onboarding from "./../../styles/onboarding.js";
import { OnboardingContext } from "./../onboarding/OnboardingContext";
import BackButton from "../BackButton";
import ButtonSheet from "./ButtonSheet";

const AreasOfInterest = ({ navigation }) => {
  const { areas_of_interest, dispatch } = useContext(OnboardingContext);
  const [isFooterButtonDisabled, setIsFooterButtonDisabled] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      title: ``,
      headerLeft: () => <BackButton {...{ navigation }} />,
    });
  }, []);

  useEffect(() => {
    if (areas_of_interest === "") {
      setIsFooterButtonDisabled(true);
    } else {
      setIsFooterButtonDisabled(false);
    }
  }, [areas_of_interest]);

  const onSelection = (value) => {
    return dispatch({
      type: "set_areas_of_interest",
      areas_of_interest: value,
    });
  };

  const onButtonPress = () => {
    navigation.navigate("Privacy");
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
      <View
        style={{
          ...onboarding.text_body_container,
          ...flexbox.flex_col_start_center,
        }}
      >
        <ScrollView
          style={{ width: "100%" }}
          showsVerticalScrollIndicator={false}
        >
          <Text style={{ ...onboarding.text_title, marginTop: 20 }}>
            What investment areas interest you?
          </Text>
          <View style={{ width: "100%", marginTop: 10 }}>
            <MultipleRadio
              data={multipleChoiceOptions}
              selectedValue={areas_of_interest}
              onSelection={onSelection}
            />
          </View>
        </ScrollView>
      </View>
      <ButtonSheet>
        <Button
          style={getFooterButtonStyle()}
          full
          onPress={onButtonPress}
          disabled={isFooterButtonDisabled}
        >
          <Text style={onboarding.button_text}>Next</Text>
        </Button>
      </ButtonSheet>
    </View>
  );
};

// const styles = StyleSheet.create({
// })

const multipleChoiceOptions = [
  {
    title: "Technology and innovation",
    value: "tech",
  },
  {
    title: `Healthcare`,
    value: "healthcare",
  },
  {
    title: `Entertainment and media`,
    value: "entertainment",
  },
  {
    title: `Travel and leisure`,
    value: "travel",
  },
  {
    title: `Industrial manufacturing`,
    value: "manufacturing",
  },
];

export default AreasOfInterest;
