import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface SettingsState {
  isLogedIn: boolean;
  userAddress: string;
}

const initialState: SettingsState = {
  isLogedIn: true,
  userAddress: "",
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setAddress: (state, action: PayloadAction<string>) => {
      state.userAddress = action.payload;
    },
    setIsLogedIn: (state, action: PayloadAction<boolean>) => {
      state.isLogedIn = action.payload;
    },
  },
});

export const selectUserAddress = (state: RootState) =>
  state.settings.userAddress;
export const selectIsLogedIn = (state: RootState) => state.settings.isLogedIn;

// Action creators are generated for each case reducer function
export const { setAddress, setIsLogedIn } = settingsSlice.actions;

export default settingsSlice.reducer;
