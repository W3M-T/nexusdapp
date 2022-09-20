import { createSlice } from "@reduxjs/toolkit";
import { fetchStats } from "../asyncFuncs/poolsFuncs";
import { RootState } from "../store";
import { Status } from "../types";
import { IPoolStats } from "../types/pools.interface";

export interface poolsState {
  stats: {
    status: Status;
    data: IPoolStats;
    error: string;
  };
}

const initialState: poolsState = {
  stats: {
    status: "idle",
    data: {
      poolsCreated: 0,
      nftStaked: 0,
      feesCollected: [],
    },
    error: "",
  },
};

export const poolsSlice = createSlice({
  name: "pools",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchStats.pending, (state) => {
        state.stats.status = "loading";
      })
      .addCase(fetchStats.fulfilled, (state, action) => {
        state.stats.status = "success";
        state.stats.data = action.payload;
      })
      .addCase(fetchStats.rejected, (state, action) => {
        state.stats.status = "failed";
        state.stats.error = action.error.message;
      });
  },
});

export const selectPoolStats = (state: RootState) => state.pools.stats;

// Action creators are generated for each case reducer function
// export const { setAddress } = poolsSlice.actions;

export default poolsSlice.reducer;
