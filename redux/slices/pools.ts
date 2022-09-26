import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INftCollection } from "../../types/collection";
import {
  fetchExistringPools,
  fetchIsNftCreator,
  fetchNonWithdrawnCollections,
  fetchRegistrationInfo,
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
  createPool: {
    collection?: INftCollection;
    phase1?: {
      status: "success" | "error";
      message: string;
    };
    phase2?: {
      status: "success" | "error" | "idle";
      message: string;
      data?: {
        tokenI: string;
        tokenAmount: string | number;
        payed: boolean;
      };
    };
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

  //creando el form para crear pools pases
  createPool: {
    collection: null,
    phase1: null,
    phase2: {
      message: "",
      status: "success",
      data: null,
    },
  },
};

export const poolsSlice = createSlice({
  name: "pools",
  initialState,
  reducers: {
    setCreatePoolCollection: (state, action) => {
      state.createPool.collection = action.payload;
    },
    setCreatePoolPahe1: (state, action) => {
      state.createPool.phase1 = action.payload;
    },
  },
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
      })
      //fetchRegistrationInfo
      .addCase(fetchRegistrationInfo.pending, (state) => {
        state.createPool.phase2.status = "success";
      })
      .addCase(fetchRegistrationInfo.fulfilled, (state, action) => {
        state.createPool.phase2.status = "success";
        state.createPool.phase2.message = "Registration completed!";
        state.createPool.phase2.data = action.payload;
      })
      .addCase(fetchRegistrationInfo.rejected, (state, action) => {
        state.createPool.phase2.status = "error";
        state.createPool.phase2.message = action.error.message;
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
export const selectCreatePool = (state: RootState) => state.pools.createPool;
export const selectUserStaked = (state: RootState) => state.pools.userStaked;

// Action creators are generated for each case reducer function
// export const { setAddress } = poolsSlice.actions;
export const { setCreatePoolCollection, setCreatePoolPahe1 } =
  poolsSlice.actions;

export default poolsSlice.reducer;
