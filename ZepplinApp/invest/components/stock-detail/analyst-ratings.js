import React, { useEffect, useState } from "react";

import { Box, Text, VStack, HStack, Progress, InfoIcon } from "native-base";

import StockDetailAnalystRatingsGauge from "./analyst-ratings-gauge";

import _ from "lodash";

import config from "../../config";

const Percentage = ({ text, color, percentage }) => {
  return (
    <HStack alignItems="center" justifyContent="space-between">
      <Text w="1/6">{text}</Text>

      <Box w="2/3">
        <Progress value={percentage} colorScheme={color} />
      </Box>

      <Text w="1/6" textAlign="right">
        {percentage}%
      </Text>
    </HStack>
  );
};

const StockDetailAnalystRatings = ({ stockSymbol }) => {
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
        operationName: "getAnalystRatings",
        query: `
          query getAnalystRatings {
            security(symbol: "${symbol}") {
              ... on Stock {
                company {
                  analystRatings {
                    recommendation
                    totalNumberOfRecommendations
                    numberOfBuyRecommendations
                    numberOfHoldRecommendations
                    numberOfSellRecommendations
                  }
                }
              }
            }
          }`,
      }),
    });

    return resp.json();
  };

  const getAnalystPercentages = (_data) => {
    const ratings = _.get(_data, "company.analystRatings");

    if (!ratings) return {};

    const buys = ratings.numberOfBuyRecommendations;
    const holds = ratings.numberOfHoldRecommendations;
    const sells = ratings.numberOfSellRecommendations;
    const total = buys + holds + sells;

    return {
      buy: (buys / total) * 100,
      hold: (holds / total) * 100,
      sell: (sells / total) * 100,
    };
  };

  useEffect(() => {
    const update = async () => {
      const details = await getStockDetails(stockSymbol);
      setData(details.data.security);
    };

    update();
  }, [stockSymbol]);

  const { buy, hold, sell } = getAnalystPercentages(data);

  return (
    <VStack p="4" space="3">
      <Box>
        <HStack space="3" alignItems="center">
          <Text bold>Analyst ratings</Text>
          <InfoIcon size="xs" color="blue.800" />
        </HStack>

        <Text fontWeight="light" fontSize="xs">
          Based on {_.get(data, "company.analystRatings.totalNumberOfRecommendations")} analysts
        </Text>
      </Box>

      <StockDetailAnalystRatingsGauge recommendation={_.get(data, "company.analystRatings.recommendation")} />

      <Percentage text="Buy" percentage={buy} color="green" />
      <Percentage text="Hold" percentage={hold} color="blue" />
      <Percentage text="Sell" percentage={sell} color="red" />

      <Box
        p="4"
        rounded="lg"
        shadow="2"
        height="40"
        width="100%"
        bgColor="white"
      >
        <VStack space="2">
          <Text fontSize="md">Bulls are saying</Text>
          <Text fontSize="xs">
            The company's strong earnings bolstered by strong digital growth,
            rewards program acceptance, and surprisingly positive Chinese
            numbers bade bulls welcome to the stock.
          </Text>
        </VStack>
      </Box>
    </VStack>
  );
};

export default StockDetailAnalystRatings;
