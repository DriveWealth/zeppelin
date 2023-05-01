import React, {
  useEffect,
  createContext,
  useReducer,
  useContext,
  useMemo,
} from "react";
import { useQuery } from "react-query";
import Constants from 'expo-constants';

// import * as Keychain from 'react-native-keychain';
import config from "./config";
import { AuthContext } from "./FirebaseProvider";
import * as api from "./utils/api.js";
import axios from "axios";
import moment from "moment";

import InvestClient from "./lib/drivewealth";

export const InvestmentContext = createContext({});

// const tokenPromise = investClient.getToken()

const initialState = {
  positions: [],
  topGainers: [],
  topLosers: [],
  trending: [],
  env: "sandbox",
  portfolioValue: 0,
  portfolioHistory: {
    timestamp: [],
    equity: [],
    timeframe: "2MIN",
    endDate: moment().subtract(2, "hours").utc().format(),
  },
  isFetchingAccount: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "set_is_fetching_account": {
      return { ...state, isFetchingAccount: action.isFetchingAccount };
    }
    case "set_account": {
      const { account } = action;
      return { ...state, account, isFetchingAccount: false };
    }
    case "set_positions": {
      const { positions } = action;
      // let portfolioValue = (positions || []).reduce((acc, p) => {
      //   console.log(p.symbol, p.currentPrice, p.last);
      //   return acc + (p.currentPrice || 0) * p.qty;
      // }, 0.0);
      // return {...state, positions, portfolioValue};

      // // const {positions, totalValue} = action;

      return { ...state, positions };
    }
    case "set_portfolio_history": {
      const { portfolioHistory } = action;
      let newHistory = { ...state.portfolioHistory, ...portfolioHistory };
      return { ...state, portfolioHistory: newHistory };
    }
    case "set_orders": {
      const { orders } = action;
      // let newOrders = (orders || []).sort((a, b) => {
      //   return b.updatedAt > a.updatedAt ? 1 : -1;
      // });
      // console.log(newOrders, '<<<<,newOrders')
      return { ...state, orders };
    }
    case "set_movers": {
      const { topGainers, topLosers } = action;
      return { ...state, topGainers, topLosers };
    }
    case "set_trending": {
      const { securities } = action;
      return { ...state, trending: securities };
    }
    case "env": {
      const { env } = action;
      return { ...state, env };
    }
    case "set_anchor_id_token": {
      const { idToken } = action;
      if (idToken === null) {
        return {
          positions: [],
          topGainers: [],
          topLosers: [],
          env: "sandbox",
        };
      }
      return { ...state, anchorIdToken: idToken };
    }
    case "set_asset": {
      const { asset } = action;
      if (!asset) {
        return { ...state, asset: null };
      }
      const isInPortfolio = !!state.positions.equityPositions.find(
        (p) => p.symbol === asset.symbol
      );
      console.log("ASSET isInPortfolio", isInPortfolio);
      return { ...state, asset: { ...asset, isInPortfolio } };
    }
    case "set_instrument": {
      const { instrument } = action;
      return { ...state, instrument };
    }
    case "set_instruments": {
      const { instruments } = action;
      return { ...state, instruments };
    }
    case "set_order_details": {
      const { orderDetails } = action;
      return { ...state, orderDetails };
    }
    default:
      console.log("Default");
      return state;
  }
}

const fetchAccount = (investClient) => async () => {
  try {
    const accounts = await investClient.getAccounts();
    if (!accounts || accounts.length === 0) return null;
    const { account } = await investClient.getAccount(accounts[0].id);
    // console.log(account, "<<< Acct");
    return account;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const fetchPositions =
  (investClient) =>
  async ({ id }) => {
    const positions = await investClient.getPositions(id);
    return positions;
  };

const fetchOrders = (investClient) => async ({id}) => {
  const orders = await investClient.getOrders(id);
  return orders
};

const fetchAsset = (investClient) => async (symbol) => {
  try {
    const asset = await investClient.getAsset(symbol);
    return asset;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const fetchBars = (investClient) => async (instrumentID, timeframe, start, end) => {   
  try {
    const bars = await investClient.getBars({
      instrumentID,
      timeframe,
      start,
      end,
    });
    return bars;
  } catch (e) {
    console.log(e);
    return null
  }
};

const InvestmentProvider = ({ children, authHeaders, lookupSymbol }) => {
  const investClient = InvestClient({ authHeaders, baseUrl: Constants.expoConfig.extra.drivewealth.apiUrl });
  const [state, dispatch] = useReducer(reducer, {...initialState, lookupSymbol});
  const { user } = useContext(AuthContext);

  const account = useQuery("account", fetchAccount(investClient), {enabled: false});

  const positions = useQuery(
    ["positions", account.data],
    () => account.data && fetchPositions(investClient)(account.data)
  );
  const orders = useQuery(
    ["orders", account.data],
    () => account.data && fetchOrders(investClient)(account.data)
  );

  useEffect(() => {
    // const timer = setInterval(() => {
    if (!user) return;
    account.refetch();
    // fetchInstruments();
    // refetchPositions()
    // fetchPortfolioHistory()
    // fetchOrders()
    // }, 10000)
    // fetchMarketData()

    // // fetchOnboardingAndHoldings();
    // return () => clearInterval(timer)
  }, [user]);

  useEffect(() => {
    if (!account.data) return;
    positions.refetch(account.data.id);
    orders.refetch(account.data.id);
    // fetchOrders();
  }, [account.data]);

  const fetchOnboardingAndHoldings = async () => {
    try {
      // const paypalId = user.uniqueId
      const paypalId = "111"; // HARDCODING FOR NOW
      // THE PROFILE TABLE CURRENTLY HAS NO FIELD TO BE ABLE TO LINK IT WITH THE PAYPAL ACCOUNT NUMBER. THEREFORE AT THE MOMENT WE ARE HARDCODING A PROFILE ID VALUE SO THAT WE CAN DO CREATE ONBOARDING OBJECTS AND FETCH HOLDINGS.

      // FOR DEMOING PURPOSES, IF YOU WANT AN UNBOARDED USER FLOW THEN HARCODE A PROFILE ID THAT YOU ARE SURE ISNT IN THE DABASE, SOMETHING LIKE 1000. IF YOU WANT TO RECREATE AN ONBOARDED USER FLOW THEN HARDCODE AN ID THAT YOU HAVE PREVIOUSLY FINISHED AN ONBOARDING FLOW WITH.

      // AS OF THIS MOMENT, THIS ID "11" HAS BEEN ONBOARDED AND HAS SOME HOLDINGS THAT DISPLAY IN A CHART.

      const response = await api.getOnboardingByProfile(paypalId);
      if (response.data) {
        const onboardingData = response.data.getOnboardingByProfile;
        console.log("----das onboardingData ", onboardingData);
        const formattedHoldings = await fetchAndFormatHoldings(paypalId);
        dispatch({
          type: "set_account",
          account: onboardingData,
        });
        dispatch({
          type: "set_positions",
          positions: formattedHoldings,
        });
      } else {
        console.log("response.data is null");
        return dispatch({
          type: "set_account",
          account: null,
        });
      }
    } catch (error) {
      console.log("--fetchOnboardingAndHoldings error ", error);
    }
  };

  const createUser = async ({
    basic,
    identification,
    personal,
    address,
    employment,
    profile,
    disclosures,
  }) => {
    try {
      const investUser = await investClient.createUser({
        userType: "INDIVIDUAL_TRADER",
        // "wlpID":"DWTT",
        documents: [
          {
            type: "BASIC_INFO",
            data: basic,
          },
          {
            type: "IDENTIFICATION_INFO",
            data: identification,
          },
          {
            type: "PERSONAL_INFO",
            data: personal,
          },
          {
            type: "ADDRESS_INFO",
            data: address,
          },
          {
            type: "EMPLOYMENT_INFO",
            data: employment,
          },
          {
            type: "INVESTOR_PROFILE_INFO",
            data: profile,
          },
          {
            type: "DISCLOSURES",
            data: disclosures,
          },
        ],
        // "parentIBID":"acb33c..."
      });
      return investUser;
    } catch (e) {
      console.log(e);
      dispatch({
        type: "set_account",
        account: null,
      });
    }
  };

  const createAccount = async (userID) => {
    const acct = await investClient.createAccount({
      accountManagementType: "SELF",
      tradingType: "CASH",
      userID,
      accountType: "LIVE",
    });
    return acct;
  };

  const createOrder = async ({ symbol, quantity, side }) => {
    try {
      const payload = {
        symbol,
        side,
        quantity,
        orderType: "MARKET",
      };
      const order = await investClient.createOrder(
        payload,
        account.data.accountNo
      );

      return order;
    } catch (error) {
      console.log("-------------------api createorder error ", error);
    }
  };

  const fetchInstruments = async (searchKey) => {
    try {
      if (!searchKey) {
        return dispatch({
          type: "set_instruments",
          instruments: [],
        });
      }
      // await tokenPromise;
      const instruments = await investClient.getInstruments(searchKey);
      // console.log(instruments, '<<< instruments')
      dispatch({
        type: "set_instruments",
        instruments,
      });
    } catch (e) {
      console.log(e);
      dispatch({
        type: "set_instruments",
        account: null,
      });
    }
  };

  const getPortfolioHistory = async (timeframe, endDate) => {
    try {
      const data = {
        query: `{
            portfolioHistory(history: {endDate: "${endDate}", timeframe: "${timeframe}"}) {
              timeframe
              equity
              timestamp
            }
          }`,
      };

      // console.log(data.query)

      const resp = await axios.post(config.appGQUrl, data, {
        headers: {
          "Content-Type": "application/json",
          // 'x-pypl-encrypted-account-number': user.uniqueId,
          "x-api-key": config.appAPIKey,
        },
      });
      const { portfolioHistory } = resp.data.data;
      console.log(portfolioHistory, "portfolio history response <<<<<");
      dispatch({
        type: "set_portfolio_history",
        portfolioHistory,
        timeframe,
        endDate,
      });
    } catch (error) {
      console.log("-------------------api portfolio history error ", error);
    }
  };

  const fetchPortfolioHistory = async () => {
    let { endDate, timeframe } = state.portfolioHistory;

    const resp = await axios.post(
      config.appGQUrl,
      {
        query: `{
          portfolioHistory(history: {endDate: "${endDate}", timeframe: "2MIN"}) {
            timeframe
            equity
            timestamp
          }
        }`,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          // 'x-pypl-encrypted-account-number': user.uniqueId,
          "x-api-key": config.appAPIKey,
        },
      }
    );

    const { portfolioHistory } = resp.data.data;
    portfolioHistory.equity = portfolioHistory.equity.map(
      (e) => Math.round((e + Number.EPSILON) * 100) / 100
    );
    // alert(JSON.stringify(portfolioHistory, null, 2))

    dispatch({
      type: "set_portfolio_history",
      portfolioHistory: { ...portfolioHistory, endDate, timeframe },
    });
  };

  const fetchMarketData = async () => {
    const securities = await api.fetchMarketData();
    dispatch({
      type: "set_trending",
      securities,
    });
  };

  const fetchAndFormatHoldings = async (profileId) => {
    try {
      const response = await api.getHoldings(profileId);
      let holdings = response.data.getHoldings;
      let formattedHoldings = [];
      const result = holdings.map(async (holding) => {
        const res1 = await api.getHoldingBasicInfo(holding.symbol);
        const title = res1.data.security.title;
        const res2 = await api.getHoldingHistoricalPrice(holding.symbol);
        const oneYearOfPrices = res2.data.historicalPrice.bars;
        const oneMonthOfPrices = oneYearOfPrices.slice(0, 31);
        const yesterdayInfo = oneMonthOfPrices[oneMonthOfPrices.length - 1];
        const todayPrice = yesterdayInfo.closePrice;
        const twoDaysAgoInfo = oneMonthOfPrices[oneMonthOfPrices.length - 2];
        const changeToday = twoDaysAgoInfo.closePrice - todayPrice;
        const formatted = {
          symbol: holding.symbol,
          name: title,
          month: oneMonthOfPrices,
          marketValue: todayPrice,
          changeToday,
        };
        return formatted;
      });
      formattedHoldings = await Promise.all(result);
      return formattedHoldings;
    } catch (error) {
      console.log("-------------------fetchAndFormatHoldings error ", error);
    }
  };

  // useEffect(() => {
  //   refreshIdToken();
  // }, [state.username, state.password]);

  // console.log(positionsData, "<<< positionsData");
  return (
    <InvestmentContext.Provider
      value={{
        ...state,
        account, //: { data: account.data, status: accountStatus },
        positions, //: { data: positionsData, status: positionsStatus },
        orders,
        ...api,
        createUser,
        createAccount,
        createOrder,
        fetchAccount: account.refetch,
        fetchPositions: positions.refetch,
        fetchOrders: orders.refetch,
        fetchPortfolioHistory,
        getPortfolioHistory,
        fetchInstruments,
        fetchAsset: fetchAsset(investClient),
        fetchBars: fetchBars(investClient),
        // saveAnchorCreds,
        // resetAnchorCreds,
        // getAnchorCreds,
        dispatch,
      }}
    >
      {children}
    </InvestmentContext.Provider>
  );
};

export default InvestmentProvider;
