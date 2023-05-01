import { initializeApp } from "firebase/app";
import Constants from 'expo-constants';

import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { useEffect, useState, createContext } from "react";

// Initialize Firebase

const {firebaseConfig} = Constants.expoConfig.extra;
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

export const AuthContext = createContext({});

function FirebaseProvider({ children }) {
  const [user, setUser] = useState();

  const [isFetchingUser, setIsFetchingUser] = useState(true);

  async function submitLogin(username, password) {
    const userCredential = await signInWithEmailAndPassword(
      getAuth(app),
      username,
      password
    );
    const user = userCredential.user;
    const idToken = await user.getIdToken();
    const { email, emailVerified, isAnonymous, uid, displayName, accessToken } =
      user;
    const customUser = {
      email,
      emailVerified,
      isAnonymous,
      uid,
      displayName,
      accessToken,
      idToken,
    };
    // console.log(customUser, "<<< Set user");
    setUser(customUser);
    return customUser;
  }

  function logout() {
    return getAuth().signOut();
  }
  useEffect(() => {
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        // getAuth().signOut()
        user.getIdToken().then((idToken) => {
          const {
            email,
            emailVerified,
            isAnonymous,
            uid,
            displayName,
            accessToken,
          } = user;
          setUser({
            email,
            emailVerified,
            isAnonymous,
            uid,
            displayName,
            accessToken,
            idToken,
          });
        });
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isFetchingUser,
        submitLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default FirebaseProvider;
