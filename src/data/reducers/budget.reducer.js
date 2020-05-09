import { 
    BUDGET_GET_REQUEST,
    BUDGET_GET_SUCCESS,
    BUDGET_GET_FAILURE,
    BUDGETED_CATEGORIES_GET_REQUEST,
    BUDGETED_CATEGORIES_GET_SUCCESS,
    BUDGETED_CATEGORIES_GET_FAILURE,
    SET_SELECTED_PARENT_CATEGORY_ID,
    LOADING_STATES
} from '../constants';

const initilaState = {
    loadingState: null, // żeby na początku nie pokazywało się, że est załadowane
    budget: {},
    budgetCategories: [],
    selectedParentCategoryId: undefined
}

function budget (state = initilaState, action) {
    const newLoadingState = {...state.loadingState};
    switch(action.type) {
        case BUDGET_GET_REQUEST:
            return {
                ...state,
                loadingState: {
                    ...state.loadingState,
                    [action.type]: LOADING_STATES.LOADING
                },
            } 
        case BUDGET_GET_SUCCESS:
            delete newLoadingState.BUDGET_GET_REQUEST; // usuwa z obiektu BUDGET...
            return {
                ...state, 
                budget: action.payload,
                loadingState: newLoadingState // nowy obiekt będzie utworzony, nie będzie mutowalności danych w stage
            }
        case BUDGET_GET_FAILURE:
            delete newLoadingState.BUDGET_GET_REQUEST;
            return {
                budget: {}, // restart klucza ze względu na błąd, bo danych już nie dostaniemy
                ...state,
                loadingState: newLoadingState // nie ma ładowania danymi
            }
        case BUDGETED_CATEGORIES_GET_REQUEST:
            return {
                ...state,
                loadingState: {
                    ...state.loadingState,
                    [action.type]: LOADING_STATES.LOADING
                },
            } 
        case BUDGETED_CATEGORIES_GET_SUCCESS:
            delete newLoadingState.BUDGETED_CATEGORIES_GET_REQUEST; // usuwa z obiektu BUDGET...
            return {
                ...state, 
                budgetCategories: action.payload,
                loadingState: newLoadingState // nowy obiekt będzie utworzony, nie będzie mutowalności danych w stage
            }
        case BUDGETED_CATEGORIES_GET_FAILURE:
            delete newLoadingState.BUDGETED_CATEGORIES_GET_REQUEST;
            return {
                budgetCategories: {}, // restart klucza ze względu na błąd, bo danych już nie dostaniemy
                ...state,
                loadingState: newLoadingState // nie ma ładowania danymi
            }
        case SET_SELECTED_PARENT_CATEGORY_ID:
            return {
                ...state,
                selectedParentCategoryId: action.payload
            }    
        default:
            return state;
    }
}

export default budget; 