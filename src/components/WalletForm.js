import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurrencies, formEditExpense, submitForm } from '../redux/actions';
import fetchCurrenciesApi from '../services/api';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'alimentação',
      att: 0,
    };
  }

  // função que faz os dispach da requisição da api
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
    const expensesFromLocalStorage = this.loadExpensesFromLocalStorage();
    expensesFromLocalStorage.forEach((expense) => {
      dispatch(submitForm(expense));
    });
  }

  loadExpensesFromLocalStorage = () => JSON.parse(localStorage.getItem('expenses')) || [];

  // função que faz os controles dos inputs
  onInputChange = (event) => {
    const { name, type, checked } = event.target;
    const value = type === 'checkbox' ? checked : event.target.value;
    this.setState({
      [name]: value,
    });
  };

  // função que faz a formatação dos state e adiciona a chave exchangeRates com API
  formateExpense = async () => {
    const { id, description, tag, method, currency, value } = this.state;
    const formatedExpense = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: await fetchCurrenciesApi(),

    };
    return formatedExpense;
  };

  saveExpenseToLocalStorage = (expense) => {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.push(expense);
    localStorage.setItem('expenses', JSON.stringify(expenses));
  };

  // função que passa o estado faz o dispatch do state local para o global
  submitForm = async () => {
    const { dispatch } = this.props;
    const result = await this.formateExpense();
    this.saveExpenseToLocalStorage(result);
    dispatch(submitForm(result));
    this.setState((prev) => ({
      id: prev.id + 1,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'alimentação',
    }));
  };

  editFormButton = () => {
    const { value, description, currency, method, tag } = this.state;
    const { expenses, idToEdit, dispatch } = this.props;
    const editedExpense = {
      ...expenses.find((element) => element.id === idToEdit),
      value,
      description,
      currency,
      method,
      tag,
    };
    const newExpenses = expenses
      // eslint-disable-next-line react/prop-types
      .map((element) => (element.id === idToEdit ? editedExpense : element));
    dispatch(formEditExpense(newExpenses));
    this.setState((prev) => ({
      att: prev.att + 1,
    }));
    localStorage.setItem('expenses', JSON.stringify(newExpenses));
  };

  render() {
    const { currencies, editor, expenses } = this.props;
    const { value, description, currency, method, tag } = this.state;
    let sum = 0;
    expenses.forEach((element) => {
      // const { currency } = element;
      sum += +element.value * element.exchangeRates[currency].ask;
    });
    return (
      <div className="contentForm">
        <div className="formWallet">
          <h3>Valor: </h3>
          <input
            type="number"
            data-testid="value-input"
            placeholder="Valor da Despesa"
            name="value"
            value={ value }
            onChange={ this.onInputChange }
          />
          <h3>Descrição: </h3>
          <input
            type="text"
            data-testid="description-input"
            name="description"
            placeholder="Descrição"
            value={ description }
            onChange={ this.onInputChange }
          />
          <h3>Moeda: </h3>
          <select
            data-testid="currency-input"
            value={ currency }
            name="currency"
            onChange={ this.onInputChange }
          >
            {currencies.map((element) => (
              <option
                key={ element }
                value={ element }
              >
                {element}
              </option>
            ))}
          </select>
          <h3>Método De Pagamento: </h3>
          <select
            data-testid="method-input"
            name="method"
            value={ method }
            onChange={ this.onInputChange }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
          <h3>Categoria:</h3>
          <select
            data-testid="tag-input"
            name="tag"
            value={ tag }
            onChange={ this.onInputChange }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
          {editor ? (
            <button
              type="button"
              name="edita-despesa"
              onClick={ this.editFormButton }
              className="btnEdit"
            >
              Editar Despesa
            </button>)
            : (
              <button
                type="button"
                onClick={ this.submitForm }
                className="btnAdd"
              >
                Adicionar despesa
              </button>)}
        </div>
        <div className="totalExpense">
          <h1>Total de Despesas</h1>
          <h1>{sum.toFixed(2)}</h1>
        </div>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.shape({
    map: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  editor: PropTypes.bool.isRequired,
  expenses: PropTypes.shape({
    find: PropTypes.func.isRequired,
    forEach: PropTypes.func.isRequired,
  }).isRequired,
  idToEdit: PropTypes.number.isRequired,
};
const mapStateToProps = (globalState) => ({
  currencies: globalState.wallet.currencies,
  expenses: globalState.wallet.expenses,
  idToEdit: globalState.wallet.idToEdit,
  editor: globalState.wallet.editor,
});

export default connect(mapStateToProps)(WalletForm);
