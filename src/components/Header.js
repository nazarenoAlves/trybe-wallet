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
      <div>
        <span data-testid="email-field">
          {email}
        </span>
        <span data-testid="total-field">
          {sum.toFixed(2)}
        </span>
        <span data-testid="header-currency-field">
          BRL
        </span>
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
