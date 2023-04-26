import axios from 'axios';
import config from '../config';

const getOnboardingByProfile = async profileId => {
  try {
    const data = JSON.stringify({
      query: `query {
        getOnboardingByProfile(profileId: "${profileId}") {
          id
          profileId
          type
          address
          dob
          employmentType
          company
          designation
          income
          ssn
          itin
          kycStatus
          phoneConfStatus
          investExperience
          financialFuture
        }
      }`,
      variables: {},
    });
    const axiosConfig = {
      method: 'post',
      url: config.onboardingGQUrl,
      headers: {
        'x-api-key': config.onboardingAPIKey,
        'Content-Type': 'application/json',
      },
      data: data,
    };
    const response = await axios(axiosConfig);
    return response.data;
  } catch (error) {
    console.log('-------------------api getOnboardingByProfile error ', error);
  }
};

const getHoldings = async profileId => {
  try {
    const data = JSON.stringify({
      query: `query {
        getHoldings(id: "${profileId}") {
          symbol
          quantity
        }
      }`,
      variables: {},
    });
    const axiosConfig = {
      method: 'post',
      url: config.onboardingGQUrl,
      headers: {
        'x-api-key': config.onboardingAPIKey,
        'Content-Type': 'application/json',
      },
      data: data,
    };
    const response = await axios(axiosConfig);
    return response.data;
  } catch (error) {
    console.log('-------------------api getHoldings error ', error);
  }
};

const getHoldingBasicInfo = async symbol => {
  try {
    const data = JSON.stringify({
      query: `query {
        security(symbol: "${symbol}") {
          title
          type
        }
      }`,
      variables: {},
    });
    const axiosConfig = {
      method: 'post',
      url: config.gqlUrl,
      headers: {
        'x-api-key': config.apiKey,
        'Content-Type': 'application/json',
      },
      data: data,
    };
    const response = await axios(axiosConfig);
    return response.data;
  } catch (error) {
    console.log('-------------------getHoldingBasicInfo error ', error);
  }
};

const getHoldingHistoricalPrice = async symbol => {
  try {
    const data = JSON.stringify({
      query: `query {
        historicalPrice(symbol: "${symbol}") {
          bars {
            UTCOffset
            closePrice
            endDate
            endTime
            highPrice
            lowPrice
            openPrice
            startDate
            startTime
            trades
            volume
          }
        }
      }`,
      variables: {},
    });
    const axiosConfig = {
      method: 'post',
      url: config.gqlUrl,
      headers: {
        'x-api-key': config.apiKey,
        'Content-Type': 'application/json',
      },
      data: data,
    };
    const response = await axios(axiosConfig);
    return response.data;
  } catch (error) {
    console.log('-------------------getHoldingHistoricalPrice error ', error);
  }
};

const postOnboarding = async body => {
  try {
    const {
      profileId,
      type,
      address,
      dob,
      employmentType,
      company,
      designation,
      income,
      ssn,
      itin,
      kycStatus,
      phoneConfStatus,
      investExperience,
      financialFuture,
    } = body;
    const data = JSON.stringify({
      query: `mutation {
        postOnboarding(
          profileId: “${profileId}“,
          type: “${type}“,
          address: “${address}“,
          dob: ${dob},
          employmentType: “${employmentType}“,
          company: “${company}“,
          designation: “${designation}“,
          income: “${income}“,
          ssn: “${ssn}“,
          itin: “${itin}“,
          kycStatus: “${kycStatus}“,
          phoneConfStatus: “${phoneConfStatus}“,
          investExperience: “${investExperience}“,
          financialFuture: “${financialFuture}”
        ) {
          id
          profileId
          type
          address
          dob
          employmentType
          company
          designation
          income
          ssn
          itin
          kycStatus
          phoneConfStatus
          investExperience
          financialFuture
        }
      }`,
      variables: {},
    });
    const axiosConfig = {
      method: 'post',
      url: config.gqlUrl,
      headers: {
        'x-api-key': config.onboardingAPIKey,
        'Content-Type': 'application/json',
      },
      data: data,
    };
    const response = await axios(axiosConfig);
    console.log('----postOnboarding', response.data);
    return response.data;
  } catch (error) {
    console.log('-------------------postOnboarding error ', error);
  }
};

const postProfile = async body => {
  const {tenant, accountNumber} = body;
  try {
    const data = JSON.stringify({
      query: `mutation {
        postProfile( 
          tenant: ${tenant}, 
          accountNumber: ${accountNumber}
        ) {
          profileId
          tenant
          accountNumber
        }
      }`,
      variables: {},
    });
    const axiosConfig = {
      method: 'post',
      url: config.onboardingGQUrl,
      headers: {
        'x-api-key': config.onboardingAPIKey,
        'Content-Type': 'application/json',
      },
      data: data,
    };
    const response = await axios(axiosConfig);
    console.log('----postProfile', response.data);
    return response.data;
  } catch (error) {
    console.log('-------------------postProfile error ', error);
  }
};

// const createOrder = async ({symbol, qty, side}) => {
//   try {
//     const data = {
//       operationName: 'createOrder',
//       query: `
//         mutation createOrder($order: OrderInput!) {
//           createOrder(order: $order) {
//             id
//           }
//         }`,
//       variables: {
//         order: {
//           qty: qty,
//           symbol: symbol,
//           side,
//           type: 'Market',
//           timeInForce: 'Day',
//         },
//       },
//     };

//     const response = await axios.post(config.appGQUrl, data, {
//       headers: {
//         'x-api-key': config.appAPIKey,
//         'Content-Type': 'application/json',
//       },
//     });
//     console.log(response.data, 'create order response')
//     console.log(response.errors, 'create order errors')
//     return response.data;
//   } catch (error) {
//     console.log('-------------------api createorder error ', error);
//   }
// };


const fetchMarketData = async () => {
  try {
    const response = await axios.post(config.gqlUrl, {
      query: `query {
          trendingSecurities(first: 10) {            
            edges {
              node {
                logo
                title
                symbol
                exchange
                quote {
                  last {
                    amount {
                      value
                    }
                  }
                  open {
                    value
                  }
                }
              }
            }
          }
        }
        `,
      variables: {},
    }, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": config.apiKey,
      },
    });
    
    const {trendingSecurities} = response.data.data
    // console.log(JSON.stringify(trendingSecurities.edges))
    // alert(trendingSecurities)
    const securities = trendingSecurities.edges.filter(e => !!e).map(e => {
      return {
        ...e.node
      }
    })
    return securities
  } catch (error) {
    console.error("error", error);
  }
};

export {
  getOnboardingByProfile,
  getHoldings,
  getHoldingBasicInfo,
  getHoldingHistoricalPrice,
  postOnboarding,
  postProfile,
  // createOrder,
  fetchMarketData,
  // getPortfolioHistory,
};
