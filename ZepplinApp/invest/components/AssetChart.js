import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  VictoryChart,
  VictoryTheme,
  VictoryLine,
  VictoryBar,
  VictoryAxis,
} from "./Victory";

import moment from "moment";
// import config from '../config'
import { InvestmentContext } from "../InvestmentProvider";
import { Button, HStack } from "native-base";

const App = ({ asset }) => {
  const [data, setData] = useState([]);

  const [params, setParams] = useState({
    selected: "2days",
    timeframe: 8,
    start: moment().utc().subtract(2, "days").startOf("day").format(),
    end: moment().utc().endOf("day").format(),
  });

  const { fetchBars } = useContext(InvestmentContext);

  useEffect(() => {
    fetchBars(asset.id, params.timeframe, params.start, params.end).then(
      (bars) => {
        if (bars.data.length < 1) {
          return setData([]);
        }
        let newData = bars.data.split("|").map((val, i) => {
          let [x, open, high, low, close, volume] = val.split(",");
          // console.log(x, open, close);
          return {
            x: i,
            y: parseFloat(close),
          };
        });
        setData(newData);
      }
    );
  }, [params]);

  var isUp = true;
  if (data.length) {
    isUp = data[data.length - 1].y > data[0].y;
  }

  return (
    <View>
      <VictoryChart
        // theme={VictoryTheme.material}
        style={{ width: 300, }}
      >
        <VictoryAxis
          style={{
            axis: { stroke: "transparent" },
            ticks: { stroke: "transparent" },
            tickLabels: { fill: "transparent" },
          }}
        />
        <VictoryLine
          style={{
            data: { stroke: isUp ? "#38AF88" : "#C20000" },
            parent: { border: isUp ? "1px solid #38AF88" : "1px solid #C20000" },
            width: 200,
          }}
          data={data}
          animate={{
            duration: 500,
            onLoad: { duration: 300 },
          }}
        />
      </VictoryChart>
      <HStack
        mt="-5"
        alignItems="space-around"
        justifyContent="center"
      >
        <Button
          size="sm"
          style={styles.segmentButton}
          variant={
            params.selected === "1day"
              ? "solid"
              : "outline"
          }
          onPress={() => {
            let start = moment().utc().startOf("day").format();
            let end = moment().utc().endOf("day").format();
            setParams({ selected: "1day", timeframe: 4, start, end });
          }}
        >
          Today
        </Button>
        <Button
          size="sm"
          style={styles.segmentButton}
          variant={
            params.selected === "2days"
              ? "solid"
              : "outline"
          }
          onPress={() => {
            let start = moment()
              .utc()
              .subtract(2, "days")
              .startOf("day")
              .format();
            let end = moment().utc().endOf("day").format();
            setParams({ selected: "2days", timeframe: 8, start, end });
          }}
        >
          2 Days
        </Button>
        <Button
          size="sm"
          style={styles.segmentButton}
          variant={
            params.selected === "1week"
              ? "solid"
              : "outline"
          }
          onPress={() => {
            let start = moment()
              .utc()
              .subtract(7, "days")
              .startOf("day")
              .format();
            let end = moment().utc().endOf("day").format();
            setParams({ selected: "1week", timeframe: 8, start, end });
          }}
        >
          1 Week
        </Button>
        <Button
          // variant="outline"
          size="sm"
          style={styles.segmentButton}
          variant={
            params.selected === "1month"
              ? "solid"
              : "outline"
          }
          onPress={() => {
            let start = moment()
              .utc()
              .subtract(30, "days")
              .startOf("day")
              .format();
            let end = moment().utc().endOf("day").format();
            setParams({ selected: "1month", timeframe: 10, start, end });
          }}
        >
          1 Month
        </Button>
      </HStack>
    </View>
  );
};

const styles = StyleSheet.create({
  segmentButton: {
    borderRadius: 4,
    height: 34,
    marginLeft: 4,
    marginRight: 4,
  }
});

export default App;
