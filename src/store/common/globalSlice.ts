import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store/configureStore";

export interface GlobalState {
  isMenuCollapsed: boolean;
}

const initialState: GlobalState = {
  isMenuCollapsed: false,
};

export const counterSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    toggleMenuCollapsed: (state) => {
      state.isMenuCollapsed = !state.isMenuCollapsed;
    },
  },
});

export const { toggleMenuCollapsed } = counterSlice.actions;

export const selectIsMenuCollapsed = (state: RootState) =>
  state.global.isMenuCollapsed;

export default counterSlice.reducer;
