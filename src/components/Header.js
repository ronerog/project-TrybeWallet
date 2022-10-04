import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  total = () => {
    const { expenses } = this.props;
    console.log(expenses);
    const subtotal = expenses.reduce((acc, curr) => {
      const { moeda } = curr;
      if (moeda !== 'USDT') {
        const valor = Number(curr.exchangeRates[moeda].ask) * Number(curr.valor);
        return acc + Number(valor);
      }
      return acc;
    }, 0);
    return Number(subtotal).toFixed(2);
  };

  render() {
    const { email } = this.props;
    return (
      <header>
        <p data-testid="email-field">
          {' '}
          Olá,
          { email }
          !
        </p>
        <span data-testid="total-field">
          Despesa Total: R$
          { this.total() }
        </span>
        <span data-testid="header-currency-field">BRL</span>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
