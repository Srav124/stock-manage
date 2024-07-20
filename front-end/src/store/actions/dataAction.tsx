import axios from 'axios';
import { Dispatch } from 'redux';
import { FETCH_DATA, GET_DATA_BY_ID } from '../reducer/actionTypes';
import { DataActionTypes } from '../reducer/action';

// Fetch all crypto data
export const fetchData = () => async (dispatch: Dispatch<DataActionTypes>) => {
  try {
    const response = await axios.get('http://localhost:3000/allCrypto');
    dispatch({ type: FETCH_DATA, payload: response.data });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Set symbol and fetch data by symbol
export const setSymbol = (symbol: string) => async (dispatch: Dispatch<DataActionTypes>) => {
  try {
    const response = await axios.get(`http://localhost:3000/stock/${symbol}`);
    dispatch({ type: GET_DATA_BY_ID, payload: symbol });
    dispatch({ type: FETCH_DATA, payload: response.data });
  } catch (error) {
    console.error('Error setting symbol:', error);
  }
};
