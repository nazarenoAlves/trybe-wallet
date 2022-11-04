import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Teste da tela de Login', () => {
  test('Teste se os componente de login estão na tela', () => {
    renderWithRouterAndRedux(<App />);
    const email = screen.getByPlaceholderText(/Email/i);
    expect(email).toBeInTheDocument();
    const password = screen.getByPlaceholderText(/Senha/i);
    expect(password).toBeInTheDocument();
    const button = screen.getByRole('button', { name: /entrar/i });
    expect(button).toBeInTheDocument();
  });
  test('Teste se ao iniciar aplicação o botão de entrar inicia desativado', () => {
    renderWithRouterAndRedux(<App />);
    const button = screen.getByRole('button', { name: /entrar/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('disabled');
  });
  test('Teste se ao digitar os dados invalidos o botão entrar continua desativado', () => {
    renderWithRouterAndRedux(<App />);
    const email = screen.getByPlaceholderText(/Email/i);
    const password = screen.getByPlaceholderText(/Senha/i);
    userEvent.type(email, 'nazaAlvess');
    userEvent.type(password, '1234');
    const button = screen.getByRole('button', { name: /entrar/i });
    expect(button).toHaveAttribute('disabled');
  });
  test('Teste se ao digitar os dados validos o botão se habilita', () => {
    renderWithRouterAndRedux(<App />);
    const email = screen.getByPlaceholderText(/Email/i);
    const password = screen.getByPlaceholderText(/Senha/i);
    userEvent.type(email, 'nazareno@gmail.com');
    userEvent.type(password, '123456');
    const button = screen.getByRole('button', { name: /entrar/i });
    expect(button).not.toHaveAttribute('disabled');
  });
  test('Teste se ao digitar um dos campos invalidos o botão continua desabilitado', () => {
    renderWithRouterAndRedux(<App />);
    const email = screen.getByPlaceholderText(/Email/i);
    const password = screen.getByPlaceholderText(/Senha/i);
    userEvent.type(email, 'nazareno');
    userEvent.type(password, '123456');
    const button = screen.getByRole('button', { name: /entrar/i });
    expect(button).toHaveAttribute('disabled');
  });
  test('Teste se ao digitar um dos campos invalidos o botão continua desabilitado', () => {
    renderWithRouterAndRedux(<App />);
    const email = screen.getByPlaceholderText(/Email/i);
    const password = screen.getByPlaceholderText(/Senha/i);
    userEvent.type(email, 'nazareno@gmail.com');
    userEvent.type(password, '123');
    const button = screen.getByRole('button', { name: /entrar/i });
    expect(button).toHaveAttribute('disabled');
  });
});
