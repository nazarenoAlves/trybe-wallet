import fetchCurrenciesApi from '../../services/api';

export const LOGIN_ACTION = 'LOGIN_ACTION';
export const CURRENCIES_ACTION = 'CURRENCIES_ACTION';

export function loginAction(email) {
  return { type: LOGIN_ACTION, email };
}

function getCurrenciesAction(currencies) {
  return { type: CURRENCIES_ACTION, currencies };
}

export function fetchCurrencies() {
  return async (dispatch) => {
    const currencies = await fetchCurrenciesApi();
    const currenciesFilter = Object.keys(currencies)
      .filter((element) => element !== 'USDT');
    dispatch(getCurrenciesAction(currenciesFilter));
  };
}
