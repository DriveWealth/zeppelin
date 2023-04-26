import React, {useContext, useEffect, useState} from 'react';
import {Text, Box, HStack, Center, Pressable} from 'native-base';
import {Circle, G, Line, Text as SVGText} from 'react-native-svg';
import {LineChart} from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import {InvestmentContext} from '../../InvestmentContext';
import moment from 'moment';

// const HighPriceLine = ({ y }) => (
//   <Line
//     x1="0%"
//     x2="100%"
//     y1={y(126)}
//     y2={y(126)}
//     stroke="#ACADAD"
//     strokeDasharray={[0.5, 2]}
//     strokeWidth={1}
//   />
// );

// const LowPriceLine = ({ y }) => (
//   <Line
//     x1="0%"
//     x2="100%"
//     y1={y(80)}
//     y2={y(80)}
//     stroke="#ACADAD"
//     strokeDasharray={[0.5, 2]}
//     strokeWidth={1}
//   />
// );

// const LowPrice = ({ x, y }) => (
//   <G x={x(1) - 75 / 2}>
//     <G x={75 / 2}>
//       <SVGText y={y(75)} textAnchor="start" stroke="black" fontWeight={100}>
//         52wk low: 85.45
//       </SVGText>
//       <Circle cy={y(80)} r={5} strokeWidth={2} stroke="white" fill="black" />
//     </G>
//   </G>
// );

// const HighPrice = ({ x, y }) => (
//   <G x={x(13) - 75 / 2}>
//     <G x={75 / 2}>
//       <SVGText y={y(129)} textAnchor="start" stroke="black" fontWeight={200}>
//         52wk high: 126.32
//       </SVGText>
//       <Circle cy={y(126)} r={5} strokeWidth={2} stroke="white" fill="black" />
//     </G>
//   </G>
// );

const CurrentPrice = ({x, y}) => (
  <G x={x(24) - 75 / 2}>
    <G x={75 / 2}>
      <Circle
        cy={y(110)}
        r={6.5}
        strokeWidth={2}
        stroke="white"
        fill="#38AF88"
      />
    </G>
  </G>
);

const Segment = ({val, selectedSegment, onSegmentSelected}) => {
  return (
    <Pressable
      onPress={() => {
        onSegmentSelected(val);
      }}>
      <Box
        py="2"
        px="3"
        rounded={selectedSegment === val ? 'full' : null}
        bgColor={selectedSegment === val ? 'white' : null}>
        <Text>{val}</Text>
      </Box>
    </Pressable>
  );
};

const PortfolioDetailHistoricalLineChart = ({hideToggle = false}) => {
  const {account, portfolioHistory, getPortfolioHistory, dispatch} =
    useContext(InvestmentContext);
  const [chartData, setChartData] = useState();
  const [selectedSegment, setSelectedSegment] = useState('2h');

 
  useEffect(() => {
    if (!portfolioHistory) return;
    // a
    // console.log(portfolioHistory, '<<<<<<<')
    if (portfolioHistory.timestamp.length > 0) {
      const chartData = portfolioHistory.equity; // portfolioHistory.map( ( historyItem, index ) => {
      //   return historyItem.portfolioValue
      // })
      setChartData(chartData);
    }
  }, [portfolioHistory]);

  const onSegmentSelected = segment => {
    setSelectedSegment(segment);

    switch (segment) {
      case '1h': {
        let endDate = moment().subtract(1, 'hour').utc().format();
        return getPortfolioHistory('1MIN', endDate);
      }
      case '2h': {
        let endDate = moment().subtract(2, 'hours').utc().format();
        return getPortfolioHistory('2MIN', endDate);
      }
      case '6h': {
        let endDate = moment().subtract(6, 'hours').utc().format();
        return getPortfolioHistory('5MIN', endDate);
      }
      case '1d': {
        let endDate = moment().subtract(1, 'day').utc().format();
        return getPortfolioHistory('10MIN', endDate);
      }
      case 'All': {
        let endDate = moment().subtract(1, 'year').utc().format();
        return getPortfolioHistory('15MIN', endDate);
      }
    }
  };

  const SELECTED_COLOR = '#142C8E';
  return (
    <>
      {chartData ? (
        <Box my="3">
          <LineChart
            style={{
              height: 200,
              padding: 20,
              animate: true,
              // shadowColor: "#000",
              // shadowOffset: {
              //   width: 0,
              //   height: 3,
              // },
              // shadowOpacity: 0.5,
              // shadowRadius: 3,
            }}
            data={chartData}
            svg={{
              stroke: 'rgba(56, 175, 136, 1)',
              strokeWidth: 2,
            }}
            contentInset={{top: 20, bottom: 20, right: 20}}
            curve={shape.curveNatural}>
            {/* <HighPriceLine /> */}
            {/* <LowPriceLine /> */}
            {/* <HighPrice /> */}
            {/* <LowPrice /> */}
            {/* <CurrentPrice /> */}
          </LineChart>

          {!hideToggle && (
            <Center mt="5" mx="4">
              <Box rounded="full" bgColor="#F1EFEA" px="4" py="1" w="100%">
                <HStack justifyContent="space-between">
                  <Segment
                    val="1h"
                    selectedSegment={selectedSegment}
                    onSegmentSelected={() => onSegmentSelected('1h')}
                  />
                  <Segment
                    val="2h"
                    selectedSegment={selectedSegment}
                    onSegmentSelected={() => onSegmentSelected('2h')}
                  />
                  <Segment
                    val="6h"
                    selectedSegment={selectedSegment}
                    onSegmentSelected={() => onSegmentSelected('6h')}
                  />
                  <Segment
                    val="1d"
                    selectedSegment={selectedSegment}
                    onSegmentSelected={() => onSegmentSelected('1d')}
                  />
                  <Segment
                    val="All"
                    selectedSegment={selectedSegment}
                    onSegmentSelected={() => onSegmentSelected('All')}
                  />
                </HStack>
              </Box>
            </Center>
          )}
        </Box>
      ) : null}
    </>
  );
};

export default PortfolioDetailHistoricalLineChart;
