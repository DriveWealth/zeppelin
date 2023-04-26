import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Linking, Keyboard } from "react-native";
import { Button, Text, Input, Form, Item, Label } from "native-base";
import { InvestmentContext } from "../InvestmentContext";
import BackButton from "../BackButton";

const App = ({navigation}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isBusy, setIsBusy] = useState(false);
  const { saveAnchorCreds, resetAnchorCreds, getAnchorCreds } =
    useContext(InvestmentContext);

  useEffect(() => {
    getAnchorCreds().then((creds) => {
      if (creds) {
        const { username, password } = creds;
        setUsername(username);
        setPassword(password);
      }
    });
  }, []);

  const isValidForm = () => {
    if (username.length < 1) {
      return false;
    }
    if (password.length < 5) {
      return false;
    }
    return true;
  };

  const [error, setError] = useState(null);

  if (isBusy) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <View style={{ flex: 1 }} />
        <View style={{ flex: 2 }}>{/* <Spinner color={brandInfo} /> */}</View>
      </View>
    );
  }

  return (
    <>
      <View
        style={{
          justifyContent: "center",
          padding: 20,
          alignItems: "center",
        }}
      >
        <Label
          style={{
            textAlign: "left",
            marginTop: 20,
            fontSize: 16,
            fontWeight: "500",
          }}
        >
          Anchor Production Credentials
        </Label>
        <Form style={{ width: "100%", marginTop: 20 }}>
          <Item stackedLabel error={!!error}>
            <Label>Email</Label>
            <Input
              value={username}
              autoCapitalize={"none"}
              autoCorrect={false}
              autoCompleteType={"username"}
              onChangeText={(v) => {
                setError(null);
                setUsername(v);
              }}
            />
          </Item>
          <Item stackedLabel error={!!error}>
            <Label>Password</Label>
            <Input
              value={password}
              autoCompleteType={"password"}
              autoCorrect={false}
              secureTextEntry={true}
              onChangeText={(v) => {
                setError(null);
                setPassword(v);
              }}
            />
          </Item>
          <Text style={{ fontSize: 12, margin: 10 }}>
            Credentials will be saved to on-device keychain. Will not be
            transmitted to server.
          </Text>
          <Button
            block
            rounded
            disabled={!isValidForm()}
            style={{ marginTop: 20 }}
            onPress={() => {
              Keyboard.dismiss();
              saveAnchorCreds(username, password).then(() => {
                alert("Saved Anchor Credentials!");
              });
            }}
          >
            <Text>Save to keychain</Text>
          </Button>
          <Button
            full
            bordered
            rounded
            style={{ marginTop: 20, borderColor: "red" }}
            onPress={() => {
              resetAnchorCreds();
              setUsername("");
              setPassword("");
              alert("Removed Anchor Credentials");
            }}
          >
            <Text style={{ color: "red" }}>Remove from keychain</Text>
          </Button>
          <Button
            full
            bordered
            rounded
            style={{ marginTop: 20, borderColor: "green" }}
            onPress={() => {
              Linking.openURL(
                "https://r.platform.allofusfinancial.com/onboarding/welcome"
              );
            }}
          >
            <Text style={{ color: "green" }}>Signup for an Anchor Account</Text>
          </Button>
          <Button
            full
            bordered
            rounded
            style={{ marginTop: 20 }}
            onPress={() => {
              navigation.goBack()
            }}
          >
            <Text>Go Back</Text>
          </Button>
        </Form>
        {/* </Content> */}
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
  price: { fontSize: 44, },
  activeText: { color: "#FFF" },
  inActiveText: { color: "#515354" },
  checkbox: { padding: 10 },
  item: {
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  itemHeader: {
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#F1EFEA",
  },
  titleUp: {
    padding: 5,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 40,
    // marginTop: 5,
    fontSize: 20,
    backgroundColor: "#CBF3EC",
  },
  titleDown: {
    padding: 5,
    borderRadius: 40,
    fontSize: 20,
    backgroundColor: "#FDDBD3",
  },
  textUp: {
    color: "#25694F",
  },
  textDown: {
    color: "#AD2B09",
    // textAlign: 'right',
  },
  title: {
    marginTop: 5,
    fontSize: 14,
    flex: 1,
    padding: 5,
  },
  headerTitle: {
    color: "#515354",
    marginTop: 5,
    fontSize: 14,
    flex: 1,
    padding: 5,
    textAlign: "center",
  },
  avatar: {
    borderRadius: 25,
    width: 50,
    height: 50,
    backgroundColor: "#25694F",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#FFF",
    // textAlign: 'right',
  },
});

export default App;
