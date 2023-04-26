import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Icon, Text } from 'native-base'
import { useNavigation } from '@react-navigation/native';

export const Header = ({title}) => {
    const navigation = useNavigation()    
    const goBack = () => {
        navigation.goBack()
    }

    return  <View style={{ alignItems: 'center', padding: 20, flexDirection: 'row' }}>
        <View style={{ justifyContent: 'center', flex: 1 }}>
            <Button transparent onPress={goBack} style={{ maxWidth: 50 }}>
                <Icon type="FontAwesome" style={{ fontSize: 18 }} name="arrow-left" />
            </Button>
        </View>
        <Text style={{ fontSize: 16, flex: 1, textAlign: 'center',}}>{title || ''}</Text>
        <View style={{ flex: 1 }}>

        </View>
    </View>
}
