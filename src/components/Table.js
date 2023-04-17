import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editExpense, removeExpenseAction } from '../redux/actions';

class Table extends Component {
  removeItem = ({ target }) => {
    const { dispatch } = this.props;
    const { name } = target;
    dispatch(removeExpenseAction(+name));
  };

  editButton = ({ target }) => {
    const { name } = target;
    const { dispatch } = this.props;
    dispatch(editExpense(+name));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Descrição|</th>
              <th>Tag|</th>
              <th>Método de pagamento|</th>
              <th>Valor|</th>
              <th>Moeda|</th>
              <th>Câmbio utilizado|</th>
              <th>Valor convertido|</th>
              <th>Moeda de conversão|</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((element) => (
              <tr key={ element.id }>
                <td>{element.description}</td>
                <td>{element.tag}</td>
                <td>{element.method}</td>
                <td>{Number(element.value).toFixed(2)}</td>
                <td>{element.exchangeRates[element.currency].name}</td>
                <td>{Number(element.exchangeRates[element.currency].ask).toFixed(2)}</td>
                <td>
                  {(Number(element.value)
                    * Number(element.exchangeRates[element.currency].ask)).toFixed(2)}
                </td>
                <td>Real</td>
                <td>
                  <button
                    name={ element.id }
                    onClick={ this.editButton }
                    data-testid="edit-btn"
                    type="button"
                  >
                    EDITAR
                  </button>
                </td>
                <td>
                  <button
                    onClick={ this.removeItem }
                    name={ element.id }
                    type="button"
                    data-testid="delete-btn"
                  >
                    DELETAR
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.shape({
    map: PropTypes.func.isRequired,
  }).isRequired,
};
const mapStateToProps = (globalState) => ({
  expenses: globalState.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
