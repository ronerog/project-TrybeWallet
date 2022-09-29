import { ADD_USER } from '../actions';

const INITIAL_STATE = {};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_USER:
    return {
      ...state,
    };
  default:
    return state;
  }
};

export default user;
