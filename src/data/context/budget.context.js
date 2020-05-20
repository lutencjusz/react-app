import React, { createContext, useState } from 'react';

const initialValue = {};
const store = createContext(initialValue);
const { Provider } = store; // restrukturyzacja Provider z store

function BudgetProvider({ children }) { // children tak przekazywany bo komponent funkcyjny
    const [selectedParentCategoryId, setSelectedParentCategoryId] = useState();
    return <Provider value={{
        selectedParentCategoryId,
        setSelectedParentCategoryId,
    }}>
        {children}
    </Provider>
}

export const BudgetContext = {
    store,
    BudgetProvider,
}

export default BudgetContext;