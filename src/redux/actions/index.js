export const ADD_USER = 'ADD_USER';

export const userInfo = (email) => ({
  type: ADD_USER,
  payload: email,
});

export const ADD_MOEDA = 'ADD_MOEDA';

export const walletInfo = (state) => ({
  type: ADD_MOEDA,
  payload: Object.keys(state).filter((e) => e !== 'USDT'),
});

export const ADD_DESPESA = 'ADD_DESPESA';

export const addDespesaState = (attMoeda, state) => ({
  type: ADD_DESPESA,
  payload: {
    ...state,
    exchangeRates: attMoeda,
  } });

export const INITIAL_REQ = 'INITIAL_REQ';
export const FAIL_REQ = 'FAIL_REQ';

export const initialRequest = () => ({ type: INITIAL_REQ });
export const failRequest = (erro) => ({ type: FAIL_REQ, erro });

export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const EDIT_TRUE = 'EDIT_TRUE';

export const removeExpense = (remove) => ({ type: REMOVE_EXPENSE, remove });
export const editExpense = (edit) => ({ type: EDIT_EXPENSE, edit });
export const editTrue = (id) => ({
  type: EDIT_TRUE,
  payload: true,
  id,
});

export const fetchAPI = () => async (dispatch) => {
  try {
    dispatch(initialRequest());
    const url = 'https://economia.awesomeapi.com.br/json/all';
    const request = await fetch(url);
    const resposta = await request.json();
    dispatch(walletInfo(resposta));
  } catch (error) {
    dispatch(failRequest(error));
  }
};

export const addDespesaRequest = (obj) => async (dispatch) => {
  try {
    dispatch(initialRequest());
    const url = 'https://economia.awesomeapi.com.br/json/all';
    const request = await fetch(url);
    const resposta = await request.json();
    dispatch(addDespesaState(resposta, obj));
  } catch (error) {
    dispatch(failRequest(error));
  }
};
