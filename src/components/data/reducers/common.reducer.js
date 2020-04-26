import { 
    ALL_CATEGORIES_REQUEST,
    ALL_CATEGORIES_SUCCESS,
    ALL_CATEGORIES_FAILURE,
    LOADING_STATES
} from '../constants';

const initilaState = {
    loadingState: {},
    allCategories: []
}

function common (state = initilaState, action) {
    const newLoadingState = {...state.loadingState};
    switch(action.type) {
        case ALL_CATEGORIES_REQUEST:
            return {
                ...state,
                loadingState: {
                    ...state.loadingState,
                    [action.type]: LOADING_STATES.LOADING
                },
            } 
        case ALL_CATEGORIES_SUCCESS:
            delete newLoadingState.ALL_CATEGORIES_REQUEST; // usuwa z obiektu BUDGET...
            return {
                ...state, 
                allCategories: action.payload,
                loadingState: newLoadingState // nowy obiekt będzie utworzony, nie będzie mutowalności danych w stage
            }
        case ALL_CATEGORIES_FAILURE:
            delete newLoadingState.ALL_CATEGORIES_REQUEST;
            return {
                allCategories: {}, // restart klucza ze względu na błąd, bo danych już nie dostaniemy
                ...state,
                loadingState: newLoadingState // nie ma ładowania danymi
            }
            
        default:
            return state;
    }
}

export default common; 