import React from "react";
import { RefreshControl } from "react-native";

import { ScrollView } from "native-base";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const ScrollablePage = ({ children, onRefresh }) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const handleRefresh = React.useCallback(() => {
    debugger
    setRefreshing(true);
    onRefresh();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <ScrollView
      zIndex="-1"
      h="100%"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
      _contentContainerStyle={{
        // px: "10px",
        mb: "4",
        minW: "72",
        // backgroundColor: 'green'
      }}
    >
      {children}
    </ScrollView>
  );
};

export default ScrollablePage;
