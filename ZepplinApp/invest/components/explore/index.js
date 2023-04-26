import React, { useContext } from 'react';
import { SafeAreaView, View, TouchableOpacity, FlatList, StyleSheet, StatusBar, Image } from 'react-native';
import { InvestmentContext } from '../InvestmentContext';
import { useNavigation } from '@react-navigation/native';
import { Button, Text, Card} from 'native-base'
import TopGainers from './TopGainers'
import TopLosers from './TopLosers'


const App = () => {
    const renderItem = ({ item }) => {
        return <Card style={{width: 340,}}>
            <item.Component />
        </Card>
    };

    return (
        <View style={{ padding: 20}}>
            <Text style={{ fontSize: 16, marginTop: 10, marginBottom: 10, color: '#515354' }}>Explore stocks and ETFs</Text>
            <FlatList
                data={[{Component: TopGainers, id: 'gainers'}, {Component: TopLosers, id: 'losers'}]}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{margin: 0}}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        marginVertical: 8,
        marginHorizontal: 4,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row', 
        // backgroundColor: 'red'
    },
    titleUp: {
        padding: 10,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 40,
        // marginTop: 5,
        fontSize: 20,
        backgroundColor: '#CBF3EC',
    },
    titleDown: {
        padding: 10,
        borderRadius: 40,
        // marginTop: 5,
        fontSize: 20,
        backgroundColor: '#FDDBD3',      
    },
    textUp: {
        color: '#25694F',
        // textAlign: 'right',


    },
    textDown: {
        color: '#AD2B09',
        // textAlign: 'right',
    },
    title: {
        marginTop: 5,
        fontSize: 20
    },
});

export default App;