import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authorizedAxiosInstance from "~/utils/authorizedAxios";
import { API_ROOT } from "~/utils/constants";
import { mapOrder } from "~/utils/sort";
import { isEmpty } from "lodash";
import { generatePlaceholderCard } from "~/utils/formatters";

const initialState = {
  currentActiveBoard: null,
};

export const fetchBoardDetailsAPI = createAsyncThunk(
  "activeBoard/fetchBoardDetailsAPI",
  async (boardId, { rejectWithValue }) => {
    try {
      const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/boards/${boardId}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const activeBoardSlice = createSlice({
  name: "activeBoard",
  initialState,

  reducers: {
    updateCurrentActiveBoard: (state, action) => {
      const board = action.payload;
      state.currentActiveBoard = board;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchBoardDetailsAPI.fulfilled, (state, action) => {
      let board = action.payload;

      board.columns = mapOrder(board?.columns, board?.columnOrderIds, "_id");
      board.columns.forEach((column) => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)];
          column.cardOrderIds = [generatePlaceholderCard(column).id];
        } else {
          column.cards = mapOrder(column?.cards, column?.cardOrderIds, "_id");
        }
      });

      state.currentActiveBoard = board;
    });
  },
});

export const { updateCurrentActiveBoard } = activeBoardSlice.actions;

export const selectCurrentActiveBoard = (state) => {
  return state.activeBoard.currentActiveBoard;
};

export const activeBoardReducer = activeBoardSlice.reducer;
