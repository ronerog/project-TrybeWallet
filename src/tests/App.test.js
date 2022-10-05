import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Test Coverage', () => {
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
