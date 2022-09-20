import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchExistringPools, fetchStats } from "../asyncFuncs/poolsFuncs";
import { RootState } from "../store";
import { Status } from "../types";
import { IExistingPool, IPoolStats } from "../types/pools.interface";

export interface poolsState {
  stats: {
    status: Status;
    data: IPoolStats;
    error: string;
  };
  existingPools: {
    status: Status;
    data: IExistingPool[];
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
  existingPools: {
    status: "idle",
    data: [],
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
      })
      //fetchExistringPools
      .addCase(fetchExistringPools.pending, (state) => {
        state.existingPools.status = "loading";
      })
      .addCase(
        fetchExistringPools.fulfilled,
        (state, action: PayloadAction<IExistingPool[]>) => {
          state.existingPools.status = "success";
          state.existingPools.data = action.payload;
        }
      )
      .addCase(fetchExistringPools.rejected, (state, action) => {
        state.existingPools.status = "failed";
        state.existingPools.error = action.error.message;
      });
  },
});

export const selectPoolStats = (state: RootState) => state.pools.stats;
export const selectExistingPools = (state: RootState) =>
  state.pools.existingPools;

// Action creators are generated for each case reducer function
// export const { setAddress } = poolsSlice.actions;

export default poolsSlice.reducer;
