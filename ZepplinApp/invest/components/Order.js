import React, { useEffect, useContext, useState, useRef } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  Animated,
} from "react-native";
import { H2, H1, Item, Icon, Input, Button, Form, Label, ArrowBackIcon, IconButton } from "native-base";

import { InvestmentContext } from "../InvestmentContext";
import StockDetail from "../pages/stock-detail";

const currency = {
  USD: "$",
};

const App = ({ route, navigation }) => {
  const { dispatch, asset } = useContext(InvestmentContext);
  const [browserHeight, setBrowserHeight] = useState(500);
  const [animatedValue, setAnimatedValue] = useState(() => {
    return new Animated.Value(0);
  });
  const [isReviewing, setIsReviewing] = useState(false);

  const [numberOfShares, setNumberOfShares] = useState("1");

  useEffect(() => {
    navigation.setOptions({
      title: `Buy ${asset.symbol}`,
      headerLeft: () => (
        <IconButton
          icon={<ArrowBackIcon size="5" mt="0.5"/>}
          borderRadius="full"
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
    });
  }, []);

  const handleOpen = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      //   setIsReviewing(!isReviewing);
    });
  };

  const handleClose = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      // setIsReviewing(!isReviewing);
    });
  };

  return (
    <>
     <View style={{ flex: 1, padding: 20 }}>
        <StockDetail />
        {/* <View style={{ height: 200, justifyContent: "center" }}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {asset.symbol.substring(0, 1)}
            </Text>
          </View>
        </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Item style={{ padding: 10 }}>
            <Input
              style={{ fontSize: 44, }}
              value={numberOfShares}
              //   defaultValue={numberOfShares}
              onChangeText={(v) => {
                setNumberOfShares(v);
              }}
            />
            <Button transparent light>
              <Text>Shares</Text>
            </Button>
          </Item> */}
        </View>
      <Animated.View
        style={{
          transform: [
            {
              translateY: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [browserHeight, 0],
              }),
            },
          ],
          position: "absolute",
          backgroundColor: "#FFF",
          height: browserHeight,
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        {/* <Checkout handleClose={handleClose} /> */}
      </Animated.View>
    </>
  );
};

export default App;
