import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    // função que adiciona o email e a soma total dos valores no header
    const { email } = this.props;
    return (
      <div className="header">
        <h1>Trybe Wallet</h1>
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
});

export default connect(mapStateToProps)(Header);
