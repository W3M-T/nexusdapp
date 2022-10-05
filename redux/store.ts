import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../shared/slices/counterSlice";
import poolsReducer from "../shared/slices/pools";
import settingsReducer from "../shared/slices/settings";
import tokensReducer from "../shared/slices/tokens";
import transactionsReducer from "../shared/slices/transactions";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    settings: settingsReducer,
    transactions: transactionsReducer,
    pools: poolsReducer,
    tokens: tokensReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
