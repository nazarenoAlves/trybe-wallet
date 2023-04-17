import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    // função que adiciona o email e a soma total dos valores no header
    const { email, expenses } = this.props;
    let sum = 0;
    expenses.forEach((element) => {
      const { currency } = element;
      sum += +element.value * element.exchangeRates[currency].ask;
    });
    return (
      <div className="header">
        <h1>Trybe Wallet</h1>
        <h3>{`Total de Despesas:${sum.toFixed(2)}BRL`}</h3>
        <div data-testid="email-field">
          <h3>{email}</h3>

        </div>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.shape({
    forEach: PropTypes.func.isRequired,
  }).isRequired,
};
const mapStateToProps = (globalState) => ({
  email: globalState.user.email,
  expenses: globalState.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
