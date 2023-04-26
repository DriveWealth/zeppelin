import React, { useContext, useEffect, useState } from "react";

import {
  Box,
  Divider,
  Text,
  HStack,
  VStack,
  ArrowUpIcon,
  Image,
  ArrowDownIcon,
} from "native-base";

// import StockDetailChart from './historical-line-chart';
import numeral from "numeral";

import _ from "lodash";

import { InvestmentContext } from "../../InvestmentProvider";

const StockDetailHero = ({asset}) => {
  const isUp = _.get(asset, "changeToday", 0) >= 0
  return (
    <Box style={{ marginTop: 10, }}>
      <VStack px="4">
        <HStack alignItems="center" style={{padding: 10}}>
          <Image style={{width: 80, height: 80}} source={{
              uri: asset.image,
            }} alt={asset.symbol}></Image>

          <VStack ml="2.5">
            <Box maxW={200}>
            <Text bold >{_.get(asset, "name", "Loading...")}</Text>
            <Text fontWeight="light">
              {_.get(asset, "symbol", "Loading...")}
            </Text>
            </Box>
          </VStack>
        </HStack>
        <Text fontSize="3xl" fontWeight="medium">
          {numeral(_.get(asset, "latestTradePrice", 0)).format("$0.00")}
        </Text>
        <HStack alignItems="center">
          {isUp &&  <ArrowUpIcon size="xs" color="green.600" />}
          {!isUp &&  <ArrowDownIcon size="xs" color="red.600" />}
          <Text ml="1" color={isUp ? "green.600" : "red.600"}>
            {numeral(_.get(asset, "changeToday", 0)).format("$0.00")}
          </Text>
          <Text ml="1" color={isUp ? "green.600" : "red.600"}>
            {numeral(_.get(asset, "percentChangeToday", 0)).format("0.00") +
              "%"}
          </Text>
        </HStack>
      </VStack>
      <Divider thickness="10" bgColor="gray.100" />
    </Box>
  );
};

export default StockDetailHero;
