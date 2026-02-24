import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import poolsReducer from "./slices/pools";
import settingsReducer from "./slices/settings";
import tokensReducer from "./slices/tokens";
import transactionsReducer from "./slices/transactions";
import gameReducer from "./slices/game";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    settings: settingsReducer,
    transactions: transactionsReducer,
    pools: poolsReducer,
    tokens: tokensReducer,
    game: gameReducer,
  },
  devTools: false,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
