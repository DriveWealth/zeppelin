import React, { useContext, useEffect } from "react";
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  StatusBar,
  Image,
} from "react-native";
import { InvestmentContext } from "./InvestmentContext";
import { useNavigation } from "@react-navigation/native";
import { Button, Text } from "native-base";
import numeral from "numeral";
import BackButton from "./BackButton";

const Item = ({
  symbol,
  marketValue,
  changeToday,
  qty,
  currentPrice,
  lastdayPrice,
  handleTap,
}) => (
  <TouchableOpacity
    onPress={() => {
      handleTap({ symbol });
    }}
  >
    <View style={styles.item}>
      <Text style={[styles.title, { flex: 3 }]}>{symbol}</Text>
      {/* <Text style={[styles.title, {textAlign: 'left', flex: 1}]}>{qty}</Text> */}
      <View style={changeToday > 0 ? styles.titleUp : styles.titleDown}>
        <Text
          style={changeToday > 0 ? styles.textUp : styles.textDown}
        >{numeral(marketValue).format('$0.00')}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const App = () => {
  // const { positions } = useContext(InvestmentContext); // CHANGED
  const positions = [
    {
      symbol: 'META', 
      name: 'Meta', 
      marketValue: 22, 
      percentChangeToday: 5, 
      changeToday: 3,
      currentPrice: 20, 
      lastdayPrice: 15,
    },
    {
      symbol: 'NFLX', 
      name: 'Netflix', 
      marketValue: 22, 
      percentChangeToday: 5, 
      changeToday: 3,
      currentPrice: 20, 
      lastdayPrice: 15,
    },
    {
      symbol: 'AAA', 
      name: 'Netflix', 
      marketValue: 22, 
      percentChangeToday: 5, 
      changeToday: 3,
      currentPrice: 20, 
      lastdayPrice: 15,
    },
    {
      symbol: 'BBB', 
      name: 'Netflix', 
      marketValue: 22, 
      percentChangeToday: 5, 
      changeToday: 3,
      currentPrice: 20, 
      lastdayPrice: 15,
    },
    {
      symbol: 'CCC', 
      name: 'Netflix', 
      marketValue: 22, 
      percentChangeToday: 5, 
      changeToday: 3,
      currentPrice: 20, 
      lastdayPrice: 15,
    },
    {
      symbol: 'DDD', 
      name: 'Netflix', 
      marketValue: 22, 
      percentChangeToday: 5, 
      changeToday: 3,
      currentPrice: 20, 
      lastdayPrice: 15,
    },
  ]

  const navigation = useNavigation();
  const handleTap = ({ symbol }) => {
    // navigation.navigate("Search", {
    //   symbol,
    // });
  };

  useEffect(() => {
    navigation.setOptions({
      title: ``,
      headerLeft: () => <BackButton {...{ navigation }} />,
    });
}, [])

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
  return (
    <View style={{ padding: 20 }}>
      <Text
        style={{
          fontSize: 16,
          marginTop: 10,
          marginBottom: 10,
          color: "#515354",
        }}
      >
        Your stocks and ETF
      </Text>
      {positions.map((item, i) => {
        //   console.log(item)
        return (
          <Item key={`${item.symbol}-${i}`} {...item} handleTap={handleTap} />
        );
      })}
    </View>
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
    // marginTop: 5,
    fontSize: 20,
    backgroundColor: "#FDDBD3",
  },
  textUp: {
    color: "#25694F",
    // textAlign: 'right',
  },
  textDown: {
    color: "#AD2B09",
    // textAlign: 'right',
  },
  title: {
    marginTop: 5,
    fontSize: 20,
  },
});

export default App;
