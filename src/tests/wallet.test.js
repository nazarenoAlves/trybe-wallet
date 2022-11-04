import { screen } from '@testing-library/react';
import Wallet from '../pages/Wallet';
import mockData from './helpers/mockData';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testa a carteira', () => {
  test('Testa se os componentes estão sendo redenizado', () => {
    renderWithRouterAndRedux(<Wallet />, { initialState: mockData });

    screen.logTestingPlaygroundURL();
    const value = screen.getByPlaceholderText(/valor da despesa/i);
    expect(value).toBeInTheDocument();
    const description = screen.getByPlaceholderText(/descrição/i);
    expect(description).toBeInTheDocument();
    const method = screen.getByDisplayValue(/Dinheiro/i);
    expect(method).toBeInTheDocument();
    const tag = screen.getByDisplayValue(/alimentação/i);
    expect(tag).toBeInTheDocument();
    const currency = screen.getByTestId('currency-input');
    expect(currency).toBeInTheDocument();
    const addButton = screen.getByRole('button', { name: /adicionar despesa/i });
    expect(addButton).toBeInTheDocument();
  });
});
