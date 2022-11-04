import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const email = 'Nazareno@gmail.com';
const senha = '123456';

describe('Testa o componente header', () => {
  test('Testa se o email do usuario e o valor dos gastos aparece no Header ', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Senha');
    const enterBtn = screen.getByRole('button');

    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, senha);
    userEvent.click(enterBtn);

    const result = screen.getByText(/nazareno@gmail\.com/i);
    const valueWallet = screen.getByText(/0\.00/i);

    expect(result).toBeInTheDocument();
    expect(valueWallet).toBeInTheDocument();

    screen.logTestingPlaygroundURL();
  });
});
