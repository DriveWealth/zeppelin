import React, {useContext} from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Image, NativeModules } from 'react-native';
import { NavigationContext } from '@react-navigation/native';
import { Button } from 'native-base'

var MiniAppsManager = NativeModules.MiniAppsManager;

const Discover = () => {
    const navigation = useContext(NavigationContext)
    const {user} = useContext(DWContxt)

    return <View style={{flex: 1, height: 400, width: 340, margin: 10, backgroundColor: '#761AD3', borderRadius: 12}}>
        <View style={{flex: 2, justifyContent: 'center', alignItems: 'center', paddingtop: 10}}>
            <Image style={{position: 'absolute', width: 200, height: 120}} source={require('./img/Chart.png')} />
            <Image style={{position: 'absolute', width: 200, height: 120}} source={require('./img/logos.png')} />
        </View>
        <View style={{flex: 2, justifyContent: 'center', alignItems: 'center',}}>
            <Text style={{fontSize: 28, color: '#FFF', width: 268, textAlign: 'center', marginTop: 10}}>Get your first stock on us</Text>
            <Text style={{fontSize: 18, color: '#F2E6FE', width: 268, padding: 10, textAlign: 'center'}}>Let us help you get started with  $5 of free stock.</Text>
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
            <View>
          <Button light style={{ borderRadius: 20, backgroundColor: '#FFF' }} onPress={() => {
              // MiniAppsManager.showRoute('Onboarding')
              navigation.navigate('Onboarding')
          }}>
            <Text style={{ color: '#142C8E', marginLeft: 20, marginRight: 20, fontSize: 18 }}>Get Free Stock</Text>
          </Button>
          </View>
        </View>
    </View>
}

const Assessment = ({startOnboarding}) => {
    const navigation = useContext(NavigationContext)
    
    return <View style={{flex: 1, height: 400, width: 340, margin: 10, backgroundColor: '#1040C1', borderRadius: 12}}>
        <View style={{flex: 2, justifyContent: 'center', alignItems: 'center', paddingtop: 10}}>
            <Image style={{position: 'absolute', width: 200, height: 120}} source={require('./img/personalized-graph.png')} />
            <Image style={{position: 'absolute', width: 200, height: 120}} source={require('./img/Illustration.png')} />
        </View>
        <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 30, color: '#FFF', padding: 10, textAlign: 'center'}}>Tell us about yourself</Text>
            <Text style={{fontSize: 16, color: '#D1F1FF', padding: 10, textAlign: 'center'}}>Take our quick assesment for a personalized invest experience</Text>
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
            <View>
          <Button light style={{ borderRadius: 20, backgroundColor: '#FFF' }} onPress={() => {
              // MiniAppsManager.showRoute('Assessment')
          }}>
            <Text style={{ color: '#142C8E', marginLeft: 30, marginRight: 30, fontSize: 18 }}>Take Assessment</Text>
          </Button>
          </View>
        </View>
    </View>
}

const DATA = [
  {
    id: 'markets',
    title: 'Markets',
    image: require('./img/discover.png'),
    Comp: Discover
  },
  {
    id: 'assessment',
    title: 'Assessment',
    image: require('./img/discover.png'),
    Comp: Assessment
  },
//   {
//     id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
//     title: 'News',
//     image: require('./img/news.png')
//   },
//   {
//     id: '58694a0f-3da1-471f-bd96-145571e29d72',
//     title: 'Bull Talk',
//     image: require('./img/bull.png')
//   },
//   {
//     id: '58694a0f-3da1-471f-bd96-145571e29d73',
//     title: 'Bear Talk',
//     image: require('./img/bear.png')
//   },
//   {
//     id: '58694a0f-3da1-471f-bd96-145571e29d74',
//     title: 'Launch',
//     image: require('./img/bull.png')
//   },
];

const Item = ({ title, image}) => (
  <View style={styles.item}>
      <Image source={image} />
    {/* <Text style={styles.title}>{title}</Text> */}
  </View>
);

const App = () => {
  const renderItem = ({ item }) => (
    // <Item title={item.title} image={item.image}/>
    <item.Comp />
  );

  return (
    <View >
      <FlatList
        data={DATA}
        horizontal
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        // style={{width: '100%'}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    // padding: 10,
    // marginVertical: 8,
    marginHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: 5
  },
});

export default App;