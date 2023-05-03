import React, { useContext, useEffect, useState } from "react";
import { WebView } from "react-native-webview";
import {
  Box,
  Center,
  Text,
  VStack,
  ScrollView,
  HStack,
  Image,
} from "native-base";
import { NewsContext } from "../NewsProvider";
import { Platform } from "react-native";

const BrowserWebView = ({ htmlSnippet, timeAgo }) => {
  return (
    <>
      <div
        style={{
          lineHeight: 1.3,
          marginTop: 10,
          fontSize: 14,
          fontFamily: "Arial",
          // color: "#FFFFFF",
        }}
        dangerouslySetInnerHTML={{ __html: htmlSnippet }}
      />
      {/* <span>{timeAgo}</span> */}
    </>
  );
};
const News = ({ navigation, route }) => {
  const { news } = useContext(NewsContext);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      display={news.length < 1 ? "none" : undefined}
    >
      <VStack
        space="3"
        // _dark={{
        //   bg: "blueGray.700",
        // }}
        // _light={{
        //   bg: "blueGray.800",
        // }}
      >
        {/* <Text
          style={{
            fontSize: 20,
            color: "#FFFFFF",
            textAlign: "center",
            fontWeight: "bold",
            width: "100%",
            textAlign: "left",
            // marginLeft: 1,
            // marginRight: 10,
            margin: 30,
            marginBottom: 0,
          }}
        >
          News
        </Text> */}
        {news.map((newsItem, index) => {
          return (
            <Box
              // _dark={{
              //   bg: "blueGray.800",
              // }}
              // _light={{
              //   bg: "blueGray.900",
              // }}
              style={{
                borderRadius: 10,
                padding: 10,
                margin: 10,
                marginBottom: 0,
                marginTop: 0,
              }}
              key={`idx-${index}`}
            >
              <Text fontSize="lg" style={{ 
                // color: "#FFFFFF" 
              }}>
                {newsItem.title}
              </Text>
              {Platform.OS === "web" && <BrowserWebView {...newsItem} />}
              {!(Platform.OS === "web") && (
                <WebView
                  originWhitelist={["*"]}
                  style={{
                    lineHeight: 1.2,
                    fontSize: 20,
                    marginTop: 10,
                    height: 60,
                    fontFamily: "Arial",
                    backgroundColor: "transparent",
                  }}
                  source={{
                    html: `<html>
                      <head>
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <style>
                          body { font-size: 90%; font-family: Arial; word-wrap: break-word; overflow-wrap: break-word; margin: 0px }
                          div { line-height: 1.2; }
                        </style>
                      </head>
                      <body>
                        ${newsItem.htmlSnippet}
                      </body>
                      </html>`,
                  }}
                />
              )}
            </Box>
          );
        })}
      </VStack>
    </ScrollView>
  );
};

export default News;
