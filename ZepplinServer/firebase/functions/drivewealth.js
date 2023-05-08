const fetch = require("axios");
// const BASE_URL = 'https://bo-api.drivewealth.io';

const Drivewealth = ({
  boAPIUrl,
  dwUsername,
  dwPassword,
  dwAppKey,
  logger,
}) => {
  const dw = {
    cache: null,
    async getToken() {
      const dateNow = Date.now();
      if (dw.cache && dateNow < dw.cache.expiresIn) {
        // Cache is still warm
        logger.info("Cache HIT");
        logger.info(dw.cache.expiresIn, dateNow);
        logger.info(
          "Token is valid for these many more seconds: " +
            (dw.cache.expiresIn - dateNow)
        );
        return dw.cache;
      }
      logger.info("Cache MISS");
      const url = `${boAPIUrl}/back-office/auth`;
      const resp = await fetch.post(
        url,
        {
          username: dwUsername,
          password: dwPassword,
        },
        {
          headers : {
            "cache-control": "no-cache",
            "Content-Type": "application/json",
            "dw-client-app-key": dwAppKey,
          },
        }
      );
      if (resp.status !== 200) {
        throw new Error("Error retreiving account from DW");
      }
      const { authToken, token_type, expires_in, scope } = resp.data;
      // Memoize
      logger.info("Save token to cache authToken.."+authToken);
      dw.cache = {
        type: token_type,
        accessToken: authToken,
        expiresIn: Date.now() + (expires_in - 60),
        scope,
      };

      return dw.cache;
    },
    getHeaders() {
      return {
        "cache-control": "no-cache",
        "Content-Type": "application/json",
        "dw-client-app-key": dwAppKey,
        "dw-auth-token": dw.cache.accessToken,
      };
    },
    async getPositions(accountID) {
      const url = `${boAPIUrl}/back-office/accounts/${accountID}/summary/positions`;
      const resp = await fetch.get(url, {
        headers: dw.getHeaders(),
      });
      if (resp.status !== 200) {
        throw new Error("Error retreiving positions from DW");
      }
      const positions = resp.data;
      return positions;
    },
    async getAsset(symbol, customerUserId) {
      //  Asset data
      const resp = await fetch.get(
        `${boAPIUrl}/back-office/instruments/${symbol}`,
        {
          headers: dw.getHeaders(),
        }
      );

      if (resp.status !== 200) {
        throw new Error("Error retreiving asset from DW");
      }
      const asset = resp.data;
      // Snapshot
      const snapResp = await fetch.get(`${boAPIUrl}/back-office/quotes`, {
        headers: { ...headers },
        params: {
          symbols: symbol,
        },
      });
      console.log(snapResp.status, "<<<,");
      if (snapResp.status !== 200) {
        throw new Error("Error retreiving quote from DW");
      }
      const snap = snapResp.data[0];
      const changeToday = snap.change;
      const percentChangeToday = parseFloat((changeToday / snap.open) * 100);

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
      const url = `${boAPIUrl}/back-office/orders`;

      const resp = await fetch.post(url, payload, {
        headers: dw.getHeaders(),
      });

      if (resp.status !== 200) {
        throw new Error("Error placing order");
      }
      return resp.data;
    },
    async getOrders(accountID) {
      const resp = await fetch(
        `${boAPIUrl}/back-office/accounts/${accountID}/summary/orders`,
        {
          headers: dw.getHeaders(),
        }
      );
      if (resp.status !== 200) {
        throw new Error("Error retreiving orders from DW");
      }
      const { orders } = resp.data;
      return orders;
    },
  };
  return dw;
};

module.exports = Drivewealth;
