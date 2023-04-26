import React, { useEffect, useContext, useState, useRef } from "react";
import { View, Keyboard } from "react-native";
import { Item, Icon, Input, Button } from "native-base";

import Asset from "./Asset";
import config from "../config";

import { InvestmentContext } from "./InvestmentContext";

const App = ({ route }) => {
  const { asset } = useContext(InvestmentContext);
  const [symbol, setSymbol] = useState("");

  const handleSearchClick = async (symbol) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "da2-ptdczcs36rc3riyft3mkl3inzq",
      },
      body: JSON.stringify({
        query: `query {
              news(symbol: "${symbol}") {
                  headline
                  publishTime
              }
          }
          `,
        variables: {},
      }),
      redirect: "follow",
    };

    try {
      const response = await fetch(config.gqlUrl, requestOptions);
      const json = await response.json();
      console.log(json);
    } catch (err) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    if (route.params && route.params.symbol) {
      handleSearchClick(route.params.symbol);
      setSymbol(route.params.symbol);
    }
  }, []);

  return (
    <>
      <View style={{ margin: 5, marginTop: 20, flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <Item rounded>
            <Input
              w={{
                base: "75%",
                md: "25%",
              }}
              InputLeftElement={
                <Icon
                  as={<MaterialIcons name="person" />}
                  size={5}
                  ml="2"
                  color="muted.400"
                />
              }
              placeholder="Search stocks or ETFs"
              onChangeText={(v) => setSymbol(v.toUpperCase())}
              value={symbol}
            />

            {/* <Input
              ref={searchBox}
              placeholder="Search stocks or ETFs"
              onChangeText={(v) => {
                setSymbol(v.toUpperCase());
              }}
              value={symbol}
            /> */}
          </Item>
        </View>

        <View style={{ justifyContent: "center", padding: 5 }}>
          <Button
            style={{ borderRadius: 10 }}
            onPress={() => {
              Keyboard.dismiss();
              handleSearchClick(symbol);
            }}
          >
            <Icon type="FontAwesome" style={{ fontSize: 18 }} name="search" />
          </Button>
        </View>
      </View>

      {/* {asset ? <Asset asset={{ ...asset }} /> : null} */}
    </>
  );
};

export default App;
