import React, { useContext } from 'react';
import { SafeAreaView, View, TouchableOpacity, FlatList, StyleSheet, StatusBar, Image, NativeModules } from 'react-native';
import { InvestmentContext } from '../InvestmentContext';
import { useNavigation } from '@react-navigation/native';
import { Button, Text, } from 'native-base'

const {MiniAppsManager} = NativeModules

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

const App = ({ limit = 3 }) => {

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

    if (topGainers && topGainers.length === 0) {
        return null
        // return <NoPositions handlleSearchPress={handlleSearchPress} />
    }
    return (
        <View style={{ padding: 10, }}>
            <Text style={{ fontSize: 18, marginTop: 10, marginBottom: 10, textAlign: 'center' }}>
                Top Gainers
            </Text>
            <Text style={{ fontSize: 12, marginTop: 10, marginBottom: 10, color: '#515354', textAlign: 'center' }}>
                These stocks gained the most today.
            </Text>
            <FlatList
                data={topGainers.slice(0, limit)}
                renderItem={renderItem}
                keyExtractor={item => item.symbol}
            />
            <View style={{ flex: 1, marginTop: 20, justifyContent: 'center', alignItems: 'center', }}>
                <View >
                <Button rounded onPress={() => {
                    MiniAppsManager.showRoute('Gainers')
                }}>
                    <Text>{'View List'}</Text>
                </Button>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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