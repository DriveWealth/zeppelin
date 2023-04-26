import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Image } from 'react-native';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Markets',
    image: require('./img/market.png')
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'News',
    image: require('./img/news.png')
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Bull Talk',
    image: require('./img/bull.png')
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d73',
    title: 'Bear Talk',
    image: require('./img/bear.png')
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d74',
    title: 'Launch',
    image: require('./img/bull.png')
  },
];

const Item = ({ title, image}) => (
  <View style={styles.item}>
      <Image source={image} />
    <Text style={styles.title}>{title}</Text>
  </View>
);

const App = () => {
  const renderItem = ({ item }) => (
    <Item title={item.title} image={item.image}/>
  );

  return (
    <View>
      <FlatList
        data={DATA}
        horizontal
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: 5
  },
});

export default App;