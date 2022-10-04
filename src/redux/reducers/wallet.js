import { ADD_DESPESA, ADD_MOEDA, INITIAL_REQ } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case INITIAL_REQ:
    return state;
  case ADD_MOEDA:
    return {
      ...state,
      currencies: action.payload,
    };
  case ADD_DESPESA:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  default:
    return state;
  }
};

export default wallet;
