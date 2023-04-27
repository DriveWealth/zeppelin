import React, { useContext, useEffect } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import OnboardingProvider from "./components/onboarding/OnboardingContext";
import InvestmentProvider, { InvestmentContext } from "./InvestmentProvider";

import GetStarted from "./components/new_onboarding/GetStarted";
import TaxpayerStatus from "./components/new_onboarding/TaxpayerStatus";
import USCitizenship from "./components/new_onboarding/USCitizenship";
import TermsAndConditions from "./components/new_onboarding/TermsAndConditions";
import BasicInfo from "./components/new_onboarding/BasicInfo";
import SpecialConsiderations from "./components/new_onboarding/SpecialConsiderations";
import StatusEmployment from "./components/new_onboarding/StatusEmployment";
import YearlyIncome from "./components/new_onboarding/YearlyIncome";
import InvestExperience from "./components/new_onboarding/InvestExperience";
import FinancialFuture from "./components/new_onboarding/FinancialFuture";
import AreasOfInterest from "./components/new_onboarding/AreasOfInterest";
import Privacy from "./components/new_onboarding/Privacy";
import OnboardingSuccess from "./components/new_onboarding/OnboardingSuccess";
import NonUSTaxpayer from "./components/new_onboarding/NonUSTaxpayer";
import CreateAccount from "./components/new_onboarding/CreateAccount";

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
        <Stack.Screen name="GetStarted" component={GetStarted} />
        <Stack.Screen name="TaxpayerStatus" component={TaxpayerStatus} />
        <Stack.Screen name="USCitizenship" component={USCitizenship} />
        <Stack.Screen
          name="TermsAndConditions"
          component={TermsAndConditions}
        />
        <Stack.Screen name="BasicInfo" component={BasicInfo} />
        <Stack.Screen
          name="SpecialConsiderations"
          component={SpecialConsiderations}
        />
        <Stack.Screen name="StatusEmployment" component={StatusEmployment} />
        <Stack.Screen name="YearlyIncome" component={YearlyIncome} />
        <Stack.Screen name="InvestExperience" component={InvestExperience} />
        <Stack.Screen name="FinancialFuture" component={FinancialFuture} />
        <Stack.Screen name="AreasOfInterest" component={AreasOfInterest} />
        <Stack.Screen name="Privacy" component={Privacy} />
        <Stack.Screen name="CreateAccount" component={CreateAccount} />
        <Stack.Screen name="OnboardingSuccess" component={OnboardingSuccess} />
        <Stack.Screen name="NonUSTaxpayer" component={NonUSTaxpayer} />
      </Stack.Navigator>
    </OnboardingProvider>
  );
};

const InvestUserStack = () => {
  const {lookupSymbol} = useContext(InvestmentContext)
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

const GuestUserStack = () => {
  return (
    <Stack.Navigator initialRouteName="Dashboard" headerMode={"none"}>
      <Stack.Screen name="Dashboard" component={GuestLanding} />
      <Stack.Screen name="Onboarding" component={OnboardingStack} />
      <Stack.Screen name="Order" component={OrderStack} />
    </Stack.Navigator>
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
