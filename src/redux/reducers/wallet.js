import { ADD_WALLET } from '../actions';

const INITIAL_STATE = {};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_WALLET:
    return {
      ...state,
    };
  default:
    return state;
  }
};

export default wallet;
