import React, {useEffect, useState} from 'react';

import {View} from 'react-native'
import {Box, Text, VStack, HStack, Center, ArrowUpIcon, ScrollView} from 'native-base';

import ScrollPicker from '../scroll-wheel';

const StockDetailHistoricalReturns = ({title}) => {
  const [index, setIndex] = useState(5);
  const [investmentValues, setInvestmentValues] = useState([]);
  const [returnRate, setReturnRate] = useState(27.89);

  useEffect(() => {
    const nums = [];

    for (let i = 1000; i < 10001; i += 1000) {
      nums.push(i);
    }

    setInvestmentValues(nums);
  }, []);

  const renderHistoricalReturn = (investment, _returnRate) => {
    const interest = (investment * _returnRate) / 100;

    return (
      <View _contentContainerStyle={{maxHeight: 400}}>
        <ArrowUpIcon size="xs" color="green.900" />

        <Text ml="1" color="green.900">
          ${investment + interest}
        </Text>

        <Text ml="1" color="green.900">
          ({_returnRate}%)
        </Text>
      </View>
    );
  };

  return (
    <VStack p="4" space="3" h="300">
      <Text bold>Historical returns [TBD]</Text>
      <Text fontSize="xs">{`A look back if you invested in ${title}.`}</Text>
    <ScrollView>
    <Box >
        <Center>
          <Text bold fontSize="sm">
            Initial Investment
          </Text>
        </Center>

        {/* TODO: replace with number slider */}
        <ScrollPicker
          selectedIndex={index}
          dataSource={investmentValues}
          onValueChange={(_newValue, newIndex) => setIndex(newIndex)}
        />
      </Box>

      <Box>
        <Center>
          <Text bold fontSize="sm">
            Timeframe
          </Text>
        </Center>

        {/* TODO: replace with number slider */}
        <Center mt="2">
          <Text bold color="blue.800" fontSize="xl">
            1 year
          </Text>
        </Center>
      </Box>

      <Box mt="3">
        <Center>
          <Text fontSize="xs" fontWeight="semibold">
            Today, you'd have:
          </Text>
        </Center>

        <Center>
          <Box bgColor="green.100" rounded="full" py="1" px="2" mt="2">
            <HStack alignItems="center">
              {renderHistoricalReturn(investmentValues[index], returnRate)}
            </HStack>
          </Box>
        </Center>
      </Box>
      </ScrollView>
    </VStack>
  );
};

export default StockDetailHistoricalReturns;
