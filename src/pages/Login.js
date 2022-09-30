import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { userInfo } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      senha: '',
      isDisable: true,
      redirect: false,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, this.validarEmailSenha);
  }

  handleClick = () => {
    const { dispatch } = this.props;
    const { email } = this.state;
    dispatch(userInfo({ email }));
    this.setState({ redirect: true });
  };

  validarEmailSenha() {
    const { email, senha } = this.state;
    const minLength = 6;
    const re = /\S+@\S+\.\S+/;
    const emailVerificado = re.test(email);
    const senhaVerificada = senha.length >= minLength;
    this.setState({ isDisable: !(emailVerificado && senhaVerificada) });
  }

  render() {
    const { email, senha, isDisable, redirect } = this.state;
    return (
      <form>
        {redirect && <Redirect to="/carteira" />}
        <h1>Login</h1>
        <label htmlFor="email">
          E-mail:
          <input
            data-testid="email-input"
            type="email"
            value={ email }
            name="email"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="senha">
          Senha:
          <input
            data-testid="password-input"
            type="password"
            value={ senha }
            name="senha"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          disabled={ isDisable }
          onClick={ this.handleClick }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
