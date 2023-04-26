import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Text, Checkbox, Button, Icon, VStack, Center } from "native-base";
import * as flexbox from "./../styles/flexbox.js";

const Item = ({ title, subtitle, value, selectedValue, onSelection }) => {
  const getItemContainerStyle = () => {
    if (selectedValue === value) {
      return {
        ...styles.item_container_selected,
        ...flexbox.flex_row_start_center,
      };
    } else {
      return {
        ...styles.item_container_unselected,
        ...flexbox.flex_row_start_center,
      };
    }
  };
  // console.log(title)

  return (
    <View style={{ width: "100%" }}>
      <Button
        onPress={() => {
          onSelection(value);
        }}
        //   leftIcon={<Icon as={Ionicons} name="cloud-upload-outline" size="sm" />}
      >
        {title}
        {subtitle ? (
          <Text style={styles.option_subtitle}>{subtitle}</Text>
        ) : null}
      </Button>
    </View>
  );
};

const MultipleRadio = ({ data, selectedValue, onSelection }) => {
  // const renderItem = ({ item }) => {
  //   return (
  //     <Item {...item} onSelection={onSelection} selectedValue={selectedValue} />
  //   );
  // };

  // console.log(data)
  return (
    <VStack alignItems="center">
      {data.map((item) => (
        <Item
          key={item.value}
          {...item}
          onSelection={onSelection}
          selectedValue={selectedValue}
        />
      ))}
    </VStack>
  );
  // return (
  //   <FlatList
  //     data={data}
  //     renderItem={renderItem}
  //     width="100%"
  //     showsVerticalScrollIndicator={false}
  //     contentContainerStyle={{ marginBottom: 50, marginTop: 10, width: '100%', backgroundColor: 'green'}}
  //   />
  // );
};

const styles = StyleSheet.create({
  checkbox: {
    padding: 0,
  },
  item_container_unselected: {
    borderRadius: 15,
    backgroundColor: "white",
    marginTop: 20,
    width: "96%",
    padding: 15,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  item_container_selected: {
    borderRadius: 15,
    backgroundColor: "white",
    marginTop: 20,
    width: "96%",
    padding: 15,
    borderStyle: "solid",
    borderWidth: 1.5,
    borderColor: "#142C8E",
  },
  option_title: {
    fontSize: 18,
    padding: 0,
    color: "#FFFFFF",
  },
  option_subtitle: {
    fontSize: 14,
    padding: 5,
    color: "#515354",
  },
});

export default MultipleRadio;
