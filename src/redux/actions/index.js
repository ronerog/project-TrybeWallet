// Coloque aqui suas actions
export const ADD_USER = 'ADD_USER';

export const userInfo = (state) => ({
  type: ADD_USER,
  payload: { ...state },
});

export const ADD_WALLET = 'ADD_WALLET';

export const walletInfo = (state) => ({
  type: ADD_WALLET,
  payload: Object.keys(state).filter((e) => e !== 'USDT'),
});

export const INITIAL_REQ = 'INITIAL_REQ';
export const FAIL_REQ = 'FAIL_REQ';

export const initialRequest = () => ({ type: INITIAL_REQ });
export const failRequest = (erro) => ({ type: FAIL_REQ, erro });

export const fetchAPI = () => {
  async (dispatch) => {
    try {
      dispatch(initialRequest());
      const url = `https://economia.awesomeapi.com.br/json/all`;
      const request = await fetch(url);
      const resposta = await request.json();
      dispatch(walletInfo(resposta));
    } catch (error) {
      dispatch(failRequest(error));
    }
  };
}
