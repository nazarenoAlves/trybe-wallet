import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurrencies } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  render() {
    const { currencies } = this.props;
    return (
      <div>
        <input
          type="number"
          data-testid="value-input"
        />
        <input
          type="text"
          data-testid="description-input"
        />
        <select
          data-testid="currency-input"
        >
          {currencies.map((element) => (
            <option key={ element }>
              {element}
            </option>
          ))}
        </select>
        <select data-testid="method-input">
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
        <select data-testid="tag-input">
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
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
});

export default connect(mapStateToProps)(WalletForm);
