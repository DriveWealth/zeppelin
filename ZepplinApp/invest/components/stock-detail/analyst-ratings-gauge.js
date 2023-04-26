import React from "react";

import { Box, Text, Center } from "native-base";
import { PieChart } from "react-native-svg-charts";

const RECOMMENDATIONS = {
  OVERWEIGHT: "OVERWEIGHT",
  BUY: "BUY",
  HOLD: "HOLD",
  SELL: "SELL"
}

const StockDetailAnalystRatingsGauge = ({ recommendation }) => {
  return (
    <Box mb="-48">
      <PieChart
        style={{ height: 400 }}
        valueAccessor={({ item }) => item.amount}
        data={[
          {
            key: 1,
            amount: 1,
            svg: { fill: recommendation === RECOMMENDATIONS.BUY ? "#308A67" : "#D4D6E8" },
          },
          {
            key: 2,
            amount: 1,
            svg: { fill: recommendation === RECOMMENDATIONS.OVERWEIGHT ? "#308A67" : "#D4D6E8" },
          },
          {
            key: 3,
            amount: 1,
            svg: { fill: "#fff" },
          },
          {
            key: 4,
            amount: 1,
            svg: { fill: "#fff" },
          },
          {
            key: 5,
            amount: 1,
            svg: { fill: "#fff" },
          },
          {
            key: 6,
            amount: 1,
            svg: { fill: "#fff" },
          },
          {
            key: 7,
            amount: 1,
            svg: { fill: recommendation === RECOMMENDATIONS.SELL ? "#DC143C" : "#D4D6E8" },
          },
          {
            key: 8,
            amount: 1,
            svg: { fill: recommendation === RECOMMENDATIONS.HOLD ? "#FFD700" : "#D4D6E8" },
          },
        ]}
        innerRadius="80%"
      />
      <Box position="absolute" top="1/3" w="100%">
        <Center>
          <Box rounded="full" bgColor="#308A67" py="2" px="4">
            <Text bold color="white">
              {recommendation}
            </Text>
          </Box>
        </Center>
      </Box>
    </Box>
  );
};

export default StockDetailAnalystRatingsGauge;
