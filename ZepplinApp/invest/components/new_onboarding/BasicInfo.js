import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import {
  Button,
  Text,
  FormControl,
  Input,
  Stack,
  HStack,
  Box,
} from "native-base";
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

const INITIAL_STATE = {
  basic: {
    firstName: "",
    lastName: "",
    country: "",
    phone: "",
    language: "",
  },
  identification: {
    value: "",
    type: "",
    citizenship: "",
  },
  personal: {
    dob: "",
    politicallyExposedNames: "",
  },
  profile: {
    investmentObjectives: "Active_Daily",
    investmentExperience: "None",
    annualIncome: 0,
    networthLiquid: 0,
    networthTotal: 0,
    riskTolerance: "Low",
  },
  address: {
    street1: "",
    city: "",
    province: "",
    postalCode: "",
  },
  employment: {
    status: "",
    broker: "",
    type: "",
    position: "",
  },
  disclosures: {
    termsOfUse: false,
    customerAgreement: false,
    marketDataAgreement: false,
    rule14b: false,
    findersFee: false,
    privacyPolicy: false,
    dataSharing: false,
    // signedBy:
  },
};

const getRandomState = (email) => {
  return {
    basic: {
      firstName: "",
      lastName: "",
      language: "en_US",
      country: "USA",
      phone: "+14082194784",
      emailAddress: email,
    },
    profile: {
      investmentObjectives: "Active_Daily",
      investmentExperience: "None",
      annualIncome: 0,
      networthLiquid: 0,
      networthTotal: 0,
      riskTolerance: "Low",
    },
    address: {
      street1: "1 Beach St",
      city: "San Jose",
      province: "CA",
      postalCode: "95123",
    },
    employment: {
      status: "Employed",
      broker: false,
      type: "PROFESSIONAL",
      position: "Police",
    },
    identification: {
      value: "508373656",
      type: "SSN",
      citizenship: "USA",
    },
    disclosures: {
      termsOfUse: true,
      customerAgreement: true,
      marketDataAgreement: true,
      rule14b: true,
      findersFee: false,
      privacyPolicy: true,
      dataSharing: true,
      // signedBy: `${state.basic.firstName} ${state.basic.lastName}`,
    },
    personal: {
      // birthDay: 1,
      // birthMonth: 2,
      // birthYear: 1982,

      dob: "01/30/1980",
      politicallyExposedNames: "",
    },
  };
};

const BasicInfo = ({ navigation }) => {
  const { dispatch, createUserAndAccount } = useContext(OnboardingContext);
  const { user } = useContext(AuthContext);

  const [state, setState] = useState(INITIAL_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [error, setError] = useState({});

  const isValidForm = () => {
    let isError = false;
    let newError = {};

    if (!moment(state.personal.dob, "MM/DD/YYYY", true).isValid()) {
      newError.dob = "Enter a valid date";
      isError = true;
      // alert(newError.dob);
    }
    if (state.identification.value.length !== 9) {
      newError.ssn = "Enter a 9 digit SSN";
      isError = true;
    }
    if (state.basic.language.length === 0) {
      newError.language = "Enter a valid Language";
      isError = true;
    }
    if (state.address.city.length === 0) {
      newError.city = "Enter a valid City";
      isError = true;
    }
    if (state.address.province.length === 0) {
      newError.province = "Enter a valid Province/State";
      isError = true;
    }
    if (state.basic.phone.length === 0) {
      newError.phone = "Enter a valid phone number";
      isError = true;
    }
    if (state.address.street1.length === 0) {
      newError.street1 = "Enter an Street Address";
      isError = true;
    }
    if (state.basic.country.length === 0) {
      newError.country = "Enter valid Country";
      isError = true;
    }
    if (state.address.postalCode.length === 0) {
      newError.postalCode = "Enter valid Postal Code";
      isError = true;
    }
    if (state.basic.firstName.length === 0) {
      newError.firstName = "Enter First Name";
      // isError = true;
    }
    if (state.basic.lastName.length === 0) {
      newError.lastName = "Enter Last Name";
      isError = true;
    }
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

  const createInputHandler = (category, key, regex) => (v) => {
    if (regex) {
      let passed = !!v.match(regex);
      if (!passed) return;
    }
    let cat = { ...state[category] };
    // if (key === 'dob') {
    //   // Is a date. Split the value
    //   cat.birthDay = parseInt(moment(v).format('M'))
    //   cat.birthMonth = parseInt(moment(v).format('D'))
    //   cat.birthYear = parseInt(moment(v).format('Y'))
    // } else {
    cat[key] = v;
    // }
    setState({ ...state, [category]: cat });
  };

  const onButtonPress = () => {
    if (!isValidForm()) return;

    setIsSubmitting(true);
    // dispatch({
    //   type: "set_all",
    //   all: state,
    // });
    const payload = { ...state };
    const dob = payload.personal.dob;

    payload.personal.birthMonth = parseInt(moment(dob).format("M"));
    payload.personal.birthDay = parseInt(moment(dob).format("D"));
    payload.personal.birthYear = parseInt(moment(dob).format("Y"));

    delete payload.personal.dob;

    payload.disclosures.signedBy = `${payload.basic.fullName} ${payload.basic.lastName}`;

    createUserAndAccount(payload)
      .then((account) => {
        setIsSubmitting(false);
        // alert(JSON.stringify(account, null, 2));
        navigation.navigate("GetStarted");
      })
      .catch((e) => {
        setIsSubmitting(false);
      });
  };

  return (
    <Box safeArea={true}>
      <ScrollView
        contentContainerStyle={{ backgroundColor: "#FFF", padding: 20 }}
        horizontal={false}
      >
        <HStack
          style={{
            alignItems: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ ...onboarding.text_title }}>
            {"Personal Information"}
          </Text>
          <Button
            variant={"link"}
            onPress={() => {
              setState(getRandomState(user && user.email));
            }}
          >
            [Fill Random Data]
          </Button>
        </HStack>

        <View style={{ flex: 1, marginTop: 10, backgroundColor: "#FFF" }}>
          <FormControl
            isInvalid={error["firstName"]}
            style={{ marginTop: 5, marginBottom: 5 }}
          >
            <FormControl.Label>First Name</FormControl.Label>
            <Input
              onChangeText={createInputHandler("basic", "firstName")}
              defaultValue={state.basic.firstName}
            />
            {/* <FormControl.HelperText>Must be atleast 6 characters.</FormControl.HelperText> */}
            <FormControl.ErrorMessage>
              {error["firstName"] || ""}
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={error["lastName"]}
            style={{ marginTop: 5, marginBottom: 5 }}
          >
            <FormControl.Label>Last Name</FormControl.Label>
            <Input
              onChangeText={createInputHandler("basic", "lastName")}
              defaultValue={state.basic.lastName}
            />
            <FormControl.ErrorMessage>
              {error["lastName"]}
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={error["country"]}
            style={{ marginTop: 5, marginBottom: 5 }}
          >
            <FormControl.Label>Country</FormControl.Label>
            <Input
              onChangeText={createInputHandler("address", "country")}
              defaultValue={state.basic.country}
            />
            <FormControl.ErrorMessage>
              {error["country"]}
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={error["phone"]}
            style={{ marginTop: 5, marginBottom: 5 }}
          >
            <FormControl.Label>Phone</FormControl.Label>
            <Input
              onChangeText={createInputHandler("basic", "phone")}
              defaultValue={state.basic.phone}
            />
            <FormControl.ErrorMessage>
              {error["phone"]}
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl style={{ marginTop: 5, marginBottom: 5 }}>
            <FormControl.Label>Email</FormControl.Label>
            <Input defaultValue={user && user.email} isDisabled={true} />
          </FormControl>
          <FormControl
            isInvalid={error["language"]}
            style={{ marginTop: 5, marginBottom: 5 }}
          >
            <FormControl.Label>Language</FormControl.Label>
            <Input
              onChangeText={createInputHandler("basic", "language")}
              defaultValue={state.basic.language}
            />
            <FormControl.ErrorMessage>
              {error["language"]}
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={error["street1"]}
            style={{ marginTop: 5, marginBottom: 5 }}
          >
            <FormControl.Label>Street 1</FormControl.Label>
            <Input
              onChangeText={createInputHandler("address", "street1")}
              defaultValue={state.address.street1}
            />
            <FormControl.ErrorMessage>
              {error["street1"]}
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={error["city"]}
            style={{ marginTop: 5, marginBottom: 5 }}
          >
            <FormControl.Label>City</FormControl.Label>
            <Input
              onChangeText={createInputHandler("address", "city")}
              defaultValue={state.address.city}
            />
            <FormControl.ErrorMessage>{error["city"]}</FormControl.ErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={error["province"]}
            style={{ marginTop: 5, marginBottom: 5 }}
          >
            <FormControl.Label>Province/State</FormControl.Label>
            <Input
              onChangeText={createInputHandler("address", "province")}
              defaultValue={state.address.province}
            />
            <FormControl.ErrorMessage>
              {error["province"]}
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={error["postalCode"]}
            style={{ marginTop: 5, marginBottom: 5 }}
          >
            <FormControl.Label>Postal Code</FormControl.Label>
            <Input
              onChangeText={createInputHandler("address", "postalCode")}
              defaultValue={state.address.postalCode}
            />
            <FormControl.ErrorMessage>
              {error["postalCode"]}
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={error["dob"]}
            style={{ marginTop: 0, marginBottom: 20 }}
          >
            <FormControl.Label>Date of Birth (mm/dd/yyyy)</FormControl.Label>
            <Input
              // value={dob}
              onChangeText={createInputHandler(
                "personal",
                "dob",
                /^[0-9/]{0,10}$/
              )}
              defaultValue={state.personal.dob}
            />
            <FormControl.ErrorMessage>{error["dob"]}</FormControl.ErrorMessage>
          </FormControl>

          <FormControl
            isInvalid={error["dob"]}
            style={{ marginTop: 0, marginBottom: 20 }}
          >
            <FormControl.Label>Social Security Number</FormControl.Label>
            <Input
              // value={ssn}
              onChangeText={createInputHandler(
                "identification",
                "value",
                /^[0-9]{0,9}$/
              )}
              defaultValue={state.identification.value}
            />
            <FormControl.ErrorMessage>{error["ssn"]}</FormControl.ErrorMessage>
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
          // full
          variant={'solid'}
          onPress={onButtonPress}
          isDisabled={isSubmitting}
        >
          Submit
        </Button>
        <Button
          // style={{ borderRadius: 20, margin: 15, backgroundColor: "#142C8E" }}
          variant={'outline'}
          onPress={() => {
            navigation.goBack()
          }}
          isDisabled={isSubmitting}
        >
          Cancel
        </Button>
      </ScrollView>
    </Box>
  );
};

export default BasicInfo;
