import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Box, Button, Text, VStack } from 'native-base'
import * as onboarding from './../../styles/onboarding.js'
import BackButton from "../BackButton";
import ButtonSheet from './ButtonSheet.js';

const GetStarted = ({ navigation }) => {

    useEffect(() => {
        navigation.setOptions({
          title: ``,
          headerLeft: () => <BackButton {...{ navigation }} />,
        });
    }, [])

    const onButtonPress = () => {
        navigation.navigate('Account') 
    }

    return (
        <Box safeArea={true} style={{ height: '100%'}} >
            <VStack flex="1" style={ {alignItems: 'center' } }>
                {/* <Image source={ require('../img/Signup.png') } style={ { marginTop: 100, width: 100, height: 100 } } /> */}
            <Text style={ { ...onboarding.text_title, marginTop: 100 } }>You are all set!</Text>                
            </VStack>
            

            <Button  onPress={ onButtonPress }>
                <Text style={ onboarding.button_text } >Start Trading</Text>
            </Button>
        </Box>
    );
}

// const styles = StyleSheet.create({
// });

export default GetStarted;