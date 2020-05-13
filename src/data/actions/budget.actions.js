// dispaczowanie akcji BUDGET_GET_REQUEST
// wykonać request do api
// dispaczować akcje BUDGET_GET_SUCCESS + przekazać dane z requestu

import { 
    BUDGET_TRANSACTION_ADD,
    BUDGET_GET,
    BUDGETED_CATEGORIES_GET,
    SET_SELECTED_PARENT_CATEGORY_ID
} from '../constants';

import API from '../fetch';

export const fetchBudget = (id) => { // jeżeli używamy dispatch to musi być thunkMiddleware
    
    const promise = API.budget.fetchBudget(id);

    return { //uruchamia middleware 
        type: BUDGET_GET,
        promise
    }
}

export const fetchBudgetedCategories = (id) => {

    const promise = API.budget.fetchBudgetedCategories(id);

    return {
        type: BUDGETED_CATEGORIES_GET,
        promise
    }   
}

export const addTransaction = ({budgetId, data}) => {

    const promise = API.budget.addTransaction({budgetId, data});

    return {
        type: BUDGET_TRANSACTION_ADD,
        promise,
    }
}

export const selectParentCategory = (id) => {
    return {
        type: SET_SELECTED_PARENT_CATEGORY_ID,
        payload: id
    }
}