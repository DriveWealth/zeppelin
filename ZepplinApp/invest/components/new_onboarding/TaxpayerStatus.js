import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Button, Text } from "native-base";
import MultipleRadio from "../MultipleRadio";
import * as flexbox from "./../../styles/flexbox.js";
import * as onboarding from "./../../styles/onboarding.js";
import { OnboardingContext } from "./../onboarding/OnboardingContext";
import BackButton from "../BackButton";
import ButtonSheet from "./ButtonSheet";

const TaxpayerStatus = ({ navigation }) => {
  const { taxpayer_status, dispatch } = useContext(OnboardingContext);
  const [isFooterButtonDisabled, setIsFooterButtonDisabled] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      title: ``,
      headerLeft: () => <BackButton {...{ navigation }} />,
    });
  }, []);

  useEffect(() => {
    if (taxpayer_status === "") {
      setIsFooterButtonDisabled(true);
    } else {
      setIsFooterButtonDisabled(false);
    }
  }, [taxpayer_status]);

  const onSelection = (value) => {
    dispatch({
      type: "set_taxpayer_status",
      taxpayer_status: value,
    });
    onButtonPress();
  };

  const onButtonPress = () => {
    if (taxpayer_status === "is_us_taxpayer") {
      navigation.navigate("USCitizenship");
    } else if (taxpayer_status === "is_not_taxpayer") {
      navigation.navigate("NonUSTaxpayer");
    } else if (taxpayer_status === "") {
      // navigation.navigate('NonUSTaxpayer')
    }
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
          Confirm your U.S. taxpayer status
        </Text>
        <Text style={{ ...onboarding.text_body, marginTop: 15 }}>
          We need to verify your US taxpayer status.
        </Text>
        <Text style={{ ...onboarding.text_body, marginTop: 15 }}>
          You can learn more about why we need this info in our Help Center.
        </Text>
        <Text
          style={{
            ...onboarding.text_body,
            marginTop: 15,
            fontWeight: "500",
          }}
        >
          Is the account holder a US entity, US citizen, or US person under US
          tax law?
        </Text>
        {/* <View style={ { width: '100%', marginTop: 10 }} >
                        <MultipleRadio
                            data={multipleChoiceOptions}
                            selectedValue={taxpayer_status}
                            onSelection={onSelection}
                        />
                    </View> */}
      </ScrollView>
      <ButtonSheet>
        <Button onPress={() => {
          onSelection('is_us_taxpayer')
          navigation.navigate("USCitizenship");
        }}>
          Yes
        </Button>
        <Button onPress={() => {
          onSelection('is_not_taxpayer')
          navigation.navigate("NonUSTaxpayer");
        }}>
          No
        </Button>
      </ButtonSheet>
    </View>
  );
};

const multipleChoiceOptions = [
  {
    title: "Yes",
    value: "is_us_taxpayer",
  },
  {
    title: "No",
    value: "is_not_taxpayer",
  },
];

// const styles = StyleSheet.create({
// });

export default TaxpayerStatus;
