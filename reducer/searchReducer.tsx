import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: '',

};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchData: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setSearchData } = searchSlice.actions;
export default searchSlice.reducer;
