import React, {useEffect, useState} from 'react';

import {Text, VStack, HStack, Image, Center} from 'native-base';

import _ from 'lodash';

import config from '../../config';

const StockDetailNews = ({stockSymbol}) => {
  const [data, setData] = useState({});

  // TODO: create class wrapper for this
  // TODO: add GQL lib to make queries work nicer
  const getStockNews = async symbol => {
    const resp = await fetch(config.gqlUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'x-api-key': config.apiKey,
      },
      body: JSON.stringify({
        operationName: 'getLatestNews',
        query: `
          query getLatestNews {
            news(symbol: "${symbol}") {
              edges {
                node {
                  headline
                  images
                  publishDateTime
                  source
                  summary
                }
              }
            }
          }`,
      }),
    });

    return resp.json();
  };

  useEffect(() => {
    const update = async () => {
      const news = await getStockNews(stockSymbol);
      setData(news.data);
    };

    update();
  }, [stockSymbol]);

  const news = _.get(data, 'news.edges', []);

  return (    
    <VStack p="4" space="3">
      <Text bold>News</Text>
      <VStack space="10">
        {news.length > 0 &&
          news.slice(0, 3).map(n => (
            <VStack key={`${n.node.publishDateTime}`}>
              <Text mb="2">
                {n.node.source} • {n.node.publishDateTime}
              </Text>

              <HStack alignItems="center" justifyContent="space-between">
                <Text w="65%" bold>
                  {n.node.headline}
                </Text>

                {n.node.images.length > 0 && (
                  <Image
                    rounded="lg"
                    height="16"
                    width="16"
                    alt={'news-item-img'}
                    src={n.node.images[0]}
                  />
                )}
              </HStack>
            </VStack>
          ))}
      </VStack>

      <Center>
        <Text bold mt="6" color="blue.500">
          More News
        </Text>
      </Center>
    </VStack>
  );
};

export default StockDetailNews;
