import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { ONLY_ADMIN } from "../../../config/constants";
import { adminAddresses } from "../../constants/addressess";
import { RootState } from "../store";

export interface SettingsState {
  isAdmin: boolean;
  isLogedIn: boolean;
  userAddress: string;
}

const initialState: SettingsState = {
  isAdmin: true,
  isLogedIn: true,
  userAddress: "",
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setAddress: (state, action: PayloadAction<string>) => {
      state.userAddress = action.payload;
      if (adminAddresses.includes(action.payload)) {
        state.isAdmin = true;
      } else {
        state.isAdmin = !ONLY_ADMIN;
      }
    },
    setIsLogedIn: (state, action: PayloadAction<boolean>) => {
      state.isLogedIn = action.payload;
    },
  },
});

export const selectUserAddress = (state: RootState) =>
  state.settings.userAddress;
export const selectIsAdmin = (state: RootState) => state.settings.isAdmin;
export const selectIsLogedIn = (state: RootState) => state.settings.isLogedIn;

// Action creators are generated for each case reducer function
export const { setAddress, setIsLogedIn } = settingsSlice.actions;

export default settingsSlice.reducer;
