import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import { Status } from "../../redux/types";
import { INft } from "../../redux/types/tokens.interface";
import { fetchNfts } from "../reduxAsyncFuncs/tokensFuncs";
export interface tokensState {
  nfts: {
    status: Status;
    data: INft[];
    error: string;
  };
}

const initialState: tokensState = {
  nfts: {
    status: "idle",
    data: [],
    error: "",
  },
};

export const tokensSlice = createSlice({
  name: "tokens",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchNfts.pending, (state) => {
        state.nfts.status = "loading";
      })
      .addCase(fetchNfts.fulfilled, (state, action) => {
        state.nfts.status = "success";
        state.nfts.data = action.payload;
      })
      .addCase(fetchNfts.rejected, (state, action) => {
        state.nfts.status = "failed";
        state.nfts.error = action.error.message;
      });
  },
});

export const selectNfts = (state: RootState) => state.tokens.nfts;

// export const {} = tokensSlice.actions;

export default tokensSlice.reducer;
