import React, { useContext, useEffect, useState, useRef } from "react";
import BackButton from "./../components/BackButton";

import {
  Box,
  VStack,
  Divider,
  ScrollView,
  Pressable,
  Text,
  Button,
  ArrowBackIcon,
  Center,
  HStack,
  Flex,
  Spinner,
} from "native-base";

import { useQuery } from "react-query";

import StockDetailHero from "../components/stock-detail/hero";
import AssetChart from "../components/AssetChart";
import _ from "lodash";
import { InvestmentContext } from "../InvestmentProvider";

import { Animated } from "react-native";
import ScrollablePage from "../components/ScollablePage";

const StockDetail = ({ route, navigation }) => {
  const { positions, createOrder, fetchAsset, lookupSymbol } = useContext(InvestmentContext);
  const [numberOfShares, setNumberOfShares] = useState("1");
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const detailSymbol = (route.params && route.params.symbol) || lookupSymbol;

  const [animatedValue, setAnimatedValue] = useState(() => {
    return new Animated.Value(0);
  });

  const asset = useQuery(["asset", detailSymbol], () =>

    fetchAsset(detailSymbol)
  );

  useEffect(() => {
    navigation.setOptions({
      title: ``,
      headerLeft: () => <BackButton {...{ navigation }} />,
      headerShown: false,
    });
  }, []);

  if (asset.status === "loading" || positions.status === 'loading') {
    return (
      <ScrollablePage>
        <Center>
          <VStack w="100%" h="100%">
            <Spinner size={"lg"} style={{ marginTop: 60 }} />
          </VStack>
        </Center>
      </ScrollablePage>
    );
  }

  // const stockSymbol = asset.data.symbol; //_.get(route, 'params.stockSymbol');

  console.log(positions.data, '<<< ositions.data')
  const isInPortfolio = !!(positions.data && positions.data.equityPositions.find(
    (p) => p.symbol === asset.data.symbol
  ));

  return (
    <>
      <VStack flex="1" safeArea={true}>
        <Box ml="5" mt="3">
          <Pressable onPress={navigation.goBack}>
            <ArrowBackIcon size="5" />
          </Pressable>
        </Box>
        <StockDetailHero asset={asset.data} />
        <AssetChart asset={asset.data} />
        <ScrollView>
        <Box m="3"style={{overflow: 'auto'}}>
          <Text>{asset.data.description}</Text>
        </Box>
        </ScrollView>
        
      </VStack>
      <HStack mb="5">
        <Button
          py="2.5"
          isDisabled={isSubmitting}
          style={{ flex: 1, margin: 5 }}
          onPress={() => {
            setIsSubmitting(true)
            createOrder({
              symbol: asset.data.symbol,
              quantity: numberOfShares,
              side: "buy",
            })
              .then(() => {
                setIsSubmitting(false)
                navigation.navigate('OrderSuccess', {
                  symbol: asset.data.symbol,
                  quantity: numberOfShares,
                  side: "buy",
                })
              })
              .catch((e) => {
                setIsSubmitting(false)
                alert(e.message);
              });
          }}
        >
          <Text color="white" fontSize="md">
            Buy
          </Text>
        </Button>
        {isInPortfolio ? (
          <Button
            py="2.5"
            style={{ flex: 1,  }}
            isDisabled={isSubmitting}
            onPress={() => {
              setIsSubmitting(true)
              createOrder({
                symbol: asset.data.symbol,
                quantity: numberOfShares,
                side: "sell",
              })
                .then(() => {
                  setIsSubmitting(false)
                  navigation.navigate('OrderSuccess', {
                    symbol: asset.data.symbol,
                    quantity: numberOfShares,
                    side: "sell",
                  })
                })
                .catch((e) => {
                  setIsSubmitting(false)
                  alert(e.message);
                });
            }}
          >
            <Text color="white" fontSize="md">
              Sell
            </Text>
          </Button>
        ) : null}
      </HStack>
      {/* <Animated.View
          style={{
            transform: [
              {
                translateY: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [browserHeight, 0],
                }),
              },
            ],
            position: "absolute",
            backgroundColor: "#FFF",
            height: browserHeight,
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          <Checkout handleClose={handleClose} />
        </Animated.View> */}
        
    </>
  );
};

export default StockDetail;
