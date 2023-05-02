import React, { useEffect, useContext, useState, useRef } from "react";
import { View, Keyboard } from "react-native";
import { Item, Icon, Input, Button } from "native-base";

import { InvestmentContext } from "./InvestmentContext";

const App = ({ route }) => {
  const { asset } = useContext(InvestmentContext);
  const [symbol, setSymbol] = useState("");

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

    </>
  );
};

export default App;
