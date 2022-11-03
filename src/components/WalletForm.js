import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurrencies, submitForm } from '../redux/actions';
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
    };
  }

  // função que faz os dispach da requisição da api
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  // função que faz os controles dos inputs
  onInputChange = (event) => {
    const { name, type, checked } = event.target;
    const value = type === 'checkbox' ? checked : event.target.value;
    this.setState({
      [name]: value,
    });
  };

  // função que faz a formatação dos state e adiciona a chave exchangeRates
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

  // função que passa o estado faz o dispatch do state local para o global
  submitForm = async (event) => {
    event.preventDefault();
    const { dispatch } = this.props;
    const result = await this.formateExpense();
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

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <div>
        <h3>Valor da Despesa</h3>
        <input
          type="number"
          data-testid="value-input"
          placeholder="Valodar da Despesa"
          name="value"
          value={ value }
          onChange={ this.onInputChange }
        />
        <h3>Descrição da Despesa</h3>
        <input
          type="text"
          data-testid="description-input"
          name="description"
          placeholder="Descrição"
          value={ description }
          onChange={ this.onInputChange }
        />
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
        <button
          type="button"
          onClick={ this.submitForm }
        >
          Adicionar despesa
        </button>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.shape({
    map: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};
const mapStateToProps = (globalState) => ({
  currencies: globalState.wallet.currencies,
  expenses: globalState.wallet.expenses,
});

export default connect(mapStateToProps)(WalletForm);
