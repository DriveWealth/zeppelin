import { Box, Button, Center, Spacer, Text, VStack } from "native-base";
import React, { useContext } from "react";
import Footer from "../components/Footer";
import { AuthContext } from "../FirebaseProvider";
import { InvestmentContext } from "../InvestmentProvider";
import { StackActions } from '@react-navigation/native';

const UserInfo = ({ user, account }) => {
  return (
    <Box style={{ height: 50 }}>
      {
        <Text>
          {user && user.email ? `Logged in as ${user.email}` : ""}
        </Text>
      }
      {
        <Text>
          {account.status === "loading" && "..."}
          {account.data && `Managing ${account.data.nickname}`}
        </Text>
      }
    </Box>
  );
};

const Profile = ({ navigation, route }) => {
  const { user, logout } = useContext(AuthContext);
  const { account } = useContext(InvestmentContext);

  return (
    <>
      <VStack
        alignItems="center"
        safeArea={true}
        //   style={{ width: 320, padding: 10, maxWidth: 320, }}
        flex="1"
      >
        <Center style={{marginTop: 40, width: '100%'}}>

          <UserInfo user={user} account={account} />
          <Button
            style={{ marginTop: 30, width: 200 }}
            variant="outline"
            colorScheme="secondary"
            onPress={() => {
              logout().then(() => {
                navigation.dispatch(
                  StackActions.popToTop()
                );
                // navigation.dispatch(
                //   StackActions.replace('InvestUser')
                // );
              })
            }}
          >
            Logout
          </Button>
        </Center>
      </VStack>
      <Footer navigation={navigation} page="Profile" />
    </>
  );
};

export default Profile;
