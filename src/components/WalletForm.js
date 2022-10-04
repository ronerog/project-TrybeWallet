import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addDespesaRequest } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      valor: '',
      describe: '',
      moeda: 'USD',
      metodoPgmt: 'Dinheiro',
      categoria: 'Alimentação',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleClick = () => {
    const { addDespesa } = this.props;
    this.setState((state) => ({
      id: state.id + 1,
    }));
    const { valor, describe, moeda, metodoPgmt, categoria, id } = this.state;
    addDespesa({ id, valor, describe, moeda, metodoPgmt, categoria });
    this.stateReset();
  };

  stateReset = () => {
    this.setState({
      valor: '',
      describe: '',
      moeda: 'USD',
      metodoPgmt: 'Dinheiro',
      categoria: 'Alimentação',
    });
  };

  render() {
    const { valor, describe, moeda, metodoPgmt, categoria } = this.state;
    const { currencies } = this.props;
    return (
      <form>
        <label htmlFor="valor">
          Valor:
          <input
            type="text"
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
            value={ moeda }
            onChange={ this.handleChange }
          >
            {currencies.map((element) => <option key={ element }>{ element }</option>)}
          </select>
        </label>
        <label htmlFor="metodoPgmt">
          Método de pagamento:
          <select
            name="metodoPgmt"
            data-testid="method-input"
            value={ metodoPgmt }
            onChange={ this.handleChange }
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
            value={ categoria }
            onChange={ this.handleChange }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
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
