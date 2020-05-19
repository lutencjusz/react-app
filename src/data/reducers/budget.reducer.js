import { 
    SET_SELECTED_PARENT_CATEGORY_ID,
} from '../constants';

const initilaState = {
    selectedParentCategoryId: undefined
}

function budget (state = initilaState, action) {
    switch(action.type) {
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