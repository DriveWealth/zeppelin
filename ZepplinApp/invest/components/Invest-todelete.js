import React, {useState} from 'react';

import {InvestmentProvider} from '../InvestmentContext';

import Dashboard from '../pages/dashboard';
// import StockDetail from '../pages/stock-detail';
// import StockStats from '../pages/stock-stats';

const PAGES = {
  DASHBOARD: 'DASHBOARD',
  STOCK_DETAIL: 'STOCK_DETAIL',
  STOCK_STATS: 'STOCK_STATS',
};

const Invest = ({navigation}) => {
  const [stockSymbol, setStockSymbol] = useState('SBUX');
  const [page, setPage] = useState(PAGES.STOCK_STATS);

  const handleOnStockSymbolPress = symbol => {
    setStockSymbol(symbol);
    // setPage(PAGES.STOCK_DETAIL);
    navigation.navigate('Order')
  };

  return (
    <InvestmentProvider>
      <Dashboard onStockSymbolPress={handleOnStockSymbolPress} />
    </InvestmentProvider>
  );

  // return (
  //   <InvestmentProvider>
  //     {page === PAGES.DASHBOARD && (
  //       <Dashboard onStockSymbolPress={handleOnStockSymbolPress} />
  //     )}

  //     {page === PAGES.STOCK_DETAIL && (
  //       <StockDetail setPage={setPage} stockSymbol={stockSymbol} />
  //     )}

  //     {page === PAGES.STOCK_STATS && (
  //       <StockStats setPage={setPage} stockSymbol={stockSymbol} />
  //     )}
  //   </InvestmentProvider>
  // );
};

export default Invest;
