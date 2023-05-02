import React, {
  useEffect,
  createContext,
  useReducer,
  useContext,
  useMemo,
} from "react";
import { useQuery } from "react-query";
import Constants from 'expo-constants';

import { AuthContext } from "./FirebaseProvider";

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
      return { ...state, positions };
    }
    case "set_portfolio_history": {
      const { portfolioHistory } = action;
      let newHistory = { ...state.portfolioHistory, ...portfolioHistory };
      return { ...state, portfolioHistory: newHistory };
    }
    case "set_orders": {
      const { orders } = action;
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
    if (!user) return;
    account.refetch();
  }, [user]);

  useEffect(() => {
    if (!account.data) return;
    positions.refetch(account.data.id);
    orders.refetch(account.data.id);
    // fetchOrders();
  }, [account.data]);

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
        // ...api,
        createUser,
        createAccount,
        createOrder,
        fetchAccount: account.refetch,
        fetchPositions: positions.refetch,
        fetchOrders: orders.refetch,
        // fetchPortfolioHistory,
        // getPortfolioHistory,
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
