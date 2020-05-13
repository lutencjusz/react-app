export const fetchBudget = (id) => {
    const promise = fetch(`${process.env.REACT_APP_API_URL}/budgets/${id}/?_embed=transactions`);
    // umozliwia pobranie budżetu i jego transakcji
    return promise; // zwraca promise
}

export const fetchBudgetedCategories = (id) => {
    const promise = fetch(`${process.env.REACT_APP_API_URL}/budgets/${id}/budgetCategories`);
    return promise;
}

export const addTransaction = ({budgetId, data}) => { // jeżeli przekazuje obiekt, to kolejność mnie nie interesuje
    const promise = fetch(`${process.env.REACT_APP_API_URL}/budgets/${budgetId}/transactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    });
    return promise;
}