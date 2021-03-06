const currencyValue = {
    pl: 'PLN',
    de: 'EUR',
    en: 'GBP'
}

export const formatCurrency = (value, lng = currencyValue['pl']) => { //dostosowuje format waluty do lokalnych warunków
    // console.log({lng})
    const number = Number(value);
    return new Intl.NumberFormat(lng, { style: 'currency', currency: currencyValue[lng] }).format(number);
}

export const formatDate = (string, lng) => {
    const date = new Date(string); // przekonwertowanie na datę
    return new Intl.DateTimeFormat(lng).format(date);
}