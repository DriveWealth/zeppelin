import React, { useContext, useEffect, useState } from "react";
import { LogBox, RefreshControl, View } from "react-native";
import { InvestmentContext } from "../InvestmentProvider";
import Holdings from "../components/Holdings";
import Portfolio from "../components/Portfolio";
import Orders from "../components/orders";
import Trending from "../components/explore/Trending";

import NewsIcon from "../images/news.png";
import MarketIcon from "../images/market.png";
import BearIcon from "../images/bear.png";
import BullIcon from "../images/bull.png";
import EducationIcon from "../images/education.png";
import WelcomeIcon from "../images/welcome.png";

import ScrollablePage from "../components/ScollablePage";
import {
  Box,
  VStack,
} from "native-base";
import SearchHero from "../components/dashboard/search-hero";
import axios from "axios";
// import PortfolioChart from "./../components/stock-detail/portfolio_chart";
import Spacer from "../components/layout/Spacer";
import News from "../components/News";
import { AuthContext } from "../FirebaseProvider";
import { NewsContext } from "../NewsProvider";
import Footer from "../components/Footer";

// const chartImage = require("./../components/img/Chart.png");
// const logosImage = require("./../components/img/logos.png");

const InvestUser = () => {
  return (
    <>
      <Holdings />
      {/* <PortfolioChart /> */}
      {/* <Text>Gola</Text> */}
      {/* <Spacer /> */}
      <Portfolio />
      {/* <Spacer /> */}
      <Orders />
    </>
  );
};

const Dashboard = ({ navigation, route }) => {
  const {
    account,
    dispatch,
    fetchAccount,
    fetchMarketData,
    fetchPortfolioHistory,
    fetchOrders,
    fetchPositions,
    fetchAsset,
  } = useContext(InvestmentContext);

  const { searchNews } = useContext(NewsContext);

  const { user } = useContext(AuthContext);

  // console.log(account, '<<<<account')
  const onButtonPress = () => {
    navigation.navigate("Onboarding");
  };

  const handleOnStockSymbolPress = (symbol) => {
    // fetchAsset(symbol, "DW_USER_ID")
    // Let us not wait around. Let us traverse and put a spinner on the next screen.
    navigation.navigate("Order", { symbol });
  };

  // useEffect(() => {
  //   onRefresh();
  //   // console.log('Dashboard MOUNTED?????')
  // }, []);

  // if (typeof account === 'undefined') {
  //   return (
  //     <Center safeArea style={{backgroundColor: 'white'}}>
  //       <Box style={{marginTop: 20}} w="100%" h="100%">
  //         <Spinner />
  //       </Box>
  //     </Center>
  //   );
  // }

  const onRefresh = React.useCallback(() => {
    console.log("Refreshed!!");

    if (!user) return;
    fetchAccount();
    // fetchPortfolioHistory();
    // fetchOrders();
    fetchPositions();
    // fetchMarketData();
    searchNews("Stock Market");
  }, []);

  return (
    <>
      <VStack safeArea={true} p={3} flex="1">
        {/* <Box m="3">
          <Header user={user} account={account} />
        </Box> */}

        {user && user.uid && (
          <Box my="3" style={{ zIndex: 1 }}>
            <SearchHero onStockSymbolPress={handleOnStockSymbolPress} />
          </Box>
        )}

        {/* {account.data && (
          <Box m="3">
            <InvestUser />
          </Box>
        )} */}
        {/* <Spacer /> */}
        {/* <Trending /> */}
        {/* <Spacer /> */}
        {/* <Box my="3">
          {user === null && (
            <Box my="3">
              <Button
                onPress={() => {
                  navigation.navigate("Login");
                }}
              >
                Login
              </Button>
            </Box>
          )}
        </Box> */}
      </VStack>
      {/* <News /> */}
      <Footer navigation={navigation} page="Trade" />
    </>
  );
};

export default Dashboard;
