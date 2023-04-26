import React, { useEffect, createContext, useReducer, useContext } from "react";
import config from "../../config";
import { AuthContext } from "../../FirebaseProvider";
import { InvestmentContext } from "../../InvestmentProvider";

export const OnboardingContext = createContext({});

const initialState = {
  // exposure: "none",
  // citizenship: "us_citizen",
  // // employment: "employed",
  // // experienceLevel: "novice",
  // ssn: "",
  // dob: "",
  // taxpayer_status: "",
  // us_citizenship_status: "",
  // special_considerations: "",
  // employment_status: "",
  // yearly_income: "",
  // invest_experience: "",
  // financial_future: "",
  // areas_of_interest: "",
  // privacy: "",
  // address: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "set_all": {
      const { all } = action;
      return { ...state, ...all };
    }
    case "set_email": {
      let basic = { ...state.basic };
      basic.emailAddress = action.email;
      return { ...state, basic };
    }
    case "set_identification": {
      const { identification } = action;
      return { ...state, identification };
    }
    case "set_personal": {
      const { personal } = action;
      return { ...state, personal };
    }
    case "set_address": {
      const { address } = action;
      return { ...state, address };
    }
    case "set_employment": {
      const { employment } = action;
      return { ...state, employment };
    }
    case "set_profile": {
      const { profile } = action;
      return { ...state, profile };
    }
    case "set_disclosures": {
      const { employment } = action;
      return { ...state, employment };
    }

    default:
      console.log("Default");
      return state;
  }
}

const OnboardingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user } = useContext(AuthContext);
  const { createUser, createAccount, dispatch: investDispatch } = useContext(InvestmentContext);

  const createUserAndAccount = async (payload) => {
    try {
      console.log(payload, '<< payload for createUserAndAccount');
      const investUser = await createUser(payload);
      console.log(investUser, 'Created Invest User?')
      const account = await createAccount(investUser.id);
      console.log(account, "<< Create account response from server");
      // const { createTradingAccount } = resp.data.;
      // console.log(createTradingAccount);
      // investDispatch({
      //   type: "set_account",
      //   account,
      // });
      return account;
    } catch (e) {
      console.log(e);
      // investDispatch({
      //   type: "set_account",
      //   account: null,
      // });
    }
  };
  // Account
  useEffect(() => {
    // alert(JSON.stringify(user))
    if (!user || !user.email) {
      return;
    }
    dispatch({
      type: "set_email",
      email: user.email,
    });

    // dispatch({
    //   type: "set_identity",
    //   identity: {
    //     givenName: user.firstName,
    //     familyName: user.lastName,
    //     dateOfBirth: user.dateOfBirth,
    //     fundingSource: "employment_income",
    //     countryOfCitizenship: "USA",
    //     countryOfBirth: "USA",
    //     countryOfTaxResidence: "USA",
    //   },
    // });
  }, [user]);

  return (
    <OnboardingContext.Provider
      value={{ ...state, dispatch, createUserAndAccount }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export default OnboardingProvider;
