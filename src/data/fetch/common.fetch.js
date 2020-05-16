export const fetchAllCategories = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/categories?_expand=parentCategory`);
    // umozliwia pobranie budżetu i jego transakcji
    const data = await response.json();
    return data; // zwraca promise
}