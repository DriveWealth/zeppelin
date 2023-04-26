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
  CloseIcon,
  IconButton,
} from "native-base";

import { InvestmentContext } from "../../InvestmentContext";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";

import EmptyMessage from "../EmptyMessage";
import Invest from "../Invest";
import {UIContext} from "../UIContext";

const Item = ({
  handleTap,
  uniqueId,
  bank,
  accountType,
  accountNumberPartial,
}) => (
  <TouchableOpacity
    onPress={() => {
      handleTap(uniqueId);
    }}
  >
    <View style={styles.item}>
      {/* <View style={{flex: 1}}>
            <View style={styles.avatar}>
                <Text style={styles.avatarText}>{symbol.substring(0, 1)}</Text>
            </View>
            </View> */}
      <View>
        <Image
          source={{ uri: bank.smallImage.url }}
          style={{ width: 40, height: 24 }}
        />
      </View>
      <View>
        <Text
          style={
            {
              flex: 2,
              marginLeft: 10,
              fontSize: 16,
              padding: 2,
              justifyContent: "center",
              alignItems: "center",
            }
          }
        >
          {bank.shortName}
        </Text>

        <Text style={
            {
              flex: 2,
              padding: 2,
              marginLeft: 10,
              fontSize: 14,
              justifyContent: "center",
              alignItems: "center",
            }
          }>
          {`${accountType.name} ****${accountNumberPartial}`}
        </Text>
      </View>
      {/* <Text style={[styles.title], {flex: 2, marginLeft: 10, justifyContent: 'center', alignItems: 'center',}}>{bank.shortName}</Text> */}
      {/* <Text style={[styles.title], {flex: 1, textAlign: 'center', justifyContent: 'center', alignItems: 'center',}}>{qty}</Text> */}
    </View>
  </TouchableOpacity>
);


const App = ({ route }) => {
  const [instruments, setInstruments] = useState();
  // const { fetch: pyplFetch } = useContext(DWContext);
  const { dispatch, idToken } = useContext(InvestmentContext);
  const {handleClose} = useContext(UIContext)
  const navigation = useNavigation();

  useEffect(() => {
    const getBankDetails = async () => {
      // try {
      //   const resp = await pyplFetch("/v1/mfsconsumer/wallet/@me/bank-account");
      //   const details = await resp.json();
      //   const banks = details.artifacts.filter((a) => {
      //     return a.objectType === "BankAccount";
      //   });
      //   setInstruments(banks);
      // } catch (e) {
      //   // alert(e.message);
      //   console.log(e)
      //   alert('Could not get instruments')
      // }
    };
    getBankDetails();
  }, [idToken]);

  const goBack = () => {
    navigation.goBack();
  };

  // if (!instruments) {
  //   return (
  //     <>
  //       <Spinner />
  //     </>
  //   );
  // }

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          height: 80,
          // backgroundColor: 'red',
        }}
      >
        <Text style={{
            fontSize: 16,
            color: "black",
            fontWeight: "bold",
          }}>Choose a payment method</Text>
      </View>
      
      {
        <FlatList
          data={instruments}
          renderItem={({ item }) => {
            return (
              <Item
                {...item}
                handleTap={() => {
                  dispatch({
                    type: "set_instrument",
                    instrument: item,
                  });
                  navigation.navigate("Review");
                }}
                key={item.id}
              />
            );
          }}
          keyExtractor={(item) => item.uniqueId}
          style={{ paddingTop: 0 }}
          // ListHeaderComponent={ListHeader}
        />
      }
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
    // marginVertical: 8,
    // justifyContent: 'center',
    padding: 10,
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
  title: {
    marginTop: 5,
    fontSize: 16,
    flex: 1,
    padding: 5,
  },
  subTitle: {
    // marginTop: 5,
    fontSize: 16,
    flex: 1,
    // padding: 5,
    // marginLeft: 5,
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
