import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import { Button, Text, FormControl, Input, Stack, HStack } from "native-base";
import { OnboardingContext } from "./../onboarding/OnboardingContext";
import moment from "moment";
import BackButton from "../BackButton";
import * as flexbox from "./../../styles/flexbox.js";
import * as onboarding from "./../../styles/onboarding.js";
import { AuthContext } from "../../FirebaseProvider";

const getAddress = (contact) => {
  if (contact) {
    return `${contact.line1}, ${contact.city}, ${contact.state}, ${contact.country}`;
  } else {
    return "";
  }
};

// const FIELDS = ['firstName', 'lastName', 'emailAddress', 'dob', 'ssn', 'province', 'city', 'street1', 'language', 'postalCode']
// const INITIAL_ERROR_STATE = FIELDS.reduce((acc, curr) => {
//   acc[curr] = {isError: false}
//   return acc
// }, {})
const BasicInfo = ({ navigation }) => {
  const { identity, contact, dispatch } = useContext(OnboardingContext);
  const { user } = useContext(AuthContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  
  const [language, setLanguage] = useState('');

  const [street1, setStreet1] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [country, setCountry] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phone, setPhone] = useState('');  

  const [ssn, setSsn] = useState('');
  const [dob, setDob] = useState('');
  // const [address, setAddress] = useState(getAddress(contact));
  const [error, setError] = useState({});

  const getFullName = (identity) => {
    if (identity) {
      return `${identity.givenName} ${identity.familyName}`;
    } else {
      return "";
    }
  };

  const isValidForm = () => {
    let isError = false;
    let newError = { ssn: null, dob: null, address: null };
    if (!moment(dob, "MM/DD/YYYY", true).isValid()) {
      newError.dob = "Enter a valid date";
      isError = true;
      // alert(newError.dob);
    }
    if (ssn.length !== 9) {
      newError.ssn = "Enter a 9 digit SSN";
      isError = true;
    }
    if (language.length === 0) {
      newError.language = "Enter a valid Language";
      isError = true;
    }
    if (city.length === 0) {
      newError.city = "Enter a valid City";
      isError = true;
    }
    if (province.length === 0) {
      newError.province = "Enter a valid Province/State";
      isError = true;
    }
    if (phone.length === 0 ) {
      newError.phone = "Enter a valid phone number";
      isError = true;
    }
    if (street1.length === 0) {
      newError.street1 = "Enter an Street Address";
      isError = true;
    }
    if (country.length === 0) {
      newError.country = "Enter valid Country";
      isError = true;
    }
    if (postalCode.length === 0) {
      newError.postalCode = "Enter valid Postal Code";
      isError = true;
    }
    if (firstName.length === 0) {
      newError.firstName = "Enter First Name";
      isError = true;
    }
    if (lastName.length === 0) {
      newError.lastName = "Enter Last Name";
      isError = true;
    }
    console.log(newError, '<<< ERRORS')
    setError(newError);
    return !isError;
    // return true
  };

  useEffect(() => {
    navigation.setOptions({
      title: ``,
      headerLeft: () => <BackButton {...{ navigation }} />,
    });
  }, []);

  const onButtonPress = () => {
    if (!isValidForm()) return;

    dispatch({
      type: "set_basic",
      basic: {
        firstName,
        lastName,
        email: user.email,
        phone,
        street1,
        province,
        city,
        country,
        dob,
        ssn,
        language,
      },
    });

    navigation.navigate("SpecialConsiderations");
  };

  return (
    <View style={onboarding.main_container}>
      <ScrollView
        contentContainerStyle={{ backgroundColor: "#FFF", padding: 10 }}
      >
        <HStack style={{ marginTop: 20, alignItems: 'center' }}>
          <Text style={{ ...onboarding.text_title }}>
            {"Personal Information"}
          </Text>
          <Button variant={"link"}>
            Auto Fill [Sandbox]
          </Button>
        </HStack>
        
        <View style={{ flex: 1, marginTop: 10, backgroundColor: "#FFF" }}>
            <FormControl isInvalid={error['firstName']} style={{ marginTop: 5, marginBottom: 5 }}>
              <FormControl.Label>First Name</FormControl.Label>
              <Input onChangeText={setFirstName} />
              {/* <FormControl.HelperText>Must be atleast 6 characters.</FormControl.HelperText> */}
              <FormControl.ErrorMessage>{error['firstName'] || ''}</FormControl.ErrorMessage>
              </FormControl>
            <FormControl isInvalid={error['lastName']} style={{ marginTop: 5, marginBottom: 5 }}>
              <FormControl.Label>Last Name</FormControl.Label>
              <Input onChangeText={setLastName} />
              <FormControl.ErrorMessage>{error['lastName']}</FormControl.ErrorMessage>
            </FormControl>
            <FormControl isInvalid={error['country']} style={{ marginTop: 5, marginBottom: 5 }}>
              <FormControl.Label>Country</FormControl.Label>
              <Input onChangeText={setCountry} />
              <FormControl.ErrorMessage>{error['country']}</FormControl.ErrorMessage>
            </FormControl>
            <FormControl isInvalid={error['phone']} style={{ marginTop: 5, marginBottom: 5 }}>
              <FormControl.Label>Phone</FormControl.Label>
              <Input onChangeText={setPhone} />
              <FormControl.ErrorMessage>{error['phone']}</FormControl.ErrorMessage>
            </FormControl>
            <FormControl style={{ marginTop: 5, marginBottom: 5 }}>
              <FormControl.Label>Email</FormControl.Label>
              <Input defaultValue={user && user.email} isDisabled={true} />
            </FormControl>
            <FormControl isInvalid={error['language']} style={{ marginTop: 5, marginBottom: 5 }}>
              <FormControl.Label>Language</FormControl.Label>
              <Input onChangeText={setLanguage} />
              <FormControl.ErrorMessage>{error['language']}</FormControl.ErrorMessage>
            </FormControl>
            <FormControl isInvalid={error['street1']} style={{ marginTop: 5, marginBottom: 5 }}>
              <FormControl.Label>Street 1</FormControl.Label>
              <Input onChangeText={setStreet1} />
              <FormControl.ErrorMessage>{error['street1']}</FormControl.ErrorMessage>
            </FormControl>
            <FormControl isInvalid={error['city']} style={{ marginTop: 5, marginBottom: 5 }}>
              <FormControl.Label>City</FormControl.Label>
              <Input onChangeText={setCity} />
              <FormControl.ErrorMessage>{error['city']}</FormControl.ErrorMessage>
            </FormControl>
            <FormControl isInvalid={error['province']} style={{ marginTop: 5, marginBottom: 5 }}>
              <FormControl.Label>Province/State</FormControl.Label>
              <Input onChangeText={setProvince} />
              <FormControl.ErrorMessage>{error['province']}</FormControl.ErrorMessage>
            </FormControl>
            <FormControl isInvalid={error['postalCode']} style={{ marginTop: 5, marginBottom: 5 }}>
              <FormControl.Label>Postal Code</FormControl.Label>
              <Input onChangeText={setPostalCode} />
              <FormControl.ErrorMessage>{error['postalCode']}</FormControl.ErrorMessage>
            </FormControl>
            <FormControl isInvalid={error['dob']} style={{ marginTop: 0, marginBottom: 20 }}>
              <FormControl.Label>Date of Birth (mm/dd/yyyy)</FormControl.Label>
              <Input
                // value={dob}
                onChangeText={(v) => {
                  let isNum = !!v.match(/^[0-9/]{0,10}$/);
                  if (!isNum) return;
                  setDob(v);
                }}
              />
              <FormControl.ErrorMessage>{error['dob']}</FormControl.ErrorMessage>
            </FormControl>

            <FormControl isInvalid={error['dob']} style={{ marginTop: 0, marginBottom: 20 }}>
              <FormControl.Label>Social Security Number</FormControl.Label>
              <Input
                // value={ssn}
                onChangeText={(v) => {
                  let isNum = !!v.match(/^[0-9]{0,9}$/);
                  if (!isNum) return;
                  setSsn(v);
                }}
              />
              <FormControl.ErrorMessage>{error['ssn']}</FormControl.ErrorMessage>

            </FormControl>
          

          <View style={{ padding: 15, backgroundColor: "#F5F7FA", margin: 15 }}>
            <Text style={{ fontSize: 13, marginTop: 10 }}>
              1. The number shown on this form is my correct taxpayer
              identification number (or I am waiting for a number to be issued
              to me); and
            </Text>
            <Text style={{ fontSize: 13, marginTop: 10 }}>
              2. I am not subject to backup withholding because: (a) I am exempt
              from backup withholdings, or, (b) I have not been notified by the
              internal Revenue Services (IRS) that I am subject to backup
              withholding as a result of a failure to report all interest or
              dividends, or (c) the IRS has notified me that I am no longer
              subject to backup withholding; and
            </Text>
            <Text style={{ fontSize: 13, marginTop: 10 }}>
              3. I am a U.S. citizen or other U.S. person.
            </Text>
            <Text style={{ fontSize: 13, marginTop: 10 }}>
              4. The FACTA code(s) entered on this form (if any) indicating that
              I am exempt from FATCA reporting is correct.
            </Text>
          </View>
        </View>

        {/* <View style={ onboarding.footer_button_container }>
            <Button onPress={ onButtonPress }>
                <Text style={ onboarding.button_text } >Agree and Continue</Text>
            </Button>
        </View> */}
        <Button
          // style={{ borderRadius: 20, margin: 15, backgroundColor: "#142C8E" }}
          full
          onPress={onButtonPress}
        >
          <Text style={onboarding.button_text}>Next</Text>
        </Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  item: { marginRight: 15, padding: 5 },
  assetName: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
    color: "#515354",
  },
  price: { fontSize: 44 },
  activeText: { color: "#FFF" },
  inActiveText: { color: "#515354" },
  checkbox: { padding: 10 },
});

export default BasicInfo;
