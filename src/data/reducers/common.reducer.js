import { 
    ALL_CATEGORIES_GET_REQUEST,
    ALL_CATEGORIES_GET_SUCCESS,
    ALL_CATEGORIES_GET_FAILURE,
    LOADING_STATES
} from '../constants';

const initilaState = {
    loadingState: null, // żeby na początku nie pokazywało się, że est załadowane
    allCategories: []
}

function common (state = initilaState, action) {
    const newLoadingState = {...state.loadingState};
    switch(action.type) {
        case ALL_CATEGORIES_GET_REQUEST:
            return {
                ...state,
                loadingState: {
                    ...state.loadingState,
                    [action.type]: LOADING_STATES.LOADING
                },
            } 
        case ALL_CATEGORIES_GET_SUCCESS:
            delete newLoadingState.ALL_CATEGORIES_GET_REQUEST; // usuwa z obiektu BUDGET...
            return {
                ...state, 
                allCategories: action.payload,
                loadingState: newLoadingState // nowy obiekt będzie utworzony, nie będzie mutowalności danych w stage
            }
        case ALL_CATEGORIES_GET_FAILURE:
            delete newLoadingState.ALL_CATEGORIES_GET_REQUEST;
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