import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentActiveCard: null,
};

export const activeCardSlice = createSlice({
  name: "activeCard",
  initialState,

  reducers: {
    updateCurrentActiveCard: (state, action) => {
      const card = action.payload;
      state.currentActiveCard = card;
    },
    clearCurrentActiveCard: (state) => {
      state.currentActiveCard = null;
    },
  },

  extraReducers: (builder) => {},
});

export const { updateCurrentActiveCard, clearCurrentActiveCard } = activeCardSlice.actions;

export const selectCurrentActiveCard = (state) => {
  return state.activeCard.currentActiveCard;
};

export const activeCardReducer = activeCardSlice.reducer;
