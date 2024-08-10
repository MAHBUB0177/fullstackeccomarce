import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: {},
  // searchTerm: '',
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchData: (state, action) => {
      state.search = action.payload;
      // state.searchTerm = action.payload.searchTerm;
    },
  },
});

export const { setSearchData } = searchSlice.actions;
export default searchSlice.reducer;
