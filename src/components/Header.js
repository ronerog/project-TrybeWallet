import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  total = () => {
    const { expenses } = this.props;
    console.log(expenses);
    const subtotal = expenses.reduce((acc, curr) => {
      const { currency } = curr;
      if (currency !== 'USDT') {
        const valor = Number(curr.exchangeRates[currency].ask) * Number(curr.value);
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
          {email}
          !
        </p>
        <p>
          Despesa Total: R$
          <span data-testid="total-field">
            {this.total()}
          </span>
        </p>
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
