// src/store/actions.ts
import { FETCH_DATA, GET_DATA_BY_ID } from './actionTypes';

export interface FetchDataAction {
  type: typeof FETCH_DATA;
  payload: Array<{ symbol: string; price: number; timestamp: string }>;
}

export interface SetSymbolAction {
  type: typeof GET_DATA_BY_ID;
  payload: string;
}

export type DataActionTypes = FetchDataAction | SetSymbolAction;

// Action creators
export const fetchData = (data: Array<{ symbol: string; price: number; timestamp: string }>): FetchDataAction => ({
  type: FETCH_DATA,
  payload: data,
});

export const setSymbol = (symbol: string): SetSymbolAction => ({
  type: GET_DATA_BY_ID,
  payload: symbol,
});
