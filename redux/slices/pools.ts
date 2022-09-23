import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchExistringPools,
  fetchIsNftCreator,
  fetchNonWithdrawnCollections,
  fetchStats,
  fetchUserStaked,
} from "../asyncFuncs/poolsFuncs";
import { RootState } from "../store";
import { Status } from "../types";
import { IExistingPool, IPoolStats, IStaked } from "../types/pools.interface";

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
  userStaked: {
    status: Status;
    data: IStaked[];
    error: string;
  };
  isNftCreator: {
    status: Status;
    data: boolean;
    error: string;
  };
  nonWithdrawnCollections: {
    status: Status;
    data: string[];
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

  userStaked: {
    status: "idle",
    data: [],
    error: "",
  },
  isNftCreator: {
    status: "idle",
    data: true,
    error: "",
  },
  nonWithdrawnCollections: {
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
      })
      //fetchUserStaked
      .addCase(fetchUserStaked.pending, (state) => {
        state.userStaked.status = "loading";
      })
      .addCase(fetchUserStaked.fulfilled, (state, action) => {
        state.userStaked.status = "success";
        state.userStaked.data = action.payload;
      })
      .addCase(fetchUserStaked.rejected, (state, action) => {
        state.userStaked.status = "failed";
        state.userStaked.error = action.error.message;
      })
      //fetchIsNftCreator
      .addCase(fetchIsNftCreator.pending, (state) => {
        state.isNftCreator.status = "loading";
      })
      .addCase(fetchIsNftCreator.fulfilled, (state, action) => {
        state.isNftCreator.status = "success";
        state.isNftCreator.data = action.payload;
      })
      .addCase(fetchIsNftCreator.rejected, (state, action) => {
        state.isNftCreator.status = "failed";
        state.isNftCreator.error = action.error.message;
      })
      //fetchNonWithdrawnCollections
      .addCase(fetchNonWithdrawnCollections.pending, (state) => {
        state.nonWithdrawnCollections.status = "loading";
      })
      .addCase(fetchNonWithdrawnCollections.fulfilled, (state, action) => {
        state.nonWithdrawnCollections.status = "success";
        state.nonWithdrawnCollections.data = action.payload;
      })
      .addCase(fetchNonWithdrawnCollections.rejected, (state, action) => {
        state.nonWithdrawnCollections.status = "failed";
        state.nonWithdrawnCollections.error = action.error.message;
      });
  },
});

export const selectPoolStats = (state: RootState) => state.pools.stats;
export const selectisNftCreator = (state: RootState) =>
  state.pools.isNftCreator;
export const selectExistingPools = (state: RootState) =>
  state.pools.existingPools;
export const selectNonWithdrawnCollections = (state: RootState) =>
  state.pools.nonWithdrawnCollections;

// Action creators are generated for each case reducer function
// export const { setAddress } = poolsSlice.actions;

export default poolsSlice.reducer;
