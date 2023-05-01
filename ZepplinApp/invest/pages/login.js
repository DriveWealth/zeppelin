import {
  ArrowBackIcon,
  Box,
  Button,
  Center,
  FormControl,
  HStack,
  Image,
  Input,
  Pressable,
  Stack,
  Text,
  View,
  VStack,
  WarningOutlineIcon,
} from "native-base";
import { StackActions } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../FirebaseProvider";
import DWLogo from "../images/DWLogo.png";

const Login = ({ navigation, route }) => {
  const { submitLogin, user } = useContext(AuthContext);
  
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [error, setError] = useState({})

  // useEffect(() => {
  //   if (user && user.uid) {
  //     navigation.goBack()
  //   }
  // }, [user]);

  const isFormValid = () => {
    let newError = {};
    if (!username || username.length < 3) {
      newError.username = 'Invalid username';
    }
    if (!password || password.length < 6) {
      newError.password = 'Invalid password';
    }
    setError(newError)    
    return !Object.keys(newError).length;
  };

  const handleSubmitClicked = async () => {
    if (!isFormValid()) return;
    try {
      setIsSubmitting(true);
      await submitLogin(username, password);
      setIsSubmitting(false);
    } catch (e) {
      setIsSubmitting(false);
      switch (e.code) {
        case "auth/invalid-email": {
          setError({ ...error, username: "The email enterd is invalid" });
          break;
        }
        case "auth/user-not-found": {
          setError({ ...error, username: "We could not find this user" });
          break;
        }
        case "auth/wrong-password": {
          setError({ ...error, password: "You entered a wrong password" });
          break;
        }

        default: {
          alert("An unknown error occured!");
        }
      }
    }
  };

  // const isValid = isFormValid()

  return (
    <Center safeArea>
      <VStack
        alignItems="center"
        style={{ width: 320, padding: 10, maxWidth: 320 }}
      >
        <Box m="3">
          <Image
            style={{ width: 100, height: 100 }}
            source={DWLogo}
            alt="Drivewealth"
          />
          {/* <Text>Your Logo Here</Text> */}
        </Box>
        <FormControl isRequired={true} isInvalid={!!error.username}>
          <Stack>
            <FormControl.Label>Username</FormControl.Label>
            <Input
              type="text"
              placeholder="username"
              onChangeText={setUsername}
              style={{ fontSize: 16 }}
              autoCapitalize={'none'}
            />
            <FormControl.HelperText></FormControl.HelperText>
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >{error.username}</FormControl.ErrorMessage>
          </Stack>
        </FormControl>
        <FormControl isRequired={true} isInvalid={!!error.password}>
          <Stack>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              type="password"
              placeholder="password"
              onChangeText={setPassword}
              style={{ fontSize: 16 }}
            />
            <FormControl.HelperText>
              Must be atleast 6 characters.
            </FormControl.HelperText>
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              {error.password}
            </FormControl.ErrorMessage>
          </Stack>
        </FormControl>
        <Button
          style={{ width: "100%", marginTop: 30 }}
          onPress={handleSubmitClicked}
          isDisabled={!(username && password) || isSubmitting}
        >
          Submit
        </Button>
        {/* <Button
          variant='outline'
          style={{ width: "100%", marginTop: 10 }}
          onPress={() => {
            navigation.goBack()
          }}
        >
          Cancel
        </Button> */}
      </VStack>
    </Center>
  );
};

export default Login;
