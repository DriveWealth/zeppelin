import React, {useContext} from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  StatusBar,
  Image,
  NativeModules,
} from 'react-native';
import {InvestmentContext} from '../../InvestmentProvider';
import {useNavigation} from '@react-navigation/native';
import {Button, Text, Box, VStack, HStack, Center} from 'native-base';
import numeral from 'numeral';

const {MiniAppsManager} = NativeModules;

const Item = ({
  symbol,
  title,
  quote,
  percentChangeToday,
  currentPrice,
  lastdayPrice,
  handleTap,
}) => {
  let changeToday = quote.last.amount.value - quote.open.value;
  return (
    <TouchableOpacity
      onPress={() => {
        // handleTap({symbol});
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flex: 1}}>
          <Text style={{fontSize: 18, textAlign: 'left'}}>{symbol}</Text>
        </View>
        <View style={{flex: 3, padding: 10, textAlign: 'left'}}>
          <Text style={{fontSize: 16}}>{title}</Text>
        </View>
        <View style={[changeToday > 0 ? styles.titleUp : styles.titleDown, {flex: 1,}]}>
          <Text
            style={
              changeToday > 0 ? styles.textUp : styles.textDown
            }>{`${numeral(quote.last.amount.value).format('$0.00')}`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const App = ({limit = 3}) => {
  const {trending} = useContext(InvestmentContext);
  const navigation = useNavigation();
  const handleTap = ({symbol}) => {
    navigation.navigate('Search', {
      symbol,
    });
  };

  const renderItem = ({item}) => {
    return <Item {...item} handleTap={handleTap} />;
  };

  if (trending && trending.length === 0) {
    return null;
  }

  console.log(trending)
  return (
    // <Center>
    <Box  w="100%" bgColor="white" shadow="2" p="2" >
      <VStack>
      <Text
        style={{
          fontSize: 16,
          margin: 5,
          color: "#515354",
          fontWeight: 'bold',
          textAlign: 'left',
          padding: 5,
        }}>
        Trending
      </Text>

        {/* <Center mt="2" px="7">
          <Text fontSize="sm" textAlign="center">
            Stocks that are trending today
          </Text>
        </Center> */}
      </VStack>
      <FlatList
        style={{margin: 10}}
        data={(trending || []).filter(s => !!s.quote)}
        renderItem={renderItem}
        keyExtractor={(item, i) => `trending-${i}`}
      />
    </Box>
    // </Center>
  );
};

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
    borderRadius: 40,
    justifyContent: 'center',
    flex: 1,
    fontSize: 20,
    backgroundColor: '#CBF3EC',
  },
  titleDown: {
    padding: 5,
    borderRadius: 40,
    textAlign: 'center',
    fontSize: 20,
    flex: 1,
    backgroundColor: '#FDDBD3',
  },
  textUp: {
    color: '#25694F',
    textAlign: 'center',
  },
  textDown: {
    color: '#AD2B09',
    textAlign: 'center',
  },
  title: {
    marginTop: 5,
    fontSize: 14,
    flex: 3,
    padding: 5,
  },
  avatar: {
    borderRadius: 25,
    width: 50,
    height: 50,
    backgroundColor: '#761AD3',
    justifyContent: 'center',
    alignItems: 'center',
    // flex: 1,
  },
  avatarText: {
    color: '#FFF',
    // textAlign: 'right',
  },
});

export default App;
