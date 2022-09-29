import React from 'react';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      senha: '',
      isDisable: true,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, this.validarEmailSenha);
  }

  validarEmailSenha() {
    const { email, senha } = this.state;
    const maxLength = 6;
    const re = /\S+@\S+\.\S+/;
    const emailVerificado = re.test(email);
    const senhaVerificada = senha.length >= maxLength;
    this.setState({ isDisable: !(emailVerificado && senhaVerificada) });
  }

  render() {
    const { email, senha, isDisable } = this.state;
    return (
      <form>
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
        >
          Entrar
        </button>
      </form>
    );
  }
}

export default Login;
