import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  Button,
  Text,
  Spinner,
  ListItem,
  CheckBox,
  Body,
  H3,
} from "native-base";
import {DWContext} from '../../DWProvider'
import BackButton from "../BackButton";

const CheckControl = ({ title }) => {
  const [isSelected, setIsSelected] = useState(false);
  useEffect(() => {
    navigation.setOptions({
      title: ``,
      headerLeft: () => <BackButton {...{ navigation }} />,
    });
  }, []);
  return (
    <>
      <ListItem
        onPress={() => {
          setIsSelected(!isSelected);
        }}
      >
        <View
          style={{
            flexDirection: "row",
            width: 80,
            justifyContent: "space-around",
          }}
        >
          <View>
            <CheckBox style={styles.checkbox} checked={isSelected} />
            <Text>Yes</Text>
          </View>
          <View>
            <CheckBox style={styles.checkbox} checked={!isSelected} />
            <Text>No</Text>
          </View>
        </View>

        <Body>
          <Text>{title}</Text>
        </Body>
      </ListItem>
    </>
  );
};

const App = ({ navigation }) => {
  const { user } = useContext(DWContext);
  return (
    <>
      <View style={{ alignItems: "center", padding: 20 }}>
        <Text style={{ fontSize: 16 }}>Disclosures</Text>
      </View>

      <CheckControl title={`Are you ${user.firstName} ${user.lastName}?`} />
      <CheckControl title="Are you affiliated with FINRA or any Exchange?" />
      <CheckControl title="Are you politically exposed?" />
      <CheckControl title="Is an immediate family member exposed?" />

      <View
        style={{ position: "absolute", bottom: 20, width: "100%", padding: 20 }}
      >
        <Button
          style={{ borderRadius: 20 }}
          full
          onPress={() => {
            navigation.navigate("Agreements");
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
  price: { fontSize: 44, },
  activeText: { color: "#FFF" },
  inActiveText: { color: "#515354" },
  checkbox: { padding: 10 },
});

export default App;
