import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const fetchBooks = createAsyncThunk("books/fetch", async () => {
  const res = await axios.get(API + "/books");
  return res.data;
});

const slice = createSlice({
  name: "books",
  initialState: { list: [] },
  extraReducers: builder => {
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  }
});

export default slice.reducer;