import { configureStore } from '@reduxjs/toolkit';
import { useSelector, TypedUseSelectorHook } from 'react-redux';

// import orderFormReducer from "./features/order-form-slice";
// import sidebarToggleReducer from "./features/sidebar-toggle-slice";
import main from './feature/main';
import { reducer } from '@dnd-kit/core/dist/store';
import mainData from './feature/main';
import expenseData from './feature/expensesDataSlice';
import cashinDataSlice from './feature/cashinDataSlice';
import cashDataFilter from './feature/cashFilterSlice';

export const store = configureStore({
  reducer: {
    // orderFormReducer,
    // sidebarToggle: sidebarToggleReducer
    mainData: mainData,
    expenseData: expenseData,
    cashinDataSlice: cashinDataSlice,
    cashDataFilter: cashDataFilter
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
