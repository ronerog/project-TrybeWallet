import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addDespesaRequest } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleClick = () => {
    const { addDespesa } = this.props;
    const { value, description, currency, method, tag, id } = this.state;
    this.setState((state) => ({
      id: state.id + 1,
    }));
    addDespesa({ id, value, description, currency, method, tag });
    this.stateReset();
  };

  stateReset = () => {
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies } = this.props;
    return (
      <form>
        <label htmlFor="value">
          Valor:
          <input
            type="text"
            data-testid="value-input"
            name="value"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            type="text"
            data-testid="description-input"
            name="description"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select
            name="currency"
            data-testid="currency-input"
            value={ currency }
            onChange={ this.handleChange }
          >
            {currencies.map((element) => <option key={ element }>{ element }</option>)}
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento:
          <select
            name="method"
            data-testid="method-input"
            value={ method }
            onChange={ this.handleChange }
          >
            <option
              value="Dinheiro"
              name="method"
            >
              Dinheiro
            </option>
            <option
              value="Cartão de crédito"
              name="method"
            >
              Cartão de crédito
            </option>
            <option
              value="Cartão de débito"
              name="method"
            >
              Cartão de débito
            </option>
          </select>
        </label>
        <label htmlFor="tag">
          Categoria:
          <select
            name="tag"
            data-testid="tag-input"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option
              value="Alimentação"
              name="tag"
            >
              Alimentação
            </option>
            <option
              value="Lazer"
              name="tag"
            >
              Lazer
            </option>
            <option
              value="Trabalho"
              name="tag"
            >
              Trabalho
            </option>
            <option
              value="Transporte"
              name="tag"
            >
              Transporte
            </option>
            <option
              value="Saúde"
              name="tag"
            >
              Saúde
            </option>
          </select>
        </label>
        <button
          type="button"
          onClick={ this.handleClick }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  addDespesa: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addDespesa: (obj) => dispatch(addDespesaRequest(obj)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
