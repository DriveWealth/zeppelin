import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Button, Text, Spinner, ListItem, CheckBox, Body, H2 } from 'native-base'
import BackButton from '../BackButton';

const App = ({ navigation }) => {

    return (
        <>
            <View style={{margin: 20, justifyContent: 'center', alignItems: 'center'}}>
            <Image source={require('../img/characters.png')} />
            </View>

            <View style={{ alignItems: 'center', margin: 20 }}>
                <Text style={{width: 200, textAlign: 'center', fontSize: 24}}>Investing isn't one-size fits all</Text>
            </View>
            <View style={{ alignItems: 'center', margin: 20 }}>
                <Text style={{ textAlign: 'center', fontSize: 16}}>We all come from unique places, so we want to create an experience that speaks to your needs. </Text>
            </View>
            <View style={{ alignItems: 'center', margin: 20 }}>
                <Text style={{ textAlign: 'center', fontSize: 16}}>By answering questions about your experience, goals, and interests, we’ll bring the investing world to meet you, instead of the other way around.</Text>
            </View>
            <View style={{ position: 'absolute', bottom: 20, width: '100%', padding: 20 }}>
                <Button style={{borderRadius: 20, backgroundColor:'#142C8E'}} full onPress={() => {
                    navigation.navigate('InvestingExperience')
                }}>
                    <Text>Get Started</Text>
                </Button>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    assetName: { fontSize: 16, marginTop: 10, marginBottom: 10, color: '#515354' },
    price: { fontSize: 44, },
    activeText: { color: '#FFF' },
    inActiveText: { color: '#515354' },
    checkbox: { padding: 10, },
});

export default App;