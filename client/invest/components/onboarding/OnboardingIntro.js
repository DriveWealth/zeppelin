import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Button, Text, Spinner, ListItem, CheckBox, Body, H2 } from 'native-base'
import { Header } from '../Navigation'

const App = ({ navigation }) => {
    return (
        <>
            <View style={{ alignItems: 'flex-start', margin: 20 }}>
                <Text style={{fontSize: 24}}>Get your free stock</Text>
            </View>
            <View style={{ alignItems: 'flex-start', margin: 20 }}>
                <Text style={{ textAlign: 'left', fontSize: 16}}>We’ll help you get started with $5. You can buy whatever you want. Just onboarding first. </Text>
            </View>
            {/* <View style={{ alignItems: 'center', margin: 20 }}>
                <Text style={{ textAlign: 'center', fontSize: 16}}>Right after you account is setup, you will see a free stock in your portfolio.</Text>
            </View> */}

            <View style={{margin: 10, justifyContent: 'center', alignItems: 'center'}}>
            <Image source={require('../img/Signup.png')} />
            </View>

            <View style={{ position: 'absolute', bottom: 20, width: '100%', padding: 20 }}>
                <Button style={{borderRadius: 20, backgroundColor:'#142C8E'}} full onPress={() => {
                    navigation.navigate('Exposed')
                }}>
                    <Text>Start Now</Text>
                </Button>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    assetName: { fontSize: 16, marginTop: 10, marginBottom: 10, color: '#515354' },
    price: { fontSize: 44,  },
    activeText: { color: '#FFF' },
    inActiveText: { color: '#515354' },
    checkbox: { padding: 10, },
});

export default App;