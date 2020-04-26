import { 
    BUDGET_GET_REQUEST,
    BUDGET_GET_SUCCESS,
    BUDGET_GET_FAILURE,
    LOADING_STATES
} from '../constants';

const initilaState = {
    loadingState: {},
    budget: {},
    budgetCategories: [],
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
            
        default:
            return state;
    }
}

export default budget; 