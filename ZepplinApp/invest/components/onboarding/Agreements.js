import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { WebView } from "react-native-webview";
import {
  Button,
  Text,
  Spinner,
  ListItem,
  CheckBox,
  Body,
  H3,
  Card,
  CardItem,
  Right,
} from "native-base";
import { OnboardingContext } from "./OnboardingContext";
import BackButton from "../BackButton";

/*
{
      "agreement": "margin_agreement",
      "signed_at": "2020-09-11T18:09:33Z",
      "ip_address": "185.13.21.99"
    },
    {
      "agreement": "account_agreement",
      "signed_at": "2020-09-11T18:13:44Z",
      "ip_address": "185.13.21.99"
    },
    {
      "agreement": "customer_agreement",
      "signed_at": "2020-09-11T18:13:44Z",
      "ip_address": "185.13.21.99"
    }
*/
const AgreementControl = ({ title, isSigned, onSigned }) => {
  return (
    <>
      <View>
        <View style={{ padding: 10 }}>
          <Text style={styles.agreementHeaderText}>{title}</Text>
        </View>
        <View style={{ backgroundColor: "#FFF" }}>
          <Body style={{ height: 50 }}>
            <Text style={styles.agreementText}>Legalese coming soon ...</Text>
          </Body>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "flex-end",
            width: "100%",
            padding: 10,
          }}
        >
          <View>
            {isSigned ? (
              <Text
                style={{
                  fontSize: 14,
                  marginRight: 10,
                  marginLeft: 10,
                  color: "green",
                  height: 38,
                }}
              >
                Signed
              </Text>
            ) : (
              <Button
                bordered
                style={{ borderRadius: 20, height: 38 }}
                onPress={() => {
                  onSigned();
                }}
              >
                <Text style={{ fontSize: 14, marginRight: 10, marginLeft: 10 }}>
                  Sign
                </Text>
              </Button>
            )}
          </View>
        </View>
      </View>
    </>
  );
};

/*
{
      "agreement": "margin_agreement",
      "signed_at": "2020-09-11T18:09:33Z",
      "ip_address": "185.13.21.99"
    },
    {
      "agreement": "account_agreement",
      "signed_at": "2020-09-11T18:13:44Z",
      "ip_address": "185.13.21.99"
    },
    {
      "agreement": "customer_agreement",
      "signed_at": "2020-09-11T18:13:44Z",
      "ip_address": "185.13.21.99"
    }

*/
const App = ({ navigation }) => {
  const { agreements, dispatch } = useContext(OnboardingContext);
  const { isMarginSigned, isCustomerSigned, isUserSigned } = agreements;
  let allSigned = isUserSigned && isCustomerSigned && isMarginSigned;

  useEffect(() => {
    navigation.setOptions({
      title: ``,
      headerLeft: () => <BackButton {...{ navigation }} />,
    });
  }, []);

  return (
    <>
      <ScrollView>
        <View style={{ alignItems: "center", padding: 20 }}>
          <Text style={{ fontSize: 16 }}>Agreements</Text>
        </View>
        <AgreementControl
          title="Margin Agreement"
          isSigned={isMarginSigned}
          onSigned={() => {
            dispatch({
              type: "set_agreements",
              agreements: { ...agreements, isMarginSigned: true },
            });
          }}
        />
        <AgreementControl
          title="User Agreement"
          isSigned={isUserSigned}
          onSigned={() => {
            dispatch({
              type: "set_agreements",
              agreements: { ...agreements, isUserSigned: true },
            });
          }}
        />
        <AgreementControl
          title="Customer Agreement"
          isSigned={isCustomerSigned}
          onSigned={() => {
            dispatch({
              type: "set_agreements",
              agreements: { ...agreements, isCustomerSigned: true },
            });
          }}
        />
      </ScrollView>
      <View style={{ width: "100%", padding: 20 }}>
        <Button
          style={{
            borderRadius: 20,
            backgroundColor: allSigned ? "#142C8E" : "#DBD8D0",
          }}
          full
          disabled={!allSigned}
          onPress={() => {
            navigation.navigate("CreateAccount");
          }}
        >
          <Text>Next</Text>
        </Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  assetName: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
    color: "#515354",
  },
  price: { fontSize: 44,},
  activeText: { color: "#FFF" },
  inActiveText: { color: "#515354" },
  checkbox: { padding: 10 },
  agreementText: { fontSize: 12, margin: 5 },
  agreementHeaderText: { fontSize: 14 },
});

export default App;
