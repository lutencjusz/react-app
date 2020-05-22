import React, { createContext, useReducer } from 'react'; // useReducer działa jak useSate i zastępuje redux

const initialValue = {};
const store = createContext(initialValue);
const { Provider } = store; // restrukturyzacja Provider z store

function reducer(state, action) {
    switch (action.type) {
        case 'selectedParentCategoryId':
            return {
                ...state, // destrukturyzacja
                selectedParentCategoryId: action.payload,
            }
        default:
            return state;
    }
}

function BudgetProvider({ children }) { // children tak przekazywany bo komponent funkcyjny
    const [state, dispatch] = useReducer(reducer, initialValue);
    return <Provider value={{
        ...state, // zdestrukturyzować, żeby w budgetTransactionList brać bezpośrednio z context
        dispatch,
    }}>
        {children}
    </Provider>
}

export const BudgetContext = {
    store,
    BudgetProvider,
}

export default BudgetContext;