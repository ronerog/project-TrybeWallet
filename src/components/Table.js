import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  retornaAsk = (ask) => Number(ask).toFixed(2);
  conversão = (ask, value) => (Number(ask) * Number(value)).toFixed(2);

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>

          {expenses.map((e) => (
            <tr
              key={e.id}
            >
              <td>{e.description}</td>
              <td>{e.tag}</td>
              <td>{e.method}</td>
              <td>{Number(e.value).toFixed(2)}</td>
              <td>{e.exchangeRates[e.currency].name}</td>
              <td>{this.retornaAsk(e.exchangeRates[e.currency].ask)}</td>
              <td>
                {this.conversão(
                  e.exchangeRates[e.currency].ask,
                  e.value,
                )}
              </td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  data-testid="delete-btn"
                >
                  Excluir
                </button>
              </td>
              <td>
                <button
                  type="button"
                  data-testid="edit-btn"
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.shape(),
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  id: state.wallet.id,
});

export default connect(mapStateToProps)(Table);
