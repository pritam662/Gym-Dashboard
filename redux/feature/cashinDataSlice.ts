import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export interface cashinData {
    _id: string;
    name: string | undefined;
    amount: number;
    branch: string;
    date:string
  }

export interface initState{
  cashinData: cashinData[]
  cashinDataStatus: string,
  cashinError: string |null,
  cashinToDisplay:cashinData[]
}


export const fetchCashInData = createAsyncThunk('fetchCashInData', async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_MAIN_URL}/cashData`);
  return response.data;
});

  const initialState: initState = {
    cashinData:[],
    cashinDataStatus:"idle",
    cashinError:null,
    cashinToDisplay:[]
  };


  const cashinDataSlice = createSlice({
    name: 'cashinData',
    initialState,
    reducers: {
      addCashinData(state, action: PayloadAction<cashinData[]>){
        state.cashinToDisplay = [...action.payload]
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchCashInData.pending, (state) => {
          state.cashinDataStatus = 'loading';
        })
       .addCase(fetchCashInData.fulfilled,(state, action)=>{
        state.cashinDataStatus = 'succeeded'
        state.cashinData = action.payload
        state.cashinToDisplay = action.payload
       })
       .addCase(fetchCashInData.rejected,(state, action)=>{
        state.cashinError = action.error.message || null;
       })
  
    },
  });


  export const { addCashinData } = cashinDataSlice.actions;

export default cashinDataSlice.reducer;