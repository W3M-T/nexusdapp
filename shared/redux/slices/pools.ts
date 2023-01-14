import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addDays } from "date-fns";
import { INftCollection } from "../../types/collection";
import { IPagination } from "../../types/pagination";
import {
  fetchAllowedRegistrationTokens,
  fetchAllowedRewardTokens,
  fetchExistringPools,
  fetchHasReadWarning,
  fetcHhasStakedForAEN,
  fetchIsNftCreator,
  fetchNeedsToUnstake,
  fetchNonWithdrawnCollections,
  fetchRegistrationInfo,
  fetchStats,
  fetchUserStaked,
} from "../reduxAsyncFuncs/poolsFuncs";
import { RootState } from "../store";
import { Status } from "../types";
import {
  IExistingPool,
  IPoolStats,
  IStakedWithTokenDetails,
} from "../types/pools.interface";

export interface poolsState {
  stats: {
    status: Status;
    data: IPoolStats;
    error: string;
  };
  existingPools: {
    status: Status;
    data: IExistingPool[];
    data2: IExistingPool[];
    data3: IExistingPool[];
    data4: IExistingPool[];
    error: string;
  };
  userStaked: {
    status: Status;
    data: {
      nfts: IStakedWithTokenDetails[];
      pagination: IPagination;
    };
    page: number;
    error: string;
  };
  userStatus: {
    status: Status;
    data: {
      isOwner: boolean;
      isNftCreator: boolean;
    };
    error: string;
  };
  nonWithdrawnCollections: {
    status: Status;
    data: string[];
    error: string;
  };
  allowedRegistrationTokens: {
    status: Status;
    data: string[];
    error: string;
  };
  allowedRewardTokens: {
    status: Status;
    data: string[];
    error: string;
  };
  hasStakedForAEN: {
    status: Status;
    data: boolean;
    error: string;
  };
  needToUnstake: {
    status: Status;
    data: boolean;
    error: string;
  };
  hasSeenWarning: {
    status: Status;
    data: boolean;
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
    data2: [],
    data3: [],
    data4: [],
    error: "",
  },

  userStaked: {
    status: "idle",
    data: {
      nfts: [],
      pagination: {
        pageCount: 0,
      },
    },
    page: 1,
    error: "",
  },
  userStatus: {
    status: "idle",
    data: {
      isOwner: false,
      isNftCreator: false,
    },
    error: "",
  },
  nonWithdrawnCollections: {
    status: "idle",
    data: [],
    error: "",
  },
  allowedRegistrationTokens: {
    status: "idle",
    data: [],
    error: "",
  },
  allowedRewardTokens: {
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

  hasStakedForAEN: {
    status: "idle",
    data: false,
    error: "",
  },

  needToUnstake: {
    status: "idle",
    data: false,
    error: "",
  },
  hasSeenWarning: {
    status: "idle",
    data: true,
    error: "",
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
    setCreatePoolPahe2: (state, action) => {
      state.createPool.phase2 = action.payload;
    },
    setCreatePool: (state, action) => {
      state.createPool = action.payload;
    },
    setFilteredPools: (state, action: PayloadAction<IExistingPool[]>) => {
      state.existingPools.data4 = action.payload;
    },
    changeStakedNftPage: (state, action: PayloadAction<number>) => {
      state.userStaked.page = action.payload;
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
          state.existingPools.data2 = action.payload;
          state.existingPools.data3 = action.payload.filter((p) => {
            const date = new Date(p.timestam * 1000);

            const dateInAMonth = addDays(date, p.poolDuration);
            const today = new Date();

            if (dateInAMonth < today || p.collection === "") {
              return false;
            } else {
              return true;
            }
          });
          state.existingPools.data4 = action.payload.filter((p) => {
            const date = new Date(p.timestam * 1000);

            const dateInAMonth = addDays(date, p.poolDuration);
            const today = new Date();

            if (dateInAMonth < today || p.collection === "") {
              return false;
            } else {
              return true;
            }
          });
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
        state.userStatus.status = "loading";
      })
      .addCase(fetchIsNftCreator.fulfilled, (state, action) => {
        state.userStatus.status = "success";
        state.userStatus.data.isNftCreator = action.payload.isNftCreator;
        state.userStatus.data.isOwner = action.payload.isAdmin;
      })
      .addCase(fetchIsNftCreator.rejected, (state, action) => {
        state.userStatus.status = "failed";
        state.userStatus.error = action.error.message;
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
      })
      //fetchAllowedRegistrationTokens
      .addCase(fetchAllowedRegistrationTokens.pending, (state) => {
        state.allowedRegistrationTokens.status = "success";
      })
      .addCase(fetchAllowedRegistrationTokens.fulfilled, (state, action) => {
        state.allowedRegistrationTokens.status = "success";
        state.allowedRegistrationTokens.data = action.payload;
      })
      .addCase(fetchAllowedRegistrationTokens.rejected, (state) => {
        state.allowedRegistrationTokens.status = "failed";
      })
      //fetchAllowedRewardTokens
      .addCase(fetchAllowedRewardTokens.pending, (state) => {
        state.allowedRewardTokens.status = "success";
      })
      .addCase(fetchAllowedRewardTokens.fulfilled, (state, action) => {
        state.allowedRewardTokens.status = "success";
        state.allowedRewardTokens.data = action.payload;
      })
      .addCase(fetchAllowedRewardTokens.rejected, (state) => {
        state.allowedRewardTokens.status = "failed";
      })
      //fetcHhasStakedForAEN
      .addCase(fetcHhasStakedForAEN.pending, (state) => {
        state.hasStakedForAEN.status = "success";
      })
      .addCase(fetcHhasStakedForAEN.fulfilled, (state, action) => {
        state.hasStakedForAEN.status = "success";
        state.hasStakedForAEN.data = action.payload;
      })
      .addCase(fetcHhasStakedForAEN.rejected, (state) => {
        state.hasStakedForAEN.status = "failed";
      })
      //fetchNeedsToUnstake
      .addCase(fetchNeedsToUnstake.pending, (state) => {
        state.needToUnstake.status = "success";
      })
      .addCase(fetchNeedsToUnstake.fulfilled, (state, action) => {
        state.needToUnstake.status = "success";
        state.needToUnstake.data = action.payload;
      })
      .addCase(fetchNeedsToUnstake.rejected, (state) => {
        state.needToUnstake.status = "failed";
      })
      //fetchHasReadWarning
      .addCase(fetchHasReadWarning.pending, (state) => {
        state.hasSeenWarning.status = "success";
      })
      .addCase(fetchHasReadWarning.fulfilled, (state, action) => {
        state.hasSeenWarning.status = "success";
        state.hasSeenWarning.data = action.payload;
      })
      .addCase(fetchHasReadWarning.rejected, (state) => {
        state.hasSeenWarning.status = "failed";
      });
  },
});

export const selectPoolStats = (state: RootState) => state.pools.stats;
export const selectisNftCreator = (state: RootState) =>
  state.pools.userStatus.data.isNftCreator;
export const selectisScOwner = (state: RootState) =>
  state.pools.userStatus.data.isOwner;
export const selectExistingPools = (state: RootState) =>
  state.pools.existingPools;
export const selectNonWithdrawnCollections = (state: RootState) =>
  state.pools.nonWithdrawnCollections;
export const selectCreatePool = (state: RootState) => state.pools.createPool;
export const selectUserStaked = (state: RootState) => state.pools.userStaked;
export const selectRegistrationTokens = (state: RootState) =>
  state.pools.allowedRegistrationTokens;
export const selectRewardsTokens = (state: RootState) =>
  state.pools.allowedRewardTokens;
export const selectHasStakedForAEN = (state: RootState) =>
  state.pools.hasStakedForAEN;
export const selectHasSeenWarning = (state: RootState) =>
  state.pools.hasSeenWarning;
export const selectCanUserStake = (state: RootState) =>
  state.pools.needToUnstake;

// Action creators are generated for each case reducer function
// export const { setAddress } = poolsSlice.actions;
export const {
  setCreatePoolCollection,
  setCreatePoolPahe1,
  setCreatePoolPahe2,
  setCreatePool,
  setFilteredPools,
  changeStakedNftPage,
} = poolsSlice.actions;

export default poolsSlice.reducer;
