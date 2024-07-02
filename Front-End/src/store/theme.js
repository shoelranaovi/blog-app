import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light",
};

export const theme = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state) => {
      state.theme = state.theme === "dark" ? "light" : "dark";
    },
  },
});
export const { setTheme } = theme.actions;

export default theme.reducer;
