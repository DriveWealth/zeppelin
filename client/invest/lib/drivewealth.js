
const fetch = require("axios").default;
// const fetch = require("axios");

// Loading a local instruments cache
const instruments = require('./instruments.json');

// const BASE_URL = "http://localhost:5001/drivewealth-a7e9a/us-central1/proxy";
const BASE_URL = "https://us-central1-drivewealth-a7e9a.cloudfunctions.net/proxy";

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
      // const payload = {
      //   userType: "INDIVIDUAL_TRADER",
      //   wlpID: "",
      //   documents: [
      //     {
      //       type: "BASIC_INFO",
      //       data: {
      //         firstName: "Shafiq",
      //         lastName: "Khader",
      //         country: "USA",
      //         phone: "+14029361205",
      //         emailAddress: "foo+boo@gmail.com",
      //         language: "en_US",
      //       },
      //     },
      //   ],
      // };
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
      // const url = `${baseUrl}/back-office/instruments`;
      // const resp = await fetch.get(url, {
      //   headers,
      // });
      // if (resp.status !== 200) {
      //   throw new Error("Error retreiving instruments from DW");
      // }
      // const instruments = resp.data;
      // console.log(JSON.stringify(instruments, null, 2));
      // return instruments;
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

      // const resp = await fetch(
      //   `${baseUrl}/v1/trading/accounts/${alpacaAccountId}/positions`,
      //   {
      //     headers,
      //   }
      // );
      // // console.log(resp.status, '<<<<,')
      // if (resp.status !== 200) {
      //   throw new Error("Error retreiving positions from Alpaca");
      // }
      // const positions = await resp.json();
      // return positions;
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

// const client = Drivewealth({
//   authHeaders: {
//     'id-token': 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImQ3YjE5MTI0MGZjZmYzMDdkYzQ3NTg1OWEyYmUzNzgzZGMxYWY4OWYiLCJ0eXAiOiJKV1QifQ.eyJkd1VzZXJJZCI6IjU2ZGY5YmRhLTRmNmItNGYxZS1iNDk5LTNjMDU0ZDkxN2ZjNSIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9kcml2ZXdlYWx0aC1hN2U5YSIsImF1ZCI6ImRyaXZld2VhbHRoLWE3ZTlhIiwiYXV0aF90aW1lIjoxNjY4NDgzNDI1LCJ1c2VyX2lkIjoiYmFVQlYwYjRObE5DcTN4OWZXc25Fc2VTVFM5MyIsInN1YiI6ImJhVUJWMGI0TmxOQ3EzeDlmV3NuRXNlU1RTOTMiLCJpYXQiOjE2Njg1NDU0MTgsImV4cCI6MTY2ODU0OTAxOCwiZW1haWwiOiJhbmFpZHVAZHJpdmV3ZWFsdGgudGVjaCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJhbmFpZHVAZHJpdmV3ZWFsdGgudGVjaCJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.brf9ikL45tN_yMzN3sQJ_vZzAaGmEKkin2llSiuLUNtpi7vhpDxEoYd5GJ0K-6--hw17vlohG3K6HwJINROFhijdvFXMP4FJsdO61PpekQPb2ky64mrYSilUBwCQj4ebIUL6F8d5CQjKRqyy5PKQAH9v8lNxvxczyVycnwh_S9ezhxpGkOOUsGlxZkhULUgWrnHNR_rJv7HEbWNKnmlsK2kxGEHMgOm_dHIW3oarxuH2Gw7S30EehVEHCS7VH-vcHBtSbRQv0Mo6CqOJNgAzFnBo3ZFajYxgx-VulB_dlztKbjKP1gM7AozP-gBqbllekeASUmjvKDhmMajckBRBcQ',
//   }
// });

// Create User
// (async function () {
//   try {
//     await client.getToken()
//     const user = await client.createUser({
//       "userType":"INDIVIDUAL_TRADER",
//       // "wlpID":"DWTT",
//       "documents": [
//            {
//                 "type": "BASIC_INFO",
//                 "data": {
//                     "firstName": "Ishan",
//                     "lastName": "Goldie",
//                     "username": "ishan",
//                     "country": "USA", 
//                     "phone": "+14089833837",
//                     "emailAddress": "foobar1@gmail.com",
//                     "language": "en_US"
//                 }
//             },
//             {
//                 "type": "IDENTIFICATION_INFO",
//                 "data": {
//                     "value": "123456989",
//                     "type": "SSN",
//                     "citizenship": "USA"
//                 }
//             },
//             {
//                 "type": "PERSONAL_INFO",
//                 "data": {
//                     "birthDay": 3,
//                     "birthMonth": 12,
//                     "birthYear": 1990,
//                     "politicallyExposedNames": null
//                 }
//             },
//             {
//                 "type": "ADDRESS_INFO",
//                 "data": {
//                     "street1": "123 Main St",
//                     "city": "Chatham",
//                     "province": "NJ",
//                     "postalCode": "09812"
//                 }
//             },
//             {
//                 "type": "EMPLOYMENT_INFO",
//                 "data": {
//                     "status": "Employed",
//                     "broker": false,
//                     "type": "PROFESSIONAL",
//                     "position": "Police"
//                 }
//             },
//             {
//                 "type": "INVESTOR_PROFILE_INFO",
//                 "data": {
//                     "investmentObjectives": "Active_DAIly",
//                     "investmentExperience": "None",
//                     "annualIncome": 75000, 
//                     "networthLiquid": 58932,
//                     "networthTotal": 485003,
//                     "riskTolerance": "Low"
//                 }
//             },
//             {
//                 "type": "DISCLOSURES",
//                 "data": {
//                     "termsOfUse": true,
//                     "customerAgreement": true,
//                     "marketDataAgreement": true,
//                     "rule14b": true,
//                     "findersFee": false,
//                     "privacyPolicy": true,
//                     "dataSharing": true,
//                     "signedBy": "Chris Turkelton"
//                 }
//             }        
//       ],
//       // "parentIBID":"acb33c..."
//     });
//     console.log(user, '<<<')
//   } catch (e) {
//     console.log('Error', e.response.data, e.response.status)
//   }
// })();

// Update User
// (async function () {
//   try {
//     await client.getToken()
//     const user = await client.createUser();
//     console.log(user, '<<<')
//   } catch (e) {
//     console.log('Error', e.response.data, e.response.status)
//   }
// })();

// Create User
// (async function () {
//   try {
//     await client.getToken()
//     const user = await client.createUser();
//     console.log(user, '<<<')
//   } catch (e) {
//     console.log('Error', e.response.data, e.response.status)
//   }
// })();

// Create Account
// (async function () {
//   try {
//     await client.getToken()
//     const acct = await client.createAccount({
//       accountManagementType: 'SELF',
//       tradingType: 'CASH',
//       userID: '56df9bda-4f6b-4f1e-b499-3c054d917fc5',
//       accountType: 'LIVE'
//     });
//     console.log(acct, '<<<')
//   } catch (e) {
//     console.log('Error', e)
//   }
// })();

// Get Account
// (async function () {
//   try {
//     await client.getToken()
//     const acct = await client.getAccount('56df9bda-4f6b-4f1e-b499-3c054d917fc5.1667592550097');
//     console.log(acct, '<<<')
//   } catch (e) {
//     console.log('Error', e)
//   }
// })();

// Get Instruments
// (async function () {
//   try {
//     await client.getToken()
//     const acct = await client.getAccount('56df9bda-4f6b-4f1e-b499-3c054d917fc5.1667592550097');
//     console.log(acct, '<<<')
//   } catch (e) {
//     console.log('Error', e)
//   }
// })();

// Get Positions
// (async function () {
//   try {
//     await client.getToken()
//     const acct = await client.getPositions('56df9bda-4f6b-4f1e-b499-3c054d917fc5.1667592550097');
//     console.log(acct, '<<<')
//   } catch (e) {
//     console.log('Error', e)
//   }
// })();

// Get Asset
// (async function () {
//   try {
//     await client.getToken()
//     const acct = await client.getAsset('AAPL', '56df9bda-4f6b-4f1e-b499-3c054d917fc5');
//     console.log(acct, '<<<')
//   } catch (e) {
//     console.log('Error', e)
//   }
// })();

// Create Order
// (async function () {
//   try {
//     await client.getToken();
//     const order = await client.createOrder(
//       {
//         side: "BUY",
//         orderType: "MARKET",
//         symbol: "AAPL",
//         quantity: 1.0,
//       },
//       "DSUW000003"
//     );
//     console.log(order, "<<<");
//   } catch (e) {
//     console.log("Error", e.response.data, e.response.status);
//   }
// })();


// Get Bars
// (async function () {
//   try {
//     const bars = await client.getBars(
//       {
//         instrumentID: "a67422af-8504-43df-9e63-7361eb0bd99e",
//         timeframe: 0,
//         start: '2022-11-01T00:00:00Z',
//         end: '2022-11-15T00:00:00Z',
//       }
//     );
//     console.log(bars, "<<<");
//   } catch (e) {
//     console.log(e)
//     // console.log("Error", e.response.data, e.response.status);
//   }
// })();

