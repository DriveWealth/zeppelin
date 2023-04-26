import React, { useContext, useEffect, useState } from "react";
import {
  VStack,
} from "native-base";
import News from "../components/News";
import Footer from "../components/Footer";

const Dashboard = ({ navigation, route }) => {  
  return (
    <>
      <VStack safeArea={true} flex="1">
        <News />
      </VStack>      
      <Footer navigation={navigation} page="News" />
    </>
  );
};

export default Dashboard;
