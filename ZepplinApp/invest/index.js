import React, { useContext, useEffect } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import OnboardingProvider from "./components/onboarding/OnboardingContext";
import InvestmentProvider, { InvestmentContext } from "./InvestmentProvider";

import BasicInfo from "./components/onboarding/BasicInfo";
import GetStarted from "./components/onboarding/GetStarted";

import Trade from "./pages/trade";
import Account from "./pages/account";
import Profile from "./pages/profile";
import GuestLanding from "./pages/guestlanding";
import StockDetail from "./pages/stock-detail";
import StockDetailMini from "./pages/stock-detail-modal";
// import StockStats from "./pages/stock-stats";

// import { View, Keyboard, NativeModules } from "react-native";
import { AuthContext } from "./FirebaseProvider";
import Login from "./pages/login";
import NewsProvider from "./NewsProvider";
import Waiting from "./pages/waiting";
import OrderSuccess from "./pages/ordersuccess";

const Stack = createNativeStackNavigator();
const InvestStack = createNativeStackNavigator();

const OrderStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="StockDetail" component={StockDetail} />
    </Stack.Navigator>
  );
};

const OnboardingStack = () => {
  return (
    <OnboardingProvider>
      <Stack.Navigator
        initialRouteName="BasicInfo"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="BasicInfo" component={BasicInfo} />
        <Stack.Screen name="GetStarted" component={GetStarted} />
      </Stack.Navigator>
    </OnboardingProvider>
  );
};

const InvestUserStack = () => {
  const { lookupSymbol } = useContext(InvestmentContext);
  return (
    <InvestStack.Navigator
      initialRouteName={lookupSymbol ? "OrderMini" : "Account"}
      screenOptions={{ headerShown: false, animation: "none" }}
    >
      <InvestStack.Screen name="Account" component={Account} />
      <InvestStack.Screen name="Trade" component={Trade} />
      {/* <InvestStack.Screen name="News" component={News} /> */}
      <InvestStack.Screen name="Profile" component={Profile} />
      <InvestStack.Screen name="Order" component={StockDetail} />
      <InvestStack.Screen name="OrderMini" component={StockDetailMini} />
      <InvestStack.Screen name="Login" component={Login} />
      <InvestStack.Screen name="Onboarding" component={OnboardingStack} />
      <InvestStack.Screen name="OrderSuccess" component={OrderSuccess} />
      {/* <Stack.Screen name="StockStats" component={StockStats} /> */}
    </InvestStack.Navigator>
  );
};

const App = (props) => {
  const { user } = useContext(AuthContext);
  const authHeaders = {
    "id-token": user ? user.idToken : "",
  };
  return (
    <NewsProvider>
      <InvestmentProvider
        authHeaders={authHeaders}
        lookupSymbol={props.lookupSymbol}
      >
        <Stack.Navigator
          initialRouteName="Waiting"
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "white" },
          }}
        >
          <Stack.Screen name="Waiting" component={Waiting} />
          <Stack.Screen name="InvestUser" component={InvestUserStack} />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      </InvestmentProvider>
    </NewsProvider>
  );
};

export default App;
