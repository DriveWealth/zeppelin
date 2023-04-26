import React, { useContext } from "react";
import {
  NativeBaseProvider,
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  Icon,
  HStack,
  Center,
  Pressable,
  useTheme,
} from "native-base";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { InvestmentContext } from "../InvestmentProvider";

const PAGES = {
    "Account": 0,
    "Trade": 1,
    "News": 2,
    "Profile": 3,
};

function Footer({ navigation, page = "Account"}) {
//   const [selected, setSelected] = React.useState(1);
  const {colors} = useTheme();
  const selected = PAGES[page]
  const {
    account,
  } = useContext(InvestmentContext);

  return ( 
      <HStack bg="indigo.600"  alignItems="center" safeAreaBottom shadow={6}>
        <Pressable
          cursor="pointer"
          opacity={selected === 0 ? 1 : 0.5}
          py="3"
          flex={1}
          onPress={() => {
            navigation.navigate('Account');
          }}
        >
          <Center>
            <Icon
              mb="1"
              as={
                <MaterialCommunityIcons
                  name={selected === 0 ? "account-box-multiple" : "account-box-multiple-outline"}
                />
              }
              color="white"
              size="sm"
            />
            <Text color="white" fontSize="12">
              Account
            </Text>
          </Center>
        </Pressable>
        <Pressable
          cursor="pointer"
          opacity={selected === 1 ? 1 : 0.5}
          py="2"
          flex={1}
          onPress={() => {
            navigation.navigate('Trade');
          }}
          disabled={!account.data}
        >
          <Center>
            <Icon
              mb="1"
              as={<MaterialCommunityIcons name="chart-line" />}
              color="white"
              size="sm"
            />
            <Text color="white" fontSize="12">
              Trade
            </Text>
          </Center>
        </Pressable>
        {/* <Pressable
          cursor="pointer"
          opacity={selected === 2 ? 1 : 0.6}
          py="2"
          flex={1}
          onPress={() => {
            navigation.navigate('News');
          }}
        >
          <Center>
            <Icon
              mb="1"
              as={
                <MaterialCommunityIcons
                  name={selected === 2 ? "newspaper-variant" : "newspaper-variant-outline"}
                />
              }
              color="white"
              size="sm"
            />
            <Text color="white" fontSize="12">
              News
            </Text>
          </Center>
        </Pressable> */}
        <Pressable
          cursor="pointer"
          opacity={selected === 3 ? 1 : 0.5}
          py="2"
          flex={1}
          onPress={() => {
            navigation.navigate('Profile');
          }}
        >
          <Center>
            <Icon
              mb="1"
              as={
                <MaterialCommunityIcons
                  name={selected === 3 ? "account" : "account-outline"}
                />
              }
              color="white"
              size="sm"
            />
            <Text color="white" fontSize="12">
              Profile
            </Text>
          </Center>
        </Pressable>
      </HStack>

  );
}

export default Footer;
