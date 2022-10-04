import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      valor: 0,
      describe: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  render() {
    const { valor, describe } = this.state;
    const { currencies } = this.props;
    return (
      <form>
        <label htmlFor="valor">
          Valor:
          <input
            type="number"
            data-testid="value-input"
            name="valor"
            value={ valor }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="describe">
          Descrição:
          <input
            type="text"
            data-testid="description-input"
            name="describe"
            value={ describe }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="moeda">
          Moeda:
          <select
            name="moeda"
            data-testid="currency-input"
          >
            {currencies.map((element) => <option key={ element }>{element}</option>)}
          </select>
        </label>
        <label htmlFor="metodoPgmt">
          Método de pagamento:
          <select
            name="metodoPgmt"
            data-testid="method-input"
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="categoria">
          Categoria:
          <select
            name="categoria"
            data-testid="tag-input"
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
