import React, {useContext, useEffect, useState} from 'react';
import {LogBox, RefreshControl, View, } from 'react-native';
import {InvestmentContext} from '../InvestmentProvider';
// import Holdings from './../components/Holdings';
// import Portfolio from './../components/Portfolio';
// import Orders from './../components/orders';
// import Trending from './../components/explore/Trending'
// import Offers from './../components/Offers'

// import SearchHero from '../components/dashboard/search-hero';
import axios from 'axios';
// import PortfolioChart from './../components/stock-detail/portfolio_chart';
import ScrollablePage from "../components/ScollablePage";
import News from '../components/News';

const chartImage = require('./../components/img/Chart.png');
const logosImage = require('./../components/img/logos.png');


const InvestUser = ({children}) => {
  
  useEffect(() => {
    console.log('Invest user MOUNTED?????')
  }, [])

  return (
    <>
      <Holdings />
      {/* <PortfolioChart /> */}
      {children}
      {/* <Portfolio /> */}
      {/* <Orders /> */}
    </>
  );
};

// const VirtualizedList = ({children}) => {
//   return (
//       <FlatList
//           data={[]}
//           keyExtractor={() => "key"}
//           renderItem={null}
//           ListHeaderComponent={
//               <>{children}</>
//           }
//       />
//   )
// }

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const Landing = ({navigation, route}) => {
  const {account, dispatch, fetchAccount, fetchPortfolioHistory, fetchOrders, fetchPositions} = useContext(InvestmentContext);
  const [refreshing, setRefreshing] = React.useState(false);

  // console.log(account, '<<<<account')
  const onButtonPress = () => {
    navigation.navigate('Onboarding');
  };

  const handleOnStockSymbolPress = symbol => {
    dispatch({
      type: 'set_asset',
      asset: {symbol, latestTradePrice: 113.0},
    });

    navigation.navigate('Order', {
      params: {stockSymbol: symbol},
    });
  };

  // useEffect(() => {
  //   console.log('Dashboard MOUNTED?????')
  // }, [])

  // if (typeof account === 'undefined') {
  //   return (
  //     <Center safeArea style={{backgroundColor: 'white'}}>
  //       <Box style={{marginTop: 20}} w="100%" h="100%">
  //         <Spinner />
  //       </Box>
  //     </Center>
  //   );
  // }

  

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchPortfolioHistory()
    fetchOrders()
    fetchPositions()
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <ScrollablePage>
    <Center safeArea style={{backgroundColor: 'white'}}>
      <Box w="100%" h="100%">
        <ScrollView zIndex="-1" h="100%" refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
          
          <VStack>
            <Box m="3" >
              <SearchHero onStockSymbolPress={handleOnStockSymbolPress} />
            </Box>
            {/* {account ? <InvestUser /> : null} */}
            {/* <Offers /> */}
            <Divider thickness="10" bgColor="gray.100" />
            {/* <Trending /> */}
            <Divider thickness="10" bgColor="gray.100" />

            <Box my="3">
              <News />
            </Box>
          </VStack>
        </ScrollView>
      </Box>
    </Center>
    </ScrollablePage>
  );
};

export default Landing;
