import React, {useState, useEffect} from 'react';

import {
  Box,
  Input,
  Text,
  SearchIcon,
  VStack,
  Pressable,
  Divider,
  View,
  Button,
  FlatList,
  HStack,
} from 'native-base';

import config from '../../config';

const SearchSuggestions = ({suggestions, onSuggestionSelected}) => {
  return (
    <Box
      w={{
        base: '100%',
        md: '25%',
      }}>
      <FlatList
        data={suggestions}
        renderItem={({item}) => (
          <Pressable onPress={() => onSuggestionSelected(item)}>
            <HStack space={3} style={{margin: 8,}} justifyContent="space-between">
              
            <Text
              style={{textAlign: 'left'}}
              _dark={{
                color: 'warmGray.50',
              }}
              color="coolGray.800"
              bold>
              {item.symbol}
            </Text>
            </HStack>
          </Pressable>
          // <Box
          //   borderBottomWidth="1"
          //   _dark={{
          //     borderColor: 'gray.600',
          //   }}
          //   borderColor="coolGray.200"
          //   pl="4"
          //   pr="5"
          //   py="2">
          //   <HStack space={3} justifyContent="space-between">
          //     <VStack>
          //       <Text
          //         _dark={{
          //           color: 'warmGray.50',
          //         }}
          //         color="coolGray.800"
          //         bold>
          //         {item.symbol}
          //       </Text>
          //       <Text
          //         color="coolGray.600"
          //         _dark={{
          //           color: 'warmGray.200',
          //         }}>
          //         {item.desciption}
          //       </Text>
          //     </VStack>
          //   </HStack>
          // </Box>
        )}
        keyExtractor={item => item.symbol}
      />
    </Box>
  );
};

export default SearchSuggestions;
