import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text, View } from 'native-base'
import { InvestmentContext } from '../InvestmentContext';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment'

const App = () => {
    // const { orders } = useContext(InvestmentContext)
    const navigation = useNavigation()
    const handleTap = ({ symbol }) => {
        // navigation.navigate('Search', {
        //     symbol
        // })
    }

    // const renderItem = ({ item }) => {
    //     return <Item {...item} handleTap={handleTap} />
    // };

    const goBack = () => {
        navigation.goBack()
    }

    // if (orders && orders.length === 0) {
    //     return null
    // }

    return (
        <>
            <View style={{ justifyContent: 'center', padding: 20, flexDirection: 'row' }}>
            <Text style={{fontSize: 10}}>
                (Coming Soon)
            </Text>
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
    item: {
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    itemHeader: {
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#F1EFEA'
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
    headerTitle: {
        color: '#515354',
        marginTop: 5,
        fontSize: 14,
        flex: 1,
        padding: 5,
        textAlign: 'center',
    },
    avatar: {
        borderRadius: 25,
        width: 50,
        height: 50,
        backgroundColor: '#25694F',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        color: '#FFF',
        // textAlign: 'right',
    }
});

export default App;