import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text, Spinner, Badge, Icon, H1, H2, H3 } from "native-base";
import AssetChart from "./AssetChart";
import config from "../config";
import { useNavigation } from "@react-navigation/core";
import { InvestmentContext } from "../InvestmentContext";
import numeral from "numeral";

const App = ({ asset }) => {
  const [isBusy, setIsBusy] = useState(false);
  const { account } = useContext(InvestmentContext);

  const navigation = useNavigation();

  const handleBuyStock = async (quantity) => {
    try {
      const resp = await fetch(config.gqlUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          // "x-pypl-encrypted-account-number": user.uniqueId,
          "Authorization": "custom-authorized",
        },
        body: JSON.stringify({
          operationName: "createOrder",
          query: `mutation createOrder($order: OrderInput!) {
                        createOrder(order: $order) {
                          symbol
                        }
                      }`,
          variables: {
            order: {
              symbol: asset.symbol,
              qty: quantity,
              side: "buy",
              timeInForce: "day",
              type: "market",
            },
          },
        }),
      });
      const json = await resp.json();
      if (json.errors && json.errors.length > 0) {
        alert(json.errors[0].message);
      } else {
        alert(
          `Congratulations! You bought ${quantity} share of ${asset.symbol}`
        );
      }
    } catch (e) {
      alert(e.message);
    }
  };

  if (isBusy) {
    <View style={{ padding: 20 }}></View>;
  }
  return (
    <>
      <View style={{ padding: 20 }}>
        <Text style={styles.assetName}>{asset.name}</Text>
        <Text style={styles.assetSymbol}>{asset.symbol}</Text>
        <Text style={styles.price}>
          {numeral(asset.latestTradePrice).format('$0.00')}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <View
            style={asset.changeToday >= 0 ? styles.titleUp : styles.titleDown}
          >
            <Icon
              type="FontAwesome"
              style={
                asset.changeToday >= 0
                  ? { ...styles.textUp, fontSize: 16 }
                  : { ...styles.textDown, fontSize: 16 }
              }
              name={asset.changeToday >= 0 ? "arrow-up" : "arrow-down"}
            />
            <Text
              style={asset.changeToday >= 0 ? styles.textUp : styles.textDown}
            >
              {"$"}
              {numeral(asset.percentChangeToday).format('0.00')}
            </Text>
          </View>
          <View style={{ flex: 1 }}></View>
        </View>
        {/* <AssetChart symbol={asset.symbol} /> */}
      </View>
      <View
        style={{
          justifyContent: "center",
          flexDirection: "row",
          alignItems: "center",
          margin: 20,
        }}
      >
        <View style={{ flex: 1, margin: 5 }}>
          <Button
            full
            rounded
            bordered
            disabled={isBusy}
            style={{ justifyContent: "center" }}
            onPress={() => {
              alert('The Invest Team is working on this feature. Check back soon.')
            }}
          >
            {isBusy ? <Spinner color="#FFF" /> : <Text>+ Watchlist</Text>}
          </Button>
        </View>
        {account ? (
          <View style={{ flex: 1, margin: 5 }}>
            <Button
              full
              rounded
              disabled={isBusy}
              style={{ justifyContent: "center" }}
              onPress={() => {
                // setIsBusy(true)
                navigation.navigate("Order", {
                  asset,
                });
                // handleBuyStock(1)
                //     .then(() => {
                //         setIsBusy(false)
                //     })
                //     .catch(() => {
                //         setIsBusy(false)
                //     })
              }}
            >
              {isBusy ? <Spinner color="#FFF" /> : <Text>Buy</Text>}
            </Button>
          </View>
        ) : null}
      </View>
      <View style={{ margin: 10, justifyContent: "flex-start" }}>
        <H3>About {asset.name}</H3>
        <Text style={{ fontSize: 14 }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </Text>
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
  assetSymbol: { fontSize: 14, marginBottom: 10, color: "#515354" },
  price: { fontSize: 44, },
  percentChange: { fontSize: 16, },
  activeText: { color: "#FFF" },
  inActiveText: { color: "#515354" },
  titleUp: {
    // padding: 5,
    // paddingLeft: 15,
    // paddingRight: 15,
    // borderRadius: 40,
    // marginTop: 5,
    fontSize: 20,
    // backgroundColor: '#CBF3EC',
    flexDirection: "row",
  },
  titleDown: {
    // padding: 10,
    // borderRadius: 40,
    // marginTop: 5,
    fontSize: 20,
    // backgroundColor: '#FDDBD3',
    flexDirection: "row",
  },
  textUp: {
    color: "#25694F",
    // textAlign: 'right',
  },
  textDown: {
    color: "#AD2B09",
    // textAlign: 'right',
  },
});

export default App;
