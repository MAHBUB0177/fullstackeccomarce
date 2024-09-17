import { createSlice } from "@reduxjs/toolkit";

interface SearchState {
  search: {};
  reloadState: boolean;
}

const initialState :SearchState = {
  search: {},
  reloadState: true

};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchData: (state, action) => {
      state.search = action.payload;
    },
    setReloadState: (state, action) => {
      console.log(action,'action')
      state.reloadState = action.payload;
    },
  },
});

export const { setSearchData,setReloadState } = searchSlice.actions;
export default searchSlice.reducer;
