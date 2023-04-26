import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import {
  Button,
  Text,
  Spinner,
  ListItem,
  CheckBox,
  Body,
  H2,
} from "native-base";
import {PYPLContext} from "@paypalcorp/pypl-context";
import { OnboardingContext } from "./OnboardingContext";
import { InvestmentContext } from "../InvestmentContext";
import moment from "moment";
import config from "../../config";
import { Header } from "../Navigation";
import BackButton from "../BackButton";

const App = ({ navigation }) => {
  const { fetch: pyplFetch, user } = useContext(PYPLContext);
  const { agreements, documents, disclosures, trustedContact } =
    useContext(OnboardingContext);
  const { dispatch } = useContext(InvestmentContext);

  useEffect(() => {
    navigation.setOptions({
      title: ``,
      headerLeft: () => <BackButton {...{ navigation }} />,
    });
  }, []);

  // const getBankDetails = async () => {
  //     const resp = await pyplFetch('/v1/mfsconsumer/wallet/@me/bank-account')
  //     const {artifacts} = await resp.json()
  //     return artifacts[0].bank
  // }

  const handleCreateAccount = async () => {
    try {
      // const bank = await getBankDetails()
      const resp = await fetch(config.gqlUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Authorization": "custom-authorized",
        },
        body: JSON.stringify({
          operationName: "createTradingAccount",
          query: `mutation createTradingAccount ($account: AccountInput!) {
                        createTradingAccount(account: $account) {
                            id
                            cash
                            currency
                            portfolioValue
                        }
                      }`,
          variables: {
            account: {
              paypalAccount: {
                uniqueId: user.uniqueId,
                firstName: user.firstName,
                lastName: user.lastName,
                emailAddress: user.emails[0].emailAddress,
                phoneNumber: user.phones[0].phoneNumber,
                streetAddress: user.addresses[0].line1,
                city: user.addresses[0].city,
                state: user.addresses[0].state,
                postalCode: user.addresses[0].postalCode,
                dateOfBirth: "1978-02-02", // Hard code for now
                fundingSource: "employment_income", // Hard code for now
              },
              disclosures: {
                isControlPerson: false,
                isAffiliatedExchangeOrFinra: false,
                isPoliticallyExposed: false,
                isImmediateFamilyExposed: false,
              },
              agreements: [
                {
                  agreement: "margin_agreement",
                  signedAt: moment().format(),
                  ipAddress: "185.13.21.99",
                },
                {
                  agreement: "account_agreement",
                  signedAt: moment().format(),
                  ipAddress: "185.13.21.99",
                },
                {
                  agreement: "customer_agreement",
                  signedAt: moment().format(),
                  ipAddress: "185.13.21.99",
                },
              ],
              documents: [
                {
                  documentType: "identity_verification",
                  documentSubType: "passport",
                  content: "QWxwYWNhcyBjYW5ub3QgbGl2ZSBhbG9uZS4=",
                  mimeType: "jpeg",
                },
              ],
              trustedContact: {
                firstName: "Arvind",
                lastName: "Naidu",
                emailAddress: "myrock@gmail.com",
              },
            },
          },
        }),
      });
      const json = await resp.json();
      const { createAccount } = json.data;
      dispatch({
        type: "set_account",
        account: createAccount,
      });
      // console.log(JSON.stringify(json))
      return json;
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <>
      <View
        style={{ margin: 10, justifyContent: "center", alignItems: "center" }}
      >
        <Image source={require("../img/Signup.png")} style={ { marginTop: 50, width: 100, height: 100 } }  />
      </View>

      <View style={{ alignItems: "center", margin: 20 }}>
        <Text style={{ width: 200, textAlign: "center", fontSize: 24 }}>
          You are all set!
        </Text>
      </View>
      <View style={{ alignItems: "center", margin: 20 }}>
        <Text style={{ textAlign: "center", fontSize: 16 }}>
          Everything looks great. We will now set up your account for tradin.
          Click on 'Submit' below and sit tight.
        </Text>
      </View>
      {/* <View style={{ alignItems: 'center', margin: 20 }}>
                <Text style={{ textAlign: 'center', fontSize: 16 }}>
                    We will set up your account for trading in the background and get you that free stock
                </Text>
            </View> */}
      <View
        style={{ position: "absolute", bottom: 20, width: "100%", padding: 20 }}
      >
        <Button
          style={{ borderRadius: 20, backgroundColor: "#142C8E" }}
          full
          onPress={() => {
            handleCreateAccount()
              .then(() => {
                navigation.navigate("OnboardingCompleted");
              })
              .catch((e) => {
                alert("Sorry cound not create account.");
                navigation.navigate("Invest");
              });
          }}
        >
          <Text>Submit</Text>
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
  price: { fontSize: 44,  },
  activeText: { color: "#FFF" },
  inActiveText: { color: "#515354" },
  checkbox: { padding: 10 },
});

export default App;
