const currencyValue = {
    pl: 'PLN',
    de: 'EUR',
    en: 'GBP'
}

export const formatCurrency = (value, lng) => { //dostosowuje format waluty do lokalnych warunków
    const number = Number(value);
    return new Intl.NumberFormat(lng, {style: 'currency', currency: currencyValue[lng]}).format(number);
}