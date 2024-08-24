import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    authData: {},
    authUser:{}

  };
  
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      setAuth: (state, action) => {
        state.authData = action.payload
      },
      setAuthUser: (state, action) => {
        state.authUser = action.payload
      },
    }
  })

export const {setAuth,setAuthUser} = authSlice.actions


export default authSlice.reducer;

