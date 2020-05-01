export const fetchAllCategories = () => {
    const promise = fetch(`${process.env.REACT_APP_API_URL}/categories?_expand=parentCategory`);
    // umozliwia pobranie budżetu i jego transakcji
    return promise; // zwraca promise
}