import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface EmployeeData {
  _id: string;
  name: string;
  destination: string;
  recipientPhone: number;
  branch: string;
  status: string;
}

export interface cashout {
  _id: string;
  expense: string;
  remark: string;
  amount: number;
  image: string;
  recipientPhone: number;
  date: string;
}
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
  pay: boolean;
}

export interface branchData {
  _id: string;
  branch: string;
  totalRemainnig: number;
  spendAmount: number;
  recipientPhone: number;
}

interface ItemsState {
  EmployeesData: EmployeeData[];
  branch: string;
  EmployeeStatus: string;
  EmployeeError: string | null;
  cashOutAll: cashout[];
  cashoutStatus: string;
  cashoutError: string | null;
  uniqueNumberofEmployee: number[];
  uniqueBranches: string[];
  branchesData: branchData[];
  branchstatus: string;
  brancherror: string | null;
}

const initialState: ItemsState = {
  EmployeesData: [],
  branch: '',
  EmployeeStatus: 'idle',
  EmployeeError: null,
  cashOutAll: [],
  cashoutStatus: 'idle',
  cashoutError: null,
  uniqueNumberofEmployee: [],
  uniqueBranches: [],
  branchesData: [],
  branchstatus: 'idle',
  brancherror: null
};

export const fetchEmployeeData = createAsyncThunk(
  'items/fetchItems',
  async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_MAIN_URL}/employeeData`
    );
    return response.data;
  }
);

export const fetchCashoutData = createAsyncThunk(
  'fetchCashoutData',
  async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_MAIN_URL}/expenseData`
    );
    return response.data;
  }
);
export const fetchBranchData = createAsyncThunk('fetchBranchData', async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_MAIN_URL}/branchData`
  );
  return response.data;
});

const mainDataSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<EmployeeData>) {
      state.EmployeesData.push(action.payload);
    },
    removeItem(state, action: PayloadAction<string>) {
      state.EmployeesData = state.EmployeesData.filter(
        (item) => item._id !== action.payload
      );
    },
    updateItem(state, action: PayloadAction<EmployeeData>) {
      const index = state.EmployeesData.findIndex(
        (item) => item._id === action.payload._id
      );
      if (index !== -1) {
        state.EmployeesData[index] = action.payload;
      }
    },
    replaceItems(state, action: PayloadAction<EmployeeData[]>) {
      state.EmployeesData = action.payload;
    },
    updateBranch(state, action: PayloadAction<string>) {
      state.branch = action.payload;
    },
    addUniqueNumber(state, action: PayloadAction<number[]>) {
      state.uniqueNumberofEmployee = [...action.payload];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployeeData.pending, (state) => {
        state.EmployeeStatus = 'loading';
      })
      .addCase(fetchEmployeeData.fulfilled, (state, action) => {
        state.EmployeeStatus = 'succeeded';
        state.EmployeesData = action.payload;

        const uniqueBranches: string[] = Array.from(
          new Set(
            action.payload.map((item: EmployeeData) => {
              if (typeof item.branch === 'string' && item.branch.length > 0) {
                return (
                  item.branch.charAt(0).toUpperCase() +
                  item.branch.slice(1).toLowerCase()
                );
              } else {
                return item.branch;
              }
            })
          )
        );
        state.uniqueBranches = [...uniqueBranches];
      })
      .addCase(fetchEmployeeData.rejected, (state, action) => {
        state.EmployeeStatus = 'failed';
        state.EmployeeError = action.error.message || null;
      })
      .addCase(fetchCashoutData.pending, (state) => {
        state.cashoutStatus = 'loading';
      })
      .addCase(fetchCashoutData.fulfilled, (state, action) => {
        state.cashoutStatus = 'succeeded';
        state.cashOutAll = action.payload;
        // console.log("from slicer Expense", state.cashOutAll)
      })
      .addCase(fetchCashoutData.rejected, (state, action) => {
        state.cashoutStatus = 'failed';
        state.cashoutError = action.error.message || null;
      })
      .addCase(fetchBranchData.pending, (state) => {
        state.branchstatus = 'loading';
      })
      .addCase(fetchBranchData.fulfilled, (state, action) => {
        state.branchstatus = 'succeeded';
        state.branchesData = action.payload;
        // console.log("from slicer Expense", state.branchesData)
      })
      .addCase(fetchBranchData.rejected, (state, action) => {
        state.branchstatus = 'failed';
        state.brancherror = action.error.message || null;
      });
  }
});

export const {
  addItem,
  removeItem,
  updateItem,
  replaceItems,
  updateBranch,
  addUniqueNumber
} = mainDataSlice.actions;

export default mainDataSlice.reducer;
