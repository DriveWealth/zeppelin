import React, { useContext } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  Text,
  Spinner,
  VStack,
} from "native-base";
import { InvestmentContext } from "../../InvestmentProvider";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";

import EmptyMessage from "../EmptyMessage";

const ORDER_STATUSES = {
  '0': 'New',
  '1': 'Partial Fill',
  '2': 'Filled',
  '4': 'Canceled',
  '8': 'Rejected',
}

const getColorForStatus = (status) => {
  switch (status) {
    case "0": {
      return "blue";
    }
    case "1": {
      return "orange";
    }
    case "2": {
      return "green";
    }
    case "4": {
      return "red";
    }
    default: {
      return "red";
    }
  }
};

const Item = ({ orderID, symbol, orderQty, side, orderStatus, createdWhen }) => (
  // <TouchableOpacity
  //   onPress={() => {
  //     // handleTap({ symbol })
  //   }}
  // >
    <View style={styles.item}>
      <View style={{ flex: 2 }}>
        <Text style={{textAlign: 'left'}}>
          {symbol}
        </Text>
      </View>
      <View style={{ flex: 1 }}>
      <Text style={{textAlign: "right", }}>
        {orderQty}
      </Text>
      </View>
      <View style={{ flex: 1, }}>
        {/* <Text style={{textAlign: "center", }}>{side.toUpperCase()}</Text> */}
        <Side side={side} style={{textAlign: "center", }} />
      </View>
      <View style={{ flex: 1,  }}>
        <Text
          style={{
            fontSize: 10,
            color: getColorForStatus(orderStatus.toUpperCase()),
            textAlign: 'center', 
          }}
        >
          {ORDER_STATUSES[orderStatus].toUpperCase()}
        </Text>
      </View>
      <View style={{ flex: 2,}}>
        <Text style={[styles.title, { textAlign: "right",  }]}>
          {moment(createdWhen).format("MMM Do YY")}
        </Text>
      </View>
    </View>
  // </TouchableOpacity>
);

const ListHeader = () => (
  <View style={styles.itemHeader}>
    {/* <View style={[styles.avatar, {opacity: 0, flex: 1}]}>
            <Text style={styles.avatarText}>{'Symbol'}</Text>
        </View> */}
    <View style={{flex: 2,}}><Text style={{textAlign: 'left', }}>{"Symbol"}</Text></View>
    <View style={{flex: 1,}}><Text style={{textAlign: 'right',}}>{"Qty"}</Text></View>
    <View style={{flex: 1,}}><Text style={{textAlign: 'center',}}>{"Side"}</Text></View>
    <View style={{flex: 1,}}><Text style={{textAlign: 'center',}}>{"Status"}</Text></View>
    <View style={{flex: 2}}><Text style={{ flex: 2, textAlign: "right", }}>
      {"Created"}
    </Text></View>
    
    
    {/* <Text style={styles.title}>{moment(createdAt).format('lll')}</Text> */}
  </View>
);

const Side = ({side, style}) => {
  switch (side.toUpperCase()) {
    case 'B': {
      return <Text style={style}>Buy</Text>
    }
    case 'S': {
      return <Text style={style}>Sell</Text>
    }
    default: {
      return <Text style={style}>{side}</Text>
    }
  }
  return 
}

const App = () => {
  const { orders, fetchOrders } = useContext(InvestmentContext);
  const navigation = useNavigation();
  const handleTap = ({ symbol }) => {
    // navigation.navigate('Search', {
    //     symbol
    // })
  };

  // useEffect(() => {
  //   fetchOrders();
  //   // const unsubscribe = navigation.addListener('focus', () => {
  //   //     fetchAccount()
  //   // });

  //   // // Return the function to unsubscribe from the event so it gets removed on unmount
  //   // return unsubscribe;
  // }, []);

  const renderItem = ({ item }) => {
    return <Item {...item} handleTap={handleTap} key={item.id} />;
  };

  const goBack = () => {
    navigation.goBack();
  };

  if (!orders) {
    return (
      <>
        <Spinner />
      </>
    );
  }

  return (
    <VStack mt="4">
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
        Pending Orders
      </Text>
      {orders.data && orders.data.length < 1 ? (
        <EmptyMessage
          title={"No pending orders."}
          // subTitle={
          //   "When you buy or sell stocks, you will see them as orders here."
          // }
        />
      ) : (
        <VStack
          // keyExtractor={(item) => item.orderID}
          
          // style={{ margin: 5, padding: 10, paddingTop: 0 }}
          // ListHeaderComponent={ListHeader}
        >
          {orders.status === 'loading' && <Text textAlign={'center'}>Loading</Text>}
          { 
            orders.data && orders.data.sort((a, b) => b.updateAt > a.updateAt).map(order => {
              return <Item {...order} key = {order.orderID}/>
            })
          }
        </VStack>
      )}
    </VStack>
  );
};

const styles = StyleSheet.create({
  assetName: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
    color: "#515354",
  },
  price: { fontSize: 44,  },
  activeText: { color: "#FFF" },
  inActiveText: { color: "#515354" },
  checkbox: { padding: 10 },
  item: {
    marginTop: 5,
    marginBottom: 5,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    // padding: 5,
  },
  itemHeader: {
    marginTop: 5,
    marginBottom: 5,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#F1EFEA",
    // padding: 5
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
    // marginTop: 5,
    // fontSize: 14,
    // flex: 1,
    // padding: 5,
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
