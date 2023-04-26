import React from "react";
import { Text, Pressable, Image } from 'react-native';
const backButtonImage = require( './../images/arrow_left.png')


const BackButton = ({ navigation }) => {

  return (
    <Pressable
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Image source={ backButtonImage} style={ { height: 30, width: 30, marginLeft: 10 }} />
    </Pressable>
  );

};

export default BackButton;

