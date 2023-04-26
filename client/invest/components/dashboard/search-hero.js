import React, { useState, useEffect, useContext } from "react";

import {
  Box,
  Input,
  Text,
  SearchIcon,
  VStack,
  Pressable,
  Divider,
  Modal,
} from "native-base";

import { View, TouchableWithoutFeedback } from "react-native";

import config from "../../config";
import { InvestmentContext } from "../../InvestmentProvider";

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const SearchHero = ({ onStockSymbolPress }) => {
  const [searchInput, setSearchInput] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);

  const { fetchInstruments, instruments } = useContext(InvestmentContext);
  // TODO: create class wrapper for this
  // TODO: add GQL lib to make queries work nicer
  const getSuggestions = async (search) => {
    const resp = await fetch(config.gqlUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-api-key": config.apiKey,
      },
      body: JSON.stringify({
        operationName: "searchSecurities",
        query: `
          query searchSecurities {
            searchSecurities(filter: {symbol: {startsWith: "${search}"}}) {
              edges {
                node {
                  market
                  symbol
                  description
                }
              }
            }
          }`,
      }),
    });

    const { data } = await resp.json();
    const suggestions = data.searchSecurities.edges.map((e) => e.node);
    // console.log(JSON.stringify(suggestions, null, 2))
    return suggestions;
  };

  useEffect(() => {
    const update = async () => {
      await fetchInstruments(searchInput);
      // setSearchSuggestions(suggestions);
    };

    update();
  }, [searchInput]);

  return (
    <>
      {/* Search Autocomplete/Typeahead */}
      {/* TODO: replace with real typeahead input */}
      <Input
        fontSize="md"
        size="xl"
        InputLeftElement={
          <SearchIcon color="gray.700" ml="3" mr="2" size="4" />
        }
        placeholder="Search stocks and ETFs"
        placeholderTextColor="gray.700"
        variant="rounded"
        value={searchInput}
        onChangeText={setSearchInput}
        _focus={{
          borderColor: "gray.700",
        }}
      />

      {instruments && instruments.length > 0 && (
        <DismissKeyboard>
        <Box
          style={{
            position: "absolute",
            top: 40,
            borderRadius: 5,
            width: "100%",
            padding: 10,
            backgroundColor: "white",
          }}
        >
          <VStack space="1.5">
            {instruments.slice(0, 5).map((instrument) => (
              <View key={instrument.symbol}>
                <Pressable
                  onPress={() => {
                    onStockSymbolPress(instrument.symbol);
                    fetchInstruments("");
                  }}
                  key={instrument.symbol}
                >
                  <Box style={{ padding: 5,}}>
                    <Text bold fontSize="md">
                      {instrument.symbol} - {instrument.name}
                    </Text>
                  </Box>
                </Pressable>

                <Divider thickness="1" bgColor="gray.100" />
              </View>
            ))}
          </VStack>
        </Box>
        </DismissKeyboard>
      )}
    </>
  );
};

export default SearchHero;
