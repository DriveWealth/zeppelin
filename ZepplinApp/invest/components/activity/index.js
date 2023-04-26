import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { Button, Text, Spinner, ListItem, CheckBox, Body, H2, Icon, Badge } from 'native-base'
import { InvestmentContext } from '../InvestmentContext';
import { Header } from '../Navigation'
import moment from 'moment'

const Item = ({ symbol, qty, orderStatus, createdAt }) => (
    <TouchableOpacity onPress={() => {
        // handleTap({ symbol })
    }}>
        <View style={styles.item}>
            {/* <View style={{flex: 1}}>
            <View style={styles.avatar}>
                <Text style={styles.avatarText}>{symbol.substring(0, 1)}</Text>
            </View>
            </View> */}
            
            <Text style={[styles.title], {flex: 2, marginLeft: 10}}>{symbol}</Text>
            <Text style={[styles.title], {flex: 1, textAlign: 'center'}}>{qty}</Text>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
            <Badge success={orderStatus === 'filled'} info={orderStatus !== 'filled'}>
            
            <Text style={{fontSize: 10}} >
                {orderStatus.toUpperCase()}
            </Text>
            </Badge>
            </View>
            <Text style={[styles.title, {flex: 2, textAlign: 'right'}]}>{moment(createdAt).format('MMM Do YY')}</Text>
        </View>
    </TouchableOpacity>
);

const ListHeader = () => (
    <View style={styles.itemHeader}>
        {/* <View style={[styles.avatar, {opacity: 0, flex: 1}]}>
            <Text style={styles.avatarText}>{'Symbol'}</Text>
        </View> */}
        <Text style={[styles.headerTitle, {flex: 2}]}>{'Symbol'}</Text>
        <Text style={[styles.headerTitle, {flex: 1}]}>{'Qty'}</Text>
        <Text style={[styles.headerTitle, {flex: 1}]}>{'Status'}</Text>
        <Text style={[styles.headerTitle, {flex: 2, textAlign: 'right'}]}>{'Created'}</Text>
        {/* <Text style={styles.title}>{moment(createdAt).format('lll')}</Text> */}
    </View>
);

const App = () => {
    // const { orders } = useContext(InvestmentContext)
    return (
        <>
            <Header />
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
    price: { fontSize: 44, },
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