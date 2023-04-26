import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { Button, Text, Spinner, ListItem, CheckBox, Body, H2, Icon } from 'native-base'
import TopGainers from './TopGainers'
import { InvestmentContext } from '../InvestmentContext';
import { useNavigation } from '@react-navigation/native';
import { Header } from '../Navigation'

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
    const { topGainers } = useContext(InvestmentContext)
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

    if (topGainers && topGainers.length === 0) {
        return null
    }

    return (
        <>
            <Header title={'Gainers'} />
            <FlatList
                data={topGainers}
                renderItem={renderItem}
                keyExtractor={item => item.symbol}
                style={{ padding: 20, paddingTop: 0 }}
            />
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