import React from "react";

import { Box, Text, HStack, ScrollView, Center, Pressable } from "native-base";


const StockDetailHighlights = ({ handlePress }) => {
  return (
    <Box p="2">
      <Box px="2">
        <Text bold>Highlights [TBD]</Text>
      </Box>

      <ScrollView horizontal>
        <HStack space="2">
          <Box
            m="2"
            rounded="lg"
            shadow="2"
            height="40"
            width="32"
            bgColor="gray.200"
          ></Box>

          <Box
            m="2"
            rounded="lg"
            shadow="2"
            height="40"
            width="32"
            bgColor="gray.200"
          ></Box>

          <Box
            m="2"
            rounded="lg"
            shadow="2"
            height="40"
            width="32"
            bgColor="gray.200"
          ></Box>
        </HStack>
      </ScrollView>

      <Center my="4">
        <Pressable onPress={handlePress}>
          <Text bold color="blue.500">
            View more stats
          </Text>
        </Pressable>
      </Center>
    </Box>
  );
};

export default StockDetailHighlights;
