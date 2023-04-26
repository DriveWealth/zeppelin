import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  Button,
  Text,
  Form,
  Item,
  Input,
  Label,
} from "native-base";
import { OnboardingContext } from "./OnboardingContext";
import moment from "moment";
import BackButton from "../BackButton";



const App = ({ navigation }) => {
  const { identity, contact, dispatch } = useContext(OnboardingContext);

  const [ssn, setSsn] = useState("");
  const [dob, setDob] = useState("");
  const [error, setError] = useState({});

  const isValidForm = () => {
    let isError = false;
    let newError = { ssn: null, dob: null };

    if (!moment(dob, "MM/DD/YYYY", true).isValid()) {
      newError.dob = "Enter a valid date";
      isError = true;
    }
    if (ssn.length !== 9) {
      newError.ssn = "Enter a valid SSN";
      isError = true;
    }
    setError(newError);
    return !isError;
  };

  useEffect(() => {
    navigation.setOptions({
      title: ``,
      headerLeft: () => <BackButton {...{ navigation }} />,
    });
  }, []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <View
        style={{
          justifyContent: "flex-start",
          alignItems: "flex-start",
          padding: 15,
        }}
      >
        <Text style={{ textAlign: "left", fontSize: 24, padding: 5 }}>
          {"Let’s make sure we’ve got your correct info"}
        </Text>
      </View>
      <View style={{ flex: 1, backgroundColor: "#FFF" }}>
        <Form>
          <Item
            floatingLabel
            style={[styles.item, { backgroundColor: "#F5F7FA" }]}
          >
            <Label>Legal Name</Label>
            <Input
              // value={`${identity.givenName} ${identity.familyName}`}
              // disabled
            />
          </Item>
          <Button
            transparent
            small
            onPress={() => {
              alert("[TODO] Will traverse to Profile Screen on the main app.");
            }}
          >
            <Text>Edit Legal Name</Text>
          </Button>
          <Item floatingLabel style={styles.item}>
            <Label>Address</Label>
            <Input
              value={`${contact.line1}, ${contact.city}, ${contact.state}, ${contact.country}`}
            />
          </Item>
          <Item floatingLabel style={styles.item} error={!!error.dob}>
            <Label>Date of Birth (mm/dd/yyyy)</Label>
            <Input
              value={dob}
              onChangeText={(v) => {
                let isNum = !!v.match(/^[0-9/]{0,10}$/);
                if (!isNum) return;
                setDob(v);
              }}
            />
          </Item>
          <Item floatingLabel style={styles.item} error={!!error.ssn}>
            <Label>Social Security Number</Label>
            <Input
              value={ssn}
              onChangeText={(v) => {
                let isNum = !!v.match(/^[0-9]{0,9}$/);
                if (!isNum) return;
                setSsn(v);
              }}
            />
          </Item>
          <Button
            transparent
            small
            onPress={() => {
              alert("[TODO] Will switch to ITIN.");
            }}
          >
            <Text>Use ITIN</Text>
          </Button>
          <View style={{ padding: 15, paddingTop: 0 }}>
            <Text style={{ fontSize: 13, color: "#687173" }}>
              Government regulations that fight fraud require us to ask for your
              SSN or ITIN.
            </Text>
          </View>
        </Form>
        <View style={{ padding: 15, backgroundColor: "#F5F7FA", margin: 15 }}>
          <Text style={{ fontSize: 13, marginTop: 10 }}>
            1. The number shown on this form is my correct taxpayer
            identification number (or I am waiting for a number to be issued to
            me); and
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
            4. The FACTA code(s) entered on this form (if any) indicating that I
            am exempt from FATCA reporting is correct.
          </Text>
        </View>
      </View>
      <Button
        style={{ borderRadius: 20, margin: 15, backgroundColor: "#142C8E" }}
        full
        onPress={() => {
          // Check for validity
          if (isValidForm()) {
            navigation.navigate("TOC");
          }
        }}
      >
        <Text>Next</Text>
      </Button>
    </ScrollView>
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
  price: { fontSize: 44, },
  activeText: { color: "#FFF" },
  inActiveText: { color: "#515354" },
  checkbox: { padding: 10 },
});

export default App;
