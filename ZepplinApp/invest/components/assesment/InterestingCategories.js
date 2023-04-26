import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Button, Text, Spinner, ListItem, CheckBox, Body, H2 } from 'native-base'
import MultiSelector from '../MultiSelector'
import { AssessmentContext } from './AssessmentContext';
import BackButton from '../BackButton';

const options = [{
    title: 'In the news',
    subTitle: `Most talked about stocks in the last few months.`,
    value: 'in_the_news',
},{
    title: `Health and wellness`,
    subTitle: `Companies in health and wellness.`,
    value: 'health_n_wellness',
},{
    title: `Top in tech`,
    subTitle: `Artificial intelligence, software, social media, and mobile companies to name a few.`,
    value: 'top_in_tech',
}]

const App = ({ navigation }) => {
    const {intrestedCategories, dispatch} = useContext(AssessmentContext)
    useEffect(() => {
        navigation.setOptions({
          title: ``,
          headerLeft: () => <BackButton {...{navigation}} />,
        });
      }, []);
    
    return (
        <>
            <View style={{ alignItems: 'center', padding: 20 }}>
                <Text style={{fontSize: 16}}>[Progress bar ...]</Text>
            </View>
           

            <View style={{ alignItems: 'center', margin: 20 }}>
                <MultiSelector options={options} 
                    title={`Which of these categories are most interesting to you?`} 
                    subTitle={`Select all that may apply.`}
                    value={intrestedCategories}
                    onSelection={(value, isSelected) => {
                        let newCategories = [...intrestedCategories]

                        if (isSelected) {
                            newCategories.push(value)
                        } else {
                            newCategories = newCategories.filter(cat => cat !== value)
                        }
                        dispatch({
                            type: 'set_interesting_categories',
                            intrestedCategories: newCategories
                        })                        
                    }}
                    />
            </View>
            <View style={{ alignItems: 'center', margin: 20 }}>
                
            </View>
            <View style={{ position: 'absolute', bottom: 20, width: '100%', padding: 20 }}>
                <Button style={{borderRadius: 20, backgroundColor:'#142C8E'}} full onPress={() => {
                    navigation.navigate('AssesmentCompleted')
                }}>
                    <Text>Next</Text>
                </Button>
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
});

export default App;