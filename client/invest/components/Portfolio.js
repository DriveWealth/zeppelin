import React, { useContext } from "react";
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  StatusBar,
  Image,
  Text,
} from "react-native";
import { InvestmentContext } from "../InvestmentProvider";
import { useNavigation } from "@react-navigation/native";
import numeral from "numeral";
import * as flexbox from "./../styles/flexbox.js";
import { HStack, VStack } from "native-base";
const backButtonImage = require("./../images/arrow_left.png");
const arrowDown = require("./../images/arrow_down.png");
const arrowUp = require("./../images/arrow_up.png");

const App = () => {
  const { positions } = useContext(InvestmentContext);

  const navigation = useNavigation();
  const handleTap = ({ symbol }) => {
    // navigation.navigate("Search", {
    //   symbol,
    // });
    navigation.navigate("Watchlist", {
      screen: "PortfolioDetail",
    });
  };

  const renderItem = ({ item }) => {
    return <Item {...item} handleTap={handleTap} />;
  };

  if (!positions) {
    return null;
  }
  if (positions && positions.length === 0) {
    return null;
    // return <NoPositions handlleSearchPress={handlleSearchPress} />
  }

  // console.log(positions, "<< positions in ui");
  // console.log(positions)
  const Item = ({
    symbol,
    changeToday,
    availableForTradingQty,
    currentPrice,
    lastdayPrice,
    handleTap,
    title,
    marketValue,
    unrealizedDayPL,
    logoImg,
  }) => (
    <HStack style={{ flexDirection: "row", marginTop: 5, marginBottom: 5 }}>
      <View style={{ flex: 2, }}>
        <Text>{symbol}</Text>
      </View>
      <View style={{ flex: 1, }}>
        <Text style={{ textAlign:'right' }}>{availableForTradingQty}</Text>
      </View>
      <View style={{ flex: 3, alignItems:'flex-end', }}>
        {unrealizedDayPL > 0 ? (
          <HStack>
            <Image source={arrowUp} style={{ height: 17, width: 17 }} />
            <Text style={styles.textUp}>
              {numeral(unrealizedDayPL).format("$0.00")}
            </Text>
          </HStack>
        ) : (
          <HStack>
            <Image source={arrowDown} style={{ height: 17, width: 17 }} />
            <Text style={styles.textDown}>
              {numeral(unrealizedDayPL).format("$0.00")}
            </Text>
          </HStack>
        )}
      </View>
      <View style={{ flex: 3, }}>
        <Text
          style={{
            fontSize: 14,
            textAlign: "left",
            marginTop: 2.5,
            flex: 1,
            textAlign: 'right',
          }}
        >
          {numeral(marketValue).format("$0.00")}
        </Text>
      </View>
    </HStack>
  );

  return (
    <VStack mt="5">
      <Text
        style={{
          fontSize: 20,
          color: "#515354",
          textAlign: 'center',
          fontWeight: 'bold',
          width: "100%",
          textAlign: "left",
          marginBottom: 10
        }}
      >
        Positions
      </Text>
      {positions.status === 'loading' && <Text>Loading</Text>}
      {positions.data && positions.data.equityPositions
        // .filter((p) => p.symbol !== "USD" && p.qty > 0)
        .map((item, i) => {
          return (
            <Item key={`${item.symbol}-${i}`} {...item} handleTap={handleTap} />
          );
        })}
    </VStack>
  );
};

const styles = StyleSheet.create({
  item: {
    marginVertical: 8,
    marginHorizontal: 4,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    // backgroundColor: 'red'
  },
  titleUp: {
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 40,
    // marginTop: 5,
    fontSize: 20,
    backgroundColor: "#CBF3EC",
  },
  titleDown: {
    padding: 5,
    borderRadius: 40,
    // marginTop: 5,
    fontSize: 20,
    backgroundColor: "#FDDBD3",
  },
  textUp: {
    color: "#25694F",
    textAlign: 'right',
  },
  textDown: {
    color: "#AD2B09",
    textAlign: "right",
  },
  title: {
    marginTop: 5,
    fontSize: 20,
  },
});

export default App;
