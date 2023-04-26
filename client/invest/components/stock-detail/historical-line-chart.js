import React, {useState, useEffect} from 'react';

import {Text, Box, HStack, Center} from 'native-base';
import {Circle, G, Line, Text as SVGText} from 'react-native-svg';
import {LineChart} from 'react-native-svg-charts';

import * as shape from 'd3-shape';

import config from '../../config';
import _ from 'lodash';

const HighPriceLine = ({y, highY}) => (
  <Line
    x1="0%"
    x2="100%"
    y1={y(highY)}
    y2={y(highY)}
    stroke="#ACADAD"
    strokeDasharray={[0.5, 2]}
    strokeWidth={1}
  />
);

const LowPriceLine = ({y, lowY}) => (
  <Line
    x1="0%"
    x2="100%"
    y1={y(lowY)}
    y2={y(lowY)}
    stroke="#ACADAD"
    strokeDasharray={[0.5, 2]}
    strokeWidth={1}
  />
);

const HighPrice = ({x, y, highX, highY}) => (
  <G x={x(highX) - 75 / 2}>
    <G x={75 / 2}>
      <SVGText y={y(highY)} textAnchor="start" stroke="black" fontWeight={200}>
        52wk high: 126.32
      </SVGText>
      <Circle cy={y(highY)} r={5} strokeWidth={2} stroke="white" fill="black" />
    </G>
  </G>
);

const LowPrice = ({x, y, lowX, lowY}) => (
  <G x={x(lowX) - 75 / 2}>
    <G x={75 / 2}>
      <SVGText y={y(lowY)} textAnchor="start" stroke="black" fontWeight={100}>
        52wk low: 85.45
      </SVGText>

      <Circle cy={y(lowY)} r={5} strokeWidth={2} stroke="white" fill="black" />
    </G>
  </G>
);

const CurrentPrice = ({x, y, currentX, currentY}) => (
  <G x={x(currentX) - 75 / 2}>
    <G x={75 / 2}>
      <Circle
        cy={y(currentY)}
        r={6.5}
        strokeWidth={2}
        stroke="white"
        fill="#38AF88"
      />
    </G>
  </G>
);

const StockDetailHistoricalLineChart = ({stockSymbol, hideToggle = false}) => {
  const [data, setData] = useState([]);

  // TODO: create class wrapper for this
  // TODO: add GQL lib to make queries work nicer
  const getChartBars = async symbol => {
    const resp = await fetch(config.gqlUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'x-api-key': config.apiKey,
      },
      body: JSON.stringify({
        operationName: 'getChartBars',
        query: `
          query getChartBars {
            historicalPrice(interval: OneYear, symbol: "${symbol}") {
              bars {
                openPrice
                startDate
              }
            }
          }`,
      }),
    });

    const json = await resp.json();
    return json.data.historicalPrice;
  };

  useEffect(() => {
    const update = async () => {
      const response = await getChartBars(stockSymbol);
      setData(response);
    };

    update();
  }, [stockSymbol]);

  const bars = _.get(data, 'bars', []);

  if (bars.length <= 0) return null;

  const highY = bars.reduce((h, b) => Math.max(h, b.openPrice), -Infinity);
  const highX = bars.findIndex(b => b.openPrice === highY);

  const lowY = bars.reduce((l, b) => Math.min(l, b.openPrice), Infinity);
  const lowX = bars.findIndex(b => b.openPrice === lowY);

  const [lastIndex, lastPrice] = [
    bars.length - 1,
    bars[bars.length - 1].openPrice,
  ];

  return (
    <Box my="4">
      <LineChart
        style={{height: 200}}
        data={bars.map(b => b.openPrice)}
        svg={{
          stroke: 'rgba(56, 175, 136, 1)',
          strokeWidth: 2,
        }}
        contentInset={{top: 20, bottom: 20, right: 20}}
        curve={shape.curveNatural}>
        <HighPriceLine highY={highY} />
        <LowPriceLine lowY={lowY} />
        <HighPrice highX={highX} highY={highY} />
        <LowPrice lowX={lowX} lowY={lowY} />
        <CurrentPrice currentX={lastIndex} currentY={lastPrice} />
      </LineChart>

      {!hideToggle && (
        <Center mt="5" mx="4">
          <Box rounded="full" bgColor="#F1EFEA" px="4" py="1" w="100%">
            <HStack justifyContent="space-between">
              <Box py="2" px="3">
                <Text>1d</Text>
              </Box>

              <Box py="2" px="3">
                <Text>1w</Text>
              </Box>

              <Box py="2" px="3">
                <Text>1m</Text>
              </Box>

              <Box py="2" px="3">
                <Text>6m</Text>
              </Box>

              <Box rounded="full" bgColor="white" py="2" px="3">
                <Text bold color="#142C8E">
                  1y
                </Text>
              </Box>

              <Box py="2" px="3">
                <Text>All</Text>
              </Box>
            </HStack>
          </Box>
        </Center>
      )}
    </Box>
  );
};

export default StockDetailHistoricalLineChart;
