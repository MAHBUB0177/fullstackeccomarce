import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    confirmOrderInfo: {},
  };
  
const confrimOrderSlice = createSlice({
    name: 'Orderinfo',
    initialState,
    reducers: {
      setconfirmOrderInfo: (state, action) => {
        state.confirmOrderInfo = action.payload
      },
      
    }
  })

export const {setconfirmOrderInfo} = confrimOrderSlice.actions


export default confrimOrderSlice.reducer;

