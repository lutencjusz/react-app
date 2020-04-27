import { 
    ALL_CATEGORIES_GET
} from '../constants';

import API from '../fetch';

export const fetchAllCategories = () => { // jeżeli używamy dispatch to musi być thunkMiddleware
    
    const promise = API.common.fetchAllCategories();
    return { //uruchamia middleware 
        type: ALL_CATEGORIES_GET,
        promise
    }
}
