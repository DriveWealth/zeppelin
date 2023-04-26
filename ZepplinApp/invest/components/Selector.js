import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { Button, Text, Spinner, ListItem, CheckBox, Body, H2 } from 'native-base'

const Item = ({ title, subTitle, value, selectedValue, onSelection }) => (
    <TouchableOpacity onPress={() => {
        onSelection(value)
    }}>
        <View style={styles.item}>
            <View style={{ width: 50 }}>
                <CheckBox style={styles.checkbox} checked={selectedValue === value} onPress={() => {
                    onSelection(value)
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
);


const App = ({ title, subTitle, options, value, onSelection }) => {
    // const [value, setValue] = useState(false)

    const renderItem = ({ item }) => (
        <Item {...item} onSelection={onSelection} selectedValue={value} />
    );

    return (
        <>
            <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                <Text style={{ textAlign: 'left', fontSize: 24, padding: 5 }}>{title}</Text>
                {
                    subTitle ? <Text style={{ textAlign: 'center', fontSize: 16, padding: 5, color: '#515354' }}>{subTitle}</Text> : null
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
    activeText: { color: '#FFF' },
    inActiveText: { color: '#515354' },
    checkbox: { padding: 10, },
    item: { alignItems: 'center', flex: 1, padding: 10, borderRadius: 20, backgroundColor: '#FFF', marginTop: 10, marginBottom: 10, flexDirection: 'row' },
    title: { fontSize: 18, padding: 5 },
    subTitle: { fontSize: 14, padding: 5, color: '#515354' },
});

export default App;