import axios from 'axios';
import { Dispatch } from 'redux';

export const fetchData = (symbol: string) => async (dispatch: Dispatch) => {
  try {
    const response = await axios.get(`http://localhost:3000/allCrypto`);
    dispatch({ type: 'FETCH_DATA', payload: response.data });
  } catch (error) {
    console.error(error);
  }
};

export const setSymbol = (symbol: string) => {
  return { type: 'SET_SYMBOL', payload: symbol };
};
