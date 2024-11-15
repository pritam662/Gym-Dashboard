import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface cashoutCombine {
  _id: string;
  name: string | undefined;
  branch: string | undefined;
  expense: string;
  remark: string;
  amount: number;
  image: string;
  recipientPhone: number;
  date: string;
  pay?: boolean;
}

interface CashInFilterPayload {
  cashInMonth: number;
  cashInYear: number;
}
interface CashOutFilterPayload {
  cashOutMonth: number;
  cashOutYear: number;
}

export interface cashoutData {
  _id: string;
  expense: string;
  remark: string;
  amount: number;
  image: string;
  recipientPhone: number;
  date: string;
}

export interface cashinData {
  _id: string;
  name: string | undefined;
  amount: number;
  branch: string;
  date: string;
}

export interface initState {
  cashOutCombineDataFilter: cashoutCombine[];
  cashInDataFilter: cashinData[];
}

const initialState: initState = {
  cashOutCombineDataFilter: [],
  cashInDataFilter: []
};

const cashFilterSlice = createSlice({
  name: 'combineData',
  initialState,
  reducers: {
    addCashOutCombineDataFilter(
      state,
      action: PayloadAction<cashoutCombine[]>
    ) {
      console.log('Filtered Slice: ', action.payload);
      state.cashOutCombineDataFilter = [...action.payload];
    },
    addCashinDataFilter(state, action: PayloadAction<cashinData[]>) {
      console.log('From Filter Slice', action.payload);
      state.cashInDataFilter = [...action.payload];
    },
    addCashInFiltering(state, action: PayloadAction<CashInFilterPayload>) {
      if (action.payload.cashInMonth === 0 && action.payload.cashInYear > 0) {
        console.log(
          'Month is empty and ',
          'Year is ',
          action.payload.cashInYear
        );
      } else if (
        action.payload.cashInMonth > 0 &&
        action.payload.cashInYear === 0
      ) {
        console.log('Month is ', action.payload.cashInMonth, 'Year is Empty');
      } else if (
        action.payload.cashInMonth > 0 &&
        action.payload.cashInYear > 0
      ) {
        console.log(
          'Month: ',
          action.payload.cashInMonth,
          ' Year: ',
          action.payload.cashInYear
        );
      }
    },
    addCashOutFiltering(state, action: PayloadAction<CashOutFilterPayload>) {
      let filteredData = state.cashOutCombineDataFilter;
      if (action.payload.cashOutMonth === 0 && action.payload.cashOutYear > 0) {
        console.log(
          'Month is empty and ',
          'Year is ',
          action.payload.cashOutYear
        );
      } else if (
        action.payload.cashOutMonth > 0 &&
        action.payload.cashOutYear === 0
      ) {
        console.log('Month is ', action.payload.cashOutMonth, 'Year is Empty');
      } else if (
        action.payload.cashOutMonth > 0 &&
        action.payload.cashOutYear > 0
      ) {
        console.log(
          'Month: ',
          action.payload.cashOutMonth,
          ' Year: ',
          action.payload.cashOutYear
        );
      }
    }
  }
});

export const {
  addCashOutCombineDataFilter,
  addCashinDataFilter,
  addCashInFiltering,
  addCashOutFiltering
} = cashFilterSlice.actions;

export default cashFilterSlice.reducer;
