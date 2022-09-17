import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { adminAddresses } from "../../constants/addressess";
import { RootState } from "../store";

export interface SettingsState {
  isAdmin: boolean;
  userAddress: string;
}

const initialState: SettingsState = {
  isAdmin: false,
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
        state.isAdmin = false;
      }
    },
  },
});

export const selectUserAddress = (state: RootState) =>
  state.settings.userAddress;
export const selectIsAdmin = (state: RootState) => state.settings.isAdmin;

// Action creators are generated for each case reducer function
export const { setAddress } = settingsSlice.actions;

export default settingsSlice.reducer;
