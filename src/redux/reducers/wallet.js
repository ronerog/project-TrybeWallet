import {
  ADD_DESPESA, ADD_MOEDA,
  EDIT_EXPENSE, EDIT_TRUE,
  INITIAL_REQ,
  REMOVE_EXPENSE,
} from '../actions';

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
      editor: false,
    };
  case EDIT_TRUE:
    return {
      ...state,
      editor: action.payload,
      idToEdit: action.id,
    };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: action.remove,
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      expenses: [...action.edit],
      editor: false,
    };
  default:
    return state;
  }
};

export default wallet;
