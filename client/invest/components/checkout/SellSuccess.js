import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import {
  Button,
  Text,
  Spinner,
  ListItem,
  CheckBox,
  Body,
  H2,
  Icon,
  Badge,
  IconButton,
  CloseIcon,
  VStack,
  Center,
} from "native-base";

import { InvestmentContext } from "../../InvestmentContext";
import { UIContext } from '../UIContext'


const App = ({ route, navigation }) => {
  const { asset, orderDetails } =
    useContext(InvestmentContext);
  const {handleClose} = useContext(UIContext)

  return (
    <>
      <VStack mb="3" space={4} alignItems="center">
        <Center w="64" h="20" rounded="md" shadow={3} style={{marginTop: 20}}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {asset.symbol}
            </Text>
          </View>
        </Center>
        <Center w="64" h="20"  rounded="md" shadow={3}>
          {`Congratulations on your ${asset.symbol} sale!`}
        </Center>
        <Center w="64" h="20"  rounded="md" shadow={3}>
        <Text style={[styles.inActiveText, {fontSize: 14, marginTop: 10, textAlign: 'center'}]}>
        {`You sold ${orderDetails.numberOfShares} share(s) of ${asset.symbol}`}
      </Text>
        </Center>
      </VStack>
      
      <View style={{ flex: 1, padding: 40, justifyContent: "flex-end" }}>
        <Button rounded="full" bgColor="blue.800" py="2.5"
          onPress={() => {
            handleClose();
            setTimeout(navigation.popToTop, 1000)
          }}
        >
          <Text
            style={{
              color: "#FFF",
              fontSize: 16,
            }}
          >
            Done
          </Text>
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
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  price: { fontSize: 44, },
  activeText: { color: "#FFF" },
  inActiveText: { color: "#515354" },
  checkbox: { padding: 10 },
  item: {
    // marginVertical: 8,
    // justifyContent: 'center',
    padding: 10,
    alignItems: "center",
    flexDirection: "row",
    height: 70,
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
  subTitle: {
    // marginTop: 5,
    fontSize: 12,
    flex: 1,
    padding: 5,
    marginLeft: 5,
    color: "#515354",
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
    borderRadius: 40,
    width: 80,
    height: 80,
    backgroundColor: "#25694F",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#FFF",
    fontSize: 22,
    // textAlign: 'right',
  },
});

export default App;
