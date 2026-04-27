import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: [],
  reducers: {
    addFavorite: (state, action) => {
      if (!state.find((p) => p.code === action.payload.code)) {
        state.push(action.payload);
      }
    },
    removeFavorite: (state, action) =>
      state.filter((p) => p.code !== action.payload),
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
