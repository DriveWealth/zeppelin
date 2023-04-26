import React, { useEffect, createContext, useReducer, useContext } from "react";

export const AssessmentContext = createContext({});

const initialState = {
    experienceLevel : 'novice',
    financialExpectation: 'short_term_profit',
    intrestedCategories: [],
};

function reducer(state, action) {
    switch (action.type) {
        case "set_experience_level": {
            const { experienceLevel } = action;
            return { ...state, experienceLevel };
        }
        case 'set_financial_expectation': {
            const { financialExpectation } = action;
            return { ...state, financialExpectation };
        }
        case 'set_interesting_categories': {
            const { intrestedCategories } = action;
            return { ...state, intrestedCategories };
        }      
        default:
            console.log("Default");
            return state;
    }
}

export const AssessmentProvider = ({
    children,
    config,
}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // Account
    
    return (
        <AssessmentContext.Provider
            value={{ ...state, dispatch }}
        >
            {children}
        </AssessmentContext.Provider>
    );
};
