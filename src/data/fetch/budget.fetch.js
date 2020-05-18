export const fetchBudget = async ({ id }) => { // czekamy na rozwiązanie się tego promise
    console.log({ id })
    if (id === undefined) id = 1;

    const response = await fetch(`${process.env.REACT_APP_API_URL}/budgets/${id}/?_embed=transactions`);
    // umozliwia pobranie budżetu i jego transakcji
    const data = await response.json(); //useQuery wymaga, aby po rozwiązaniu promise odpowiedź przetworzyć na json
    // console.log({ data })
    return data;
}

export const fetchBudgetedCategories = async ({ id }) => {
    // console.log({ id })
    if (id === undefined) id = 1;
    const response = await fetch(`${process.env.REACT_APP_API_URL}/budgets/${id}/budgetCategories`);
    const data = await response.json();
    return data;
}

export const addTransaction = async ({ budgetId, data }) => { // jeżeli przekazuje obiekt, to kolejność mnie nie interesuje
    // dostosowanie wyniku [] do useMutaion 
    const response = await fetch(`${process.env.REACT_APP_API_URL}/budgets/${budgetId}/transactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return await response.json();
} 