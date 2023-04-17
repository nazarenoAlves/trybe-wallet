import {
  CURRENCIES_ACTION,
  EDIT_EXPENSE,
  EDIT_SUBMIT,
  FORM_SUBMIT,
  REMOVE_ITEM_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CURRENCIES_ACTION:
    return {
      ...state,
      currencies: action.currencies,
    };
  case FORM_SUBMIT:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case REMOVE_ITEM_EXPENSE: {
    const updatedExpenses = state.expenses.filter((element) => element.id !== action.id);
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
    return {
      ...state,
      expenses: updatedExpenses,
    };
  }
  case EDIT_EXPENSE:
    return {
      ...state,
      editor: true,
      idToEdit: action.id,
    };
  case EDIT_SUBMIT:
    return {
      ...state,
      expenses: action.expenses,
      editor: false,
    };
  default:
    return state;
  }
};

export default wallet;
