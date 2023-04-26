import React, { useState, useEffect, useContext } from "react";
import BackButton from "./../components/BackButton";

import {
  Box,
  VStack,
  Divider,
  ScrollView,
  Pressable,
  Text,
  ArrowBackIcon,
  HStack,
  Center,
  Progress,
} from "native-base";

import StockDetailHistoricalLineChart from "../components/stock-detail/historical-line-chart";
import _ from "lodash"

import config from "../config";
import numeral from "numeral";
import { InvestmentContext } from "../components/InvestmentContext";

const StockStats = ({ route, navigation }) => {
  
  const {asset} = useContext(InvestmentContext);
  const stockSymbol = asset.symbol;

  if (!stockSymbol) throw new Error("Couldn't find stock symbol in route");

  useEffect(() => {
    navigation.setOptions({
      title: ``,
      headerLeft: () => <BackButton {...{ navigation }} />,
      headerShown: false,
    });
  }, [])

  const [data, setData] = useState({});

  // TODO: create class wrapper for this
  // TODO: add GQL lib to make queries work nicer
  const getStockDetails = async (symbol) => {
    const resp = await fetch(config.gqlUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-api-key": config.apiKey,
      },
      body: JSON.stringify({
        operationName: "getStockStats",
        query: `
          query getStockStats {
            security(symbol: "${symbol}") {
              ... on Stock {
                company {                  
                  financials {
                    dividendYield
                    netProfit
                    grossProfit
                    annualRevenueGrowth
                    companyValue
                    peRatio
                    marketCap 
                  }
                }
              }
            }
          }`,
      }),
    });

    return resp.json();
  };

  useEffect(() => {
    const update = async () => {
      const details = await getStockDetails(stockSymbol);
      setData(details.data.security.company.financials);
    };

    update();
  }, [stockSymbol]);

  return (
    <Center safeArea style={{backgroundColor: "white"}}>
    <VStack w="100%" h="100%">
      <Box m="3">
        <HStack justifyContent="space-between">
          <Box>
            <Pressable onPress={ navigation.goBack }>
              <ArrowBackIcon size="5" />
            </Pressable>
          </Box>

          <Box>
            <Center>
              <Text fontSize="lg">{stockSymbol}</Text>
            </Center>
          </Box>

          <Box>
            <ArrowBackIcon size="5" color="white" />
          </Box>
        </HStack>
      </Box>

      <ScrollView pt="3">
        <VStack mb="3">
          <Box m="3">
            <Text bold mb="4">
              Stock stats
            </Text>

            <VStack space="2">
              <HStack justifyContent="space-between">
                <Text>Market Cap</Text>
                <Text bold>{data.marketCap || "Loading..."}</Text>
              </HStack>

              <HStack justifyContent="space-between">
                <Text>P/E ratio</Text>
                <Text bold>{data.peRatio || "Loading..."}</Text>
              </HStack>

              <HStack justifyContent="space-between">
                <Text>Div/Yield</Text>
                <Text bold>{data.dividendYield || "Loading..."}</Text>
              </HStack>
            </VStack>
          </Box>

          <Box m="3" mb="8">
            <Text bold mb="4">
              Company financials
            </Text>

            <VStack space="2">
              <HStack justifyContent="space-between">
                <Text>Company value</Text>
                <Text bold>{data.companyValue || "Loading..."}</Text>
              </HStack>

              <HStack justifyContent="space-between">
                <Text>Annual revenue</Text>
                <Text bold>N/A</Text>
              </HStack>

              <HStack justifyContent="space-between">
                <Text>Annual revenue growth</Text>
                <Text bold>{'9.85%' || "Loading..."}</Text>
              </HStack>

              <HStack justifyContent="space-between">
                <Text>Gross profit (12M)</Text>
                <Text bold>{data.grossProfit || "Loading..."}</Text>
              </HStack>

              <HStack justifyContent="space-between">
                <Text>Net profit</Text>
                <Text bold>{data.netProfit || "Loading..."}</Text>
              </HStack>
            </VStack>
          </Box>

          <Divider thickness="10" bgColor="gray.100" />

          <Box m="3">
            <Text bold>Today's trade volume</Text>
            <Text fontSize="4xl">2.01M</Text>
            <Text mb="3">Shares today</Text>
            <Progress mb="4" w="35%" size="md" colorScheme="blue" value={100} />
            <Progress mb="4" w="75%" size="md" value={100} />
            <Text bold>6.25M shares</Text>
            <Text mb="3">Average daily trading volume</Text>
          </Box>

          <Divider thickness="10" bgColor="gray.100" />

          <Box m="3">
            <Text bold mb="4">
              Earnings
            </Text>

            <VStack space="2">
              <HStack justifyContent="space-between">
                <Text>Market Cap</Text>
                <Text bold>135.88B (Large Cap)</Text>
              </HStack>

              <HStack justifyContent="space-between">
                <Text>P/E ratio</Text>
                <Text bold>142.24</Text>
              </HStack>

              <HStack justifyContent="space-between">
                <Text>Div/Yield</Text>
                <Text bold>1.61</Text>
              </HStack>
            </VStack>
          </Box>

          <Divider thickness="10" bgColor="gray.100" />

          {/* <Box m="3">
            <Text bold mb="4">
              Stock Price (1yr)
            </Text>

            <StockDetailHistoricalLineChart hideToggle />
          </Box> */}
        </VStack>
      </ScrollView>
    </VStack>
    </Center>
  );
};

export default StockStats;
