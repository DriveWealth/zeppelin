
const fetch = require("axios").default;

// Loading a local instruments cache
const instruments = require('./instruments.json');

const BASE_URL = "http://localhost:5002";
// const BASE_URL =  "https://us-central1-drivewealth-a7e9a.cloudfunctions.net/proxy";

const Drivewealth = ({ baseUrl = BASE_URL, authHeaders }) => {
  const headers = {
    "cache-control": "no-cache",
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...authHeaders,
  };

  const dw = {
    // Creates an account in Alpaca that is automatically approved
    async createUser(payload) {
      const url = `${baseUrl}/back-office/users`;
      const resp = await fetch.post(url, payload, {
        headers,
      });
      if (resp.status !== 200) {
        throw new Error("Error creating user");
      }
      return resp.data;
    },
    async createAccount({
      userID,
      accountType,
      accountManagementType,
      tradingType,
    }) {
      const payload = {
        userID,
        accountType,
        accountManagementType,
        tradingType,
      };

      const resp = await fetch.post(`${baseUrl}/back-office/accounts`, payload, {
        headers,
      });
      if (resp.status !== 200) {
        console.log(resp.status);
        throw new Error("Error creating account in DW");
      }
      const account = resp.data;
      return account;
    },
    async getAccounts() {
      const url = `${baseUrl}/back-office/users/USER_ID/accounts`;
      const resp = await fetch.get(url, {
        headers,
      });
      if (resp.status !== 200) {
        throw new Error("Error retreiving account from DW");
      }
      return resp.data;
    },
    async getAccount(accountNo) {
      const url = `${baseUrl}/back-office/accounts/${accountNo}`;
      const resp = await fetch.get(url, {
        headers,
      });
      if (resp.status !== 200) {
        throw new Error("Error retreiving account from DW");
      }
      return resp.data;
    },
    async getInstruments(searchKey = '') {
      // Trading
      // /v1/trading/accounts/{account_id}/account

      // Brokerage
      // /v1/accounts/{account_id}

      // const url = `${baseUrl}/v1/accounts/${alpacaAccountId}`
      const re = new RegExp(searchKey.toUpperCase(), 'i');
      const filtered = instruments.filter(instrument => {
        // console.log(instrument.symbol.match(searchKey.toUpperCase()))
        // return instrument.symbol.match(searchKey.toUpperCase())
        return re.test(instrument.symbol)
      })

      return filtered;
    },
    async getPositions(accountID) {
      const url = `${baseUrl}/back-office/accounts/${accountID}/summary/positions`;
      const resp = await fetch.get(url, {
        headers,
      });
      if (resp.status !== 200) {
        throw new Error("Error retreiving positions from DW");
      }
      const positions = resp.data;
      // console.log(JSON.stringify(positions, null, 2));
      return positions;
    },
    async getAsset(symbol, customerUserId) {
      //  Asset data
      const resp = await fetch.get(`${baseUrl}/back-office/instruments/${symbol}`, {
        headers,
      });
      
      if (resp.status !== 200) {
        throw new Error("Error retreiving asset from DW");
      }
      const asset = resp.data;
      // Snapshot
      const snapResp = await fetch.get(`${baseUrl}/back-office/quotes/vdr`, {
        headers: {...headers },
        params: {
          symbols: symbol
        }
      });
      console.log(snapResp.status, "<<<,");
      if (snapResp.status !== 200) {
        throw new Error("Error retreiving quote from DW");
      }
      const snap = snapResp.data[0];
      // snapResp.data.split('|')
      // console.log(snapResp.data);
      // fs.writeFileSync(__dirname + '/tmp.txt', snap);
      // const snap = snapResp.data.filter(sn => sn.symbol === symbol)[0]
      const changeToday = snap.change;
      const percentChangeToday = parseFloat(
        (changeToday / snap.open) * 100
      );

      return {
        ...asset,
        ...snap,
        latestTradePrice: snap.lastTrade,
        latestQuoteAskingPrice: snap.ask,
        changeToday: parseFloat(Number(changeToday).toFixed(2)),
        percentChangeToday: parseFloat(
          Number(Math.abs(percentChangeToday)).toFixed(2)
        ),
      };
    },
    async createOrder(orderInput, accountNo) {
      //  Create Order
      const { symbol, side, quantity, orderType } = orderInput;

      const payload = {
        symbol,
        side,
        quantity,
        orderType,
        accountNo,
      };
      const url = `${baseUrl}/back-office/orders`;
      const resp = await fetch.post(url, payload, {
        headers,
      });
      if (resp.status !== 200) {
        throw new Error("Error placing order");
      }
      return resp.data;
    },
    async getOrders(accountID) {
      const resp = await fetch(
        `${baseUrl}/back-office/accounts/${accountID}/summary/orders`,
        {
          headers,
        }
      );
      // console.log(resp.status, '<<Orders resp')
      if (resp.status !== 200) {
        throw new Error("Error retreiving orders from DW");
      }
      const {orders} = resp.data;
      // console.log(orders, '<<<,orders')
      return orders;
    },
    async getBars({instrumentID, start, end, timeframe}) {
      const url = `${baseUrl}/back-office/bars?instrumentID=${instrumentID}&compression=${timeframe}&dateStart=${start}&dateEnd=${end}`;
      console.log(url);
      const resp = await fetch.get(url, {
        headers,
      });
      if (resp.status !== 200) {
        throw new Error("Error retreiving orders from Alpaca");
      }
      return resp.data
    },
    async getToken() {
      const url = `${baseUrl}/back-office/auth/tokens`;
      const resp = await fetch.post(
        url,
        {
          clientID,
          clientSecret,
        },
        {
          headers,
        }
      );
      if (resp.status !== 200) {
        throw new Error("Error retreiving account from DW");
      }
      const { access_token, token_type, expires_in, scope } = resp.data;
      // console.log(JSON.stringify(resp.data, null, 2));
      if (access_token) {
        headers["Authorization"] = `Bearer ${access_token}`;
      }
      return {
        type: token_type,
        accessToken: access_token,
        expiresIn: expires_in,
        scope,
      };
    },
  };
  return dw;
};

module.exports = Drivewealth;
