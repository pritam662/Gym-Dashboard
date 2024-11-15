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

export interface cashoutData {
  _id: string;
  expense: string;
  remark: string;
  amount: number;
  image: string;
  recipientPhone: number;
  date: string;
}

export interface initState {
  cashOutCombineData: cashoutCombine[];
  cashOutData: cashoutData[];
  cashOutDataStatus: string;
  cashOutDataError: string | null;
}

export const fetchCashout = createAsyncThunk('fetchCashoutData', async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_MAIN_URL}/datamoms`
  );
  return response.data;
});

const initialState: initState = {
  cashOutCombineData: [],
  cashOutData: [],
  cashOutDataStatus: 'idle',
  cashOutDataError: null
};

const expenseDataSlice = createSlice({
  name: 'combineData',
  initialState,
  reducers: {
    addExpenseCombineData(state, action: PayloadAction<cashoutCombine[]>) {
      console.log('Action form expenses slice', action.payload);

      state.cashOutCombineData = [...action.payload];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCashout.pending, (state) => {
        state.cashOutDataStatus = 'loading';
      })
      .addCase(fetchCashout.fulfilled, (state, action) => {
        (state.cashOutDataStatus = 'success'),
          (state.cashOutData = [...action.payload]);
      })
      .addCase(fetchCashout.rejected, (state, action) => {
        state.cashOutDataStatus = 'failed';
        state.cashOutDataError = action.error.message || null;
      });
  }
});

export const { addExpenseCombineData } = expenseDataSlice.actions;

export default expenseDataSlice.reducer;
