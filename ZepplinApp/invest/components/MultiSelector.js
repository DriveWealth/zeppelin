import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { Button, Text, Spinner, ListItem, CheckBox, Body, H2 } from 'native-base'

const Item = ({ title, subTitle, value, selectedValues, onSelection }) => {
    let isSelected = selectedValues.indexOf(value) > -1

    return <TouchableOpacity onPress={() => {
        onSelection(value, !isSelected)
    }}>
        <View style={styles.item}>
            <View style={{ width: 50 }}>
                <CheckBox style={styles.checkbox} checked={isSelected} onPress={() => {
                    onSelection(value, !isSelected)
                }} />
            </View>
            <View style={{ flex: 1 }}>
                <Text style={styles.title}>{title}</Text>
                {
                    subTitle ? <Text style={styles.subTitle}>{subTitle}</Text> : null
                }
            </View>
        </View>
    </TouchableOpacity>
}


const App = ({ title, subTitle, options, value, onSelection }) => {
    // const [value, setValue] = useState(false)

    const renderItem = ({ item }) => (
        <Item {...item} onSelection={onSelection} selectedValues={value} />
    );

    return (
        <>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ textAlign: 'center', fontSize: 24, padding: 10 }}>{title}</Text>
                {
                    subTitle ? <Text style={{ textAlign: 'center', fontSize: 16, padding: 5 }}>{subTitle}</Text> : null
                }
                
            </View>
            {/* <View> */}
            <FlatList
                data={options}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={false}
                style={{ width: '100%' }}
            />
            {/* </View> */}
        </>
    );
}

const styles = StyleSheet.create({
    assetName: { fontSize: 16, marginTop: 10, marginBottom: 10, color: '#515354' },
    price: { fontSize: 44, },
    activeText: { color: '#FFF' },
    inActiveText: { color: '#515354' },
    checkbox: { padding: 10, },
    item: { alignItems: 'center', flex: 1, padding: 10, borderRadius: 20, backgroundColor: '#FFF', marginTop: 10, marginBottom: 10, flexDirection: 'row' },
    title: { fontSize: 16, padding: 5 },
    subTitle: { fontSize: 14, padding: 5, color: '#515354' },
});

export default App;