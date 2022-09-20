import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../redux/slices/counterSlice";
import poolsReducer from "../redux/slices/pools";
import settingsReducer from "../redux/slices/settings";
import transactionsReducer from "../redux/slices/transactions";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    settings: settingsReducer,
    transactions: transactionsReducer,
    pools: poolsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
