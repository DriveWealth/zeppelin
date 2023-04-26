import firebase, { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useEffect, useMemo, useState, createContext } from "react";

// Optionally import the services that you want to use
//import {...} from "firebase/auth";
//import {...} from "firebase/database";
//import {...} from "firebase/firestore";
//import {...} from "firebase/functions";
//import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDr6zBJ911Np5iqezc5XJ9h2fJXxDea0WM",
  authDomain: "drivewealth-a7e9a.firebaseapp.com",
  projectId: "drivewealth-a7e9a",
  storageBucket: "drivewealth-a7e9a.appspot.com",
  messagingSenderId: "459224660252",
  appId: "1:459224660252:web:d4c5e90c8a50dcdf5ea2d9",
  measurementId: "G-E1D3TM3K2R",
};

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
