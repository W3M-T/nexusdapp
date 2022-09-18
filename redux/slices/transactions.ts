import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface transactionsState {
  result?: { type: string; content: string; status: boolean };
  pending: boolean;
  error?: string;
}

const initialState: transactionsState = {
  result: undefined,
  pending: false,
  error: undefined,
};

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    handleTxClose: (state) => {
      state.result = undefined;
      state.pending = false;
      state.error = undefined;
    },
    handleTxTransaction: (
      state,
      action: PayloadAction<{ type: string; content: string; status: boolean }>
    ) => {
      state.result = action.payload;
      state.pending = false;
      state.error = undefined;
    },
    handleTxPending: (state) => {
      state.result = undefined;
      state.pending = true;
      state.error = undefined;
    },
    handleTxError: (state, action: PayloadAction<string>) => {
      state.result = undefined;
      state.pending = false;
      state.error = action.payload;
    },
  },
});

export const selectTxResult = (state: RootState) => state.transactions.result;
export const selectTxPending = (state: RootState) => state.transactions.pending;
export const selectTxError = (state: RootState) => state.transactions.error;

// Action creators are generated for each case reducer function
export const {
  handleTxClose,
  handleTxTransaction,
  handleTxPending,
  handleTxError,
} = transactionsSlice.actions;

export default transactionsSlice.reducer;
