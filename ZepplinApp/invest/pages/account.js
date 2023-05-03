import React, { useContext, useEffect, useState } from "react";
import { useFocusEffect } from '@react-navigation/native';

import { LogBox, RefreshControl, View } from "react-native";
import { InvestmentContext } from "../InvestmentProvider";
import Holdings from "./../components/Holdings";
import Portfolio from "./../components/Portfolio";
import Orders from "./../components/orders";

import ScrollablePage from "../components/ScollablePage";
import {
  Box,
  Center,
  Text,
  VStack,
  ScrollView,
  HStack,
  Content,
  Divider,
  FlatList,
  InfoIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  Image,
  Heading,
  ZStack,
  Button,
  Spinner,
  Container,
  useTheme,
} from "native-base";
import SearchHero from "../components/dashboard/search-hero";
import axios from "axios";
// import PortfolioChart from "./../components/stock-detail/portfolio_chart";
import Spacer from "../components/layout/Spacer";
import News from "../components/News";
import { AuthContext } from "../FirebaseProvider";
import { NewsContext } from "../NewsProvider";
import Footer from "../components/Footer";

const DWImage = require("../images/ZeppelinLogo.png");

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

const Account = ({ navigation, route }) => {
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

  const { user } = useContext(AuthContext);

  const onRefresh = React.useCallback(() => {
    if (!user) return;
    fetchAccount();
    // fetchPortfolioHistory();
    fetchOrders();
    fetchPositions();

    // fetchMarketData();
    // searchNews("Stock Market");
  }, []);

  useFocusEffect(onRefresh);

  return (
    <>
      <VStack safeArea={true} p={3} flex="1">
        <Center>
        <Image source={DWImage} w="100" h="100">

        </Image>
        </Center>
        {account.status === 'success' && !account.data && (
          <Box my="3">
            <Text style={{padding: 20, textAlign: 'center'}}>Let us get you setup with an account to start Trading. </Text>
            <Button
              onPress={() => {
                navigation.navigate("Onboarding");
              }}
            >
              Create Account
            </Button>
          </Box>
        )}
      <ScrollablePage onRefresh={onRefresh}>
        {/* <Box m="3">
          <Header user={user} account={account} />
        </Box> */}

        {/* {user && user.uid && (
          <Box my="3" style={{ zIndex: 1 }}>
            <SearchHero onStockSymbolPress={handleOnStockSymbolPress} />
          </Box>
        )} */}
        

        {account.data && (
          <Box m="3">
            <InvestUser />
          </Box>
        )}
        
        </ScrollablePage>
      </VStack>
      
      {/* <News /> */}
      <Footer navigation={navigation} page="Account" />
    </>
  );
};

export default Account;
