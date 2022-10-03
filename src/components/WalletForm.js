import React, { Component } from 'react';
import { connect } from 'react-redux';

class WalletForm extends Component {
  constructor() {
    super()

    this.state = {
      valor: 0,
      describe: '',
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { valor, describe } = this.state;
    const { currencies } = this.props;
    return (
      <form>
        <label htmlFor="valor">
          Valor:
          <input
            type="number"
            data-testid="email-field"
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
        <label>
          Moeda:
          <select
          data-testid="currency-input"
          >
             { currencies.map((element) => <option key={ element }>{element}</option>)}
          </select>
        </label>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies
})

export default connect(mapStateToProps)(WalletForm);
