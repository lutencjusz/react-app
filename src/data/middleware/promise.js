export default function promiseMiddleware() { //middleware do komunikacji ze storem
    return function(next) {
        return function(action) {
            const {promise, type, ...rest} = action;
            if (!promise || typeof promise.then !== 'function') { // jeżeli zwracany jest promise z pobrania danych to idzie dalej
                return next(action);
            }
            const SUCCESS = `${type}_SUCCESS`; //buduje prawidłowe akcje
            const FAILURE = `${type}_FAILURE`;
            const REQUEST = `${type}_REQUEST`;

            next({
                type: REQUEST, 
                ...rest
            });
            
            return promise
                .then(response => response.json()) // wykonuje synchroniczne zapytanie
                .then(data =>{
                    next({
                        type: SUCCESS, 
                        payload: data, 
                        ...rest
                    })

                })
                .catch(error =>{
                    next({
                        type: FAILURE, 
                        error, 
                        ...rest
                    })                    
                })
        }
    }
}