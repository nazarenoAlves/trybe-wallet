import fetchCurrenciesApi from '../../services/api';

export const LOGIN_ACTION = 'LOGIN_ACTION';
export const CURRENCIES_ACTION = 'CURRENCIES_ACTION';
export const FORM_SUBMIT = 'FORM_SUBMIT';
export const REMOVE_ITEM_EXPENSE = 'REMOVE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const EDIT_SUBMIT = 'EDIT_SUBMIT';
export function loginAction(email) {
  return { type: LOGIN_ACTION, email };
}

function getCurrenciesAction(currencies) {
  return { type: CURRENCIES_ACTION, currencies };
}

export function submitForm(payload) {
  return {
    type: FORM_SUBMIT,
    payload,
  };
}
export function removeExpenseAction(id) {
  return {
    type: REMOVE_ITEM_EXPENSE,
    id,
  };
}

export function editExpense(id) {
  return {
    type: EDIT_EXPENSE,
    id,
  };
}

export function formEditExpense(expenses) {
  return {
    type: EDIT_SUBMIT,
    expenses,
  };
}

// função quer faz o dispatch e fetch com filtro
export function fetchCurrencies() {
  return async (dispatch) => {
    const currencies = await fetchCurrenciesApi();
    const currenciesFilter = Object.keys(currencies)
      .filter((element) => element !== 'USDT');
    dispatch(getCurrenciesAction(currenciesFilter));
  };
}
