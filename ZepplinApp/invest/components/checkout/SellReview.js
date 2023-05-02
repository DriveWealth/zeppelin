import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
} from "react-native";
import {
  Button,
  Text,
} from "native-base";

import { InvestmentContext } from "../../InvestmentContext";
import numeral from "numeral";


const SEC_CONTEXT = {
	"version": "1.2",
	"actor": {
		"client_id": "walletnativeclientstage2",
		"id": "270895",
		"auth_claims": ["CLIENT_ID_SECRET"],
		"auth_state": "LOGGEDIN",
		"account_number": "1280789284731187892",
		"encrypted_account_number": "45KGUULX5M4F2",
		"party_id": "1844103966100357565",
		"user_type": "API_CALLER",
		"tenant_context": {
			"tenant_name": "PayPal",
			"tenant_id": "21baipwe-44fs-70sd-11c119211s3P"
		},
		"legal_country": "US"
	},
	"auth_token": "A005G2jgCYiRDLW6oV25FYhbkymVj6PWlAZcoWi23lPBgkM",
	"auth_token_type": "ACCESS_TOKEN",
	"global_session_id": "Ic06ef15c-3d23-4ab2-a7d5-fc1c9b636728",
	"last_validated": 1.570453553E9,
	"client_id": "walletnativeclientstage2",
	"claims": {
		"subject_payer_id": "45KGUULX5M4F2",
		"actor_payer_id": "A5MT6K24NFZ3A",
		"internal_application": "true",
		"consent_id": "XpIBBqoBsOjVJHdB4aS5iZZhkofTF2txLBZrF4exndU"
	},
	"subjects": [{
		"subject": {
			"public_credential": "account-1570453505705@paypal.com",
			"id": "717885912",
			"auth_claims": ["USERNAME", "PASSWORD"],
			"auth_state": "LOGGEDIN",
			"account_number": "2103291767033832322",
			"encrypted_account_number": "45KGUULX5M4F2",
			"party_id": "2103291767033832322",
			"authenticating_user": true,
			"user_type": "CONSUMER",
			"legal_country": "IN"
		},
		"features": []
	}],
	"signature": "eyJraWQiOiJhdXRoX3NlY3VyaXR5X2NvbnRleHRfc2lnbl9rZXkiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOiIxNTcwNDUzNTU2IiwiZXhwIjoiMTU3MDQ4MjM1NiIsInNoYTI1Nl9kaWdlc3QiOiJwNzRsN25PNnExbkZWQ3JyVjNKSk1QdHF0YU5QRkNLMGFkdUNMOXhfY2VvIn0.psOgpg6OAfeO0JLr4CZC3zWaEkDaUWhRbzd4rw2d78NUn-d2GHTj0RSDmb3wh4buceusjuW7_edIodShLXvRXTooIp3nQm4DDlff9zNOEZy9fqukbVScl3pC6lKjPE-d4nZJ3sKgCSA-gBKR95Sr5rqi0qDUltR_zCsWXIrdRvQ"
}

const SelectedInstrument = ({
  uniqueId,
  bank,
  accountType,
  accountNumberPartial,
}) => (
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
      {/* <Text
        style={
          ([styles.title],
          {
            flex: 2,
            marginLeft: 10,
            justifyContent: "center",
            alignItems: "center",
          })
        }
      >
        {bank.shortName}
      </Text> */}

      <Text style={styles.subTitle}>
        {`${accountType.name} ****${accountNumberPartial}`}
      </Text>
    </View>
    {/* <Text style={[styles.title], {flex: 2, marginLeft: 10, justifyContent: 'center', alignItems: 'center',}}>{bank.shortName}</Text> */}
    {/* <Text style={[styles.title], {flex: 1, textAlign: 'center', justifyContent: 'center', alignItems: 'center',}}>{qty}</Text> */}
  </View>
);


const ListHeader = () => <View style={styles.itemHeader}></View>;

const App = ({ route, navigation }) => {
  const {createOrder} = useContext(InvestmentContext)

  const [isBusy, setIsBusy] = useState(false)
  const { asset, instrument, anchorIdToken, orderDetails } =
    useContext(InvestmentContext);

  const handleSellStock = async () => {
    try {
      await createOrder({
        symbol: asset.symbol,
        qty: orderDetails.numberOfShares,
        side: 'Sell',
      });
    } catch (e) {
      alert(e.message)
    }
  };

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          height: 60,
        }}
      >
        <Text style={{
            fontSize: 16,
            color: "black",
            fontWeight: "bold",
          }}>Review and Sell</Text>
      </View>
      <View style={styles.itemRow}>
        <Text>You are selling</Text>
        <Text>{`${orderDetails.numberOfShares} ${asset.symbol}`}</Text>
      </View>
      {/* <View
        style={styles.itemRow}
      >
        <Text>Exchange Rate</Text>
        <Text>{`${asset.latestTradePrice} USD = 1 ${asset.symbol}`}</Text>
      </View> */}
      <View style={styles.itemRow}>
        <Text>Price</Text>
        <Text>{numeral(asset.latestTradePrice).format("$0.00")}</Text>
      </View>
      <View style={styles.itemRow}>
        <Text>Transaction Fee</Text>
        <Text>$0.00</Text>
      </View>
      <View style={styles.itemRow}>
        <Text>You get</Text>
        <Text>
          {numeral(asset.latestTradePrice * orderDetails.numberOfShares).format(
            "$0.00"
          )}
        </Text>
      </View>
      <View style={styles.itemRow}>
        <Text style={styles.subTitle}>
          Exchange rate includes a currency conversion spread and refreshes
          frequently. Order summary
        </Text>
      </View>
      <View style={{ flex: 1, padding: 40, justifyContent: "flex-end" }}>
        <Button rounded="full" bgColor="blue.800" py="2.5"
          disabled={isBusy}
          onPress={() => {
            setIsBusy(true)
            handleSellStock().then(() => {
              navigation.navigate('Success')
              setIsBusy(false)
            })
          }}
        >
          <Text
            style={{
              color: "#FFF",
              fontSize: 16,
            }}
          >
            Sell Now
          </Text>
        </Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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
    padding: 10,
    alignItems: "center",
    flexDirection: "row",
    height: 70,
  },
  title: {
    marginTop: 5,
    fontSize: 14,
    flex: 1,
    padding: 5,
  },
  subTitle: {
    // marginTop: 5,
    fontSize: 16,
    flex: 1,
    padding: 5,
    marginLeft: 5,
    color: "#515354",
  }
});

export default App;
