import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { Button, Text, Spinner, ListItem, CheckBox, Body, H2, Icon } from 'native-base'
import { InvestmentContext } from '../InvestmentContext';
import { useNavigation } from '@react-navigation/native';

const Item = ({ symbol, name, marketValue, percentChangeToday, currentPrice, lastdayPrice, handleTap }) => (
    <TouchableOpacity onPress={() => {
        handleTap({ symbol })
    }}>
        <View style={styles.item}>
            <View style={styles.avatar}>
                <Text style={styles.avatarText}>{symbol.substring(0, 1)}</Text>
            </View>
            <Text style={styles.title}>{name}</Text>
            <View style={percentChangeToday > 0 ? styles.titleUp : styles.titleDown}>
                <Text style={percentChangeToday > 0 ? styles.textUp : styles.textDown}>{`$${currentPrice}`}</Text>
            </View>
        </View>
    </TouchableOpacity>
);

const App = () => {
    const { topLosers } = useContext(InvestmentContext)
    const navigation = useNavigation()
    const handleTap = ({ symbol }) => {
        navigation.navigate('Search', {
            symbol
        })
    }

    const renderItem = ({ item }) => {
        return <Item {...item} handleTap={handleTap} />
    };

    const goBack = () => {
        navigation.goBack()
    }

    if (topLosers && topLosers.length === 0) {
        return null
    }

    return (
        <>
            <View style={{ alignItems: 'center', padding: 20, flexDirection: 'row' }}>
                <View style={{ justifyContent: 'center', flex: 1}}>
                    <Button transparent onPress={goBack} style={{ maxWidth: 50 }}>
                        <Icon type="FontAwesome" style={{ fontSize: 18 }} name="arrow-left" />
                        {/* <Text>Search</Text> */}
                    </Button>
                </View>
                <Text style={{ fontSize: 16, flex: 1, alignItems: 'center' }}>Top Losers</Text>
                <View style={{flex: 1}}></View>

            </View>
            <FlatList
                data={topLosers}
                renderItem={renderItem}
                keyExtractor={item => item.symbol}
                style={{ padding: 20 }}
            />
            {/* <View style={{margin: 10, justifyContent: 'center', alignItems: 'center'}}>
            <Image source={require('../img/Signup.png')} />
            </View>

            <View style={{ alignItems: 'center', margin: 20 }}>
                <Text style={{width: 200, textAlign: 'center', fontSize: 24}}>Let's get you that free stock</Text>
            </View>
            <View style={{ alignItems: 'center', margin: 20 }}>
                <Text style={{ textAlign: 'center', fontSize: 16}}>We just need a few more details to get you trading. </Text>
            </View>
            <View style={{ alignItems: 'center', margin: 20 }}>
                <Text style={{ textAlign: 'center', fontSize: 16}}>Right after you account is setup, you will see a free stock in your portfolio.</Text>
            </View>
            <View style={{ position: 'absolute', bottom: 20, width: '100%', padding: 20 }}>
                <Button style={{borderRadius: 20, backgroundColor:'#142C8E'}} full onPress={() => {
                    navigation.navigate('Disclosures')
                }}>
                    <Text>Sign Me Up</Text>
                </Button>
            </View> */}
        </>
    );
}

const styles = StyleSheet.create({
    assetName: { fontSize: 16, marginTop: 10, marginBottom: 10, color: '#515354' },
    price: { fontSize: 44, },
    activeText: { color: '#FFF' },
    inActiveText: { color: '#515354' },
    checkbox: { padding: 10, },
    item: {
        marginVertical: 8,
        // marginHorizontal: 8,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        // backgroundColor: 'red'
    },
    titleUp: {
        padding: 5,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 40,
        // marginTop: 5,
        fontSize: 20,
        backgroundColor: '#CBF3EC',
    },
    titleDown: {
        padding: 5,
        borderRadius: 40,
        fontSize: 20,
        backgroundColor: '#FDDBD3',
    },
    textUp: {
        color: '#25694F',
    },
    textDown: {
        color: '#AD2B09',
        // textAlign: 'right',
    },
    title: {
        marginTop: 5,
        fontSize: 14,
        flex: 1,
        padding: 5
    },
    avatar: {
        borderRadius: 25,
        width: 50,
        height: 50,
        backgroundColor: '#761AD3',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        color: '#FFF',
        // textAlign: 'right',
    }
});

export default App;