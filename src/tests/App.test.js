import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Test Coverage', () => {
    it('Render check', () => {
      const { history } = renderWithRouterAndRedux(<App />);
      const emailCorrect = 'test@test.com';
      const passwordCorrect = '123456';
      const buttonEntrar = screen.getByRole('button', { name: /entrar/i });
      const inputPassword = screen.getByTestId('password-input');
      const inputEmail = screen.getByTestId('email-input');
      expect(buttonEntrar).toBeInTheDocument();
      expect(inputEmail).toBeInTheDocument();
      expect(inputPassword).toBeInTheDocument();
      userEvent.type(inputEmail, emailCorrect);
      userEvent.type(inputPassword, passwordCorrect);
      userEvent.click(buttonEntrar);
      const { location: { pathname } } = history;
      expect(pathname).toBe('/carteira');
    });
  });