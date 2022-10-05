import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Test Coverage 60%', () => {
  it('Render check', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const email = 'test@test.com';
    const senha = '123456';
    const entrarBtn = screen.getByRole('button', { name: /entrar/i });
    const inputSenha = screen.getByTestId('password-input');
    const inputEmail = screen.getByTestId('email-input');
    expect(entrarBtn).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(inputSenha).toBeInTheDocument();
    userEvent.type(inputEmail, email);
    userEvent.type(inputSenha, senha);
    userEvent.click(entrarBtn);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/carteira');
  });
});

describe('Teste coverage 100%', () => {
  it('Test carteira', () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const { location: { pathname } } = history;
    expect(pathname).toBe('/carteira');
    const emailUser = screen.getByTestId('email-field');
    const valorDespesa = screen.getByTestId('total-field');
    const moeda = screen.getByTestId('header-currency-field');
    const inputValorDespesa = screen.getByTestId('value-input');
    const inputDescription = screen.getByTestId('description-input');
    const inputAdicionar = screen.getByRole('button', { name: /adicionar despesa/i });
    expect(emailUser).toBeInTheDocument();
    expect(valorDespesa).toBeInTheDocument();
    expect(moeda).toBeInTheDocument();
    expect(inputValorDespesa).toBeInTheDocument();
    expect(inputDescription).toBeInTheDocument();
    expect(inputAdicionar).toBeInTheDocument();
  });

  it('Test add despesa', async () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const { location: { pathname } } = history;
    expect(pathname).toBe('/carteira');
    const inputValorDespesa = screen.getByTestId('value-input');
    const inputDescription = screen.getByTestId('description-input');
    const inputAdd = screen.getByRole('button', { name: /adicionar despesa/i });
    expect(inputAdd).toBeInTheDocument();
    userEvent.type(inputValorDespesa, '20');
    userEvent.type(inputDescription, 'Comprei Garrafa');
    userEvent.click(inputAdd);
    const btnExcluir = await screen.findByTestId('delete-btn');
    const data = await screen.findByRole('cell', { name: /alimentação/i });
    expect(btnExcluir).toBeInTheDocument();
    expect(data).toBeInTheDocument();
    userEvent.click(btnExcluir);
  });

  it('Test total', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const inputValorDespesa = screen.getByText(/valor da despesa:/i);
    const inputDescription = screen.getByText(/descrição:/i);
    const inputAdd = screen.getByRole('button', { name: /adicionar despesa/i });
    userEvent.type(inputValorDespesa, '20');
    userEvent.type(inputDescription, 'Comprei Ga');
    userEvent.click(inputAdd);
    const editButton = await screen.findByRole('button', { name: /editar/i });
    userEvent.click(editButton);
    const buttonEditarExpense = await screen.findByRole('button', { name: /editar despesas/i });
    expect(buttonEditarExpense).toBeInTheDocument();
    userEvent.type(inputValorDespesa, '10');
    userEvent.type(inputDescription, 'Comprei Garrafa');
    userEvent.click(buttonEditarExpense);
    const valorTotal = await screen.findByText(/despesa total:/i);
    expect(valorTotal).toBeInTheDocument();
  });
});
