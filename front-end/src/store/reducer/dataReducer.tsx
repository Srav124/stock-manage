// src/store/reducers/dataReducer.ts
import { FETCH_DATA, GET_DATA_BY_ID } from './actionTypes';
import { DataActionTypes } from './action';

interface DataState {
  returnData: any;
  data: Array<{ symbol: string; price: number; timestamp: string }>;
  symbol: string;
}

const initialState: DataState = {
  data: [],
  symbol: 'bitcoin',
};

const dataReducer = (state = initialState, action: DataActionTypes): DataState => {
  switch (action.type) {
    case FETCH_DATA:
      return {
        ...state,
        data: action.payload,
      };
    case GET_DATA_BY_ID:
      return {
        ...state,
        symbol: action.payload,
      };
    default:
      return state;
  }
};

export default dataReducer;
