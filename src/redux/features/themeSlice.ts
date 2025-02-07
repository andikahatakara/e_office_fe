import { createSlice } from "@reduxjs/toolkit";
type ThemeSlice = {
  isDark: boolean;
  isOpenSidebar: boolean;
};

const initialState: ThemeSlice = {
  isDark: false,
  isOpenSidebar: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setThemeDark: (state) => {
      const isDark = state.isDark;
      state.isDark = !isDark;
    },
    setToggleSidebar: (state) => {
      const toggle = state.isOpenSidebar;
      state.isOpenSidebar = !toggle;
    },
  },
});

export const { setThemeDark, setToggleSidebar } = themeSlice.actions;
export default themeSlice.reducer;
