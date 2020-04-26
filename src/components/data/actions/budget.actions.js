// dispaczowanie akcji BUDGET_GET_REQUEST
// wykonać request do api
// dispaczować akcje BUDGET_GET_SUCCESS + przekazać dane z requestu

import { 
    BUDGET_GET_REQUEST,
    BUDGET_GET_SUCCESS,
    BUDGET_GET_FAILURE,
    BUDGETED_CATEGORIES_GET_REQUEST,
    BUDGETED_CATEGORIES_GET_SUCCESS,
    BUDGETED_CATEGORIES_GET_FAILURE
} from '../constants';

import API from '../fetch';

export const fetchBudget = (id) => async (dispatch) => {
    dispatch({
        type: BUDGET_GET_REQUEST
    })
    
    try {
        const response = await API.budget.fetchBudget(id);
        const data = await response.json();
        dispatch({
            type: BUDGET_GET_SUCCESS,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: BUDGET_GET_FAILURE
        })

    }
}

export const fetchBudgetedCategories = (id) => async (dispatch) => {
    dispatch({
        type: BUDGETED_CATEGORIES_GET_REQUEST
    })
    
    try {
        const response = await API.budget.fetchBudgetedCategories(id);
        const data = await response.json();
        console.log(data);
        dispatch({
            type: BUDGETED_CATEGORIES_GET_SUCCESS,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: BUDGETED_CATEGORIES_GET_FAILURE
        })

}    
}