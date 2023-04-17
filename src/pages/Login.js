import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginAction } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isButtonDisable: true,
    };
  }

  // função que valida os campos de email e senha
  buttonDisabled = () => {
    const { email, password } = this.state;
    const regex = /\S+@\S+\.\S+/;
    const minCharacters = 6;

    const resultEmail = !!regex.test(email);
    const resultPassword = password.length >= minCharacters;

    const resulFinal = resultEmail && resultPassword;
    if (resulFinal) {
      this.setState({
        isButtonDisable: false,
      });
    } else {
      this.setState({
        isButtonDisable: true,
      });
    }
  };

  // Função que controla os inputs
  onInputChange = (event) => {
    const { name, type, checked } = event.target;
    const value = type === 'checkbox' ? checked : event.target.value;
    this.setState({
      [name]: value,
    }, () => this.buttonDisabled());
  };

  // função que passa o estado local para global e faz o redirect pra pagina carteira
  handleSubmit = () => {
    const { dispatch, history } = this.props;
    const { email } = this.state;
    dispatch(loginAction({ email }));
    history.push('/carteira');
  };

  render() {
    const { isButtonDisable, email, password } = this.state;
    return (
      <div className="contentLogin">
        <h1>Trybe Wallet</h1>
        <label htmlFor="e-mail">
          <input
            type="email"
            id="e-mail"
            data-testid="email-input"
            value={ email }
            name="email"
            onChange={ this.onInputChange }
            placeholder="Email"
          />
        </label>
        <label htmlFor="senha">
          <input
            type="password"
            id="senha"
            data-testid="password-input"
            value={ password }
            name="password"
            onChange={ this.onInputChange }
            placeholder="Senha"
          />
        </label>
        <button
          type="button"
          disabled={ isButtonDisable }
          onClick={ this.handleSubmit }
          className="btnLogin"
        >
          Entrar
        </button>
      </div>
    );
  }
}
Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
