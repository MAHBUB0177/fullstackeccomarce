import { createSlice } from '@reduxjs/toolkit'

// const initialState = {
//     confirmOrderInfo: {},
//   };

interface OrderState {
  selectedOrder: {
    value: number;
    order: any | null;
  };
}
const initialState = {
  confirmOrderInfo: { value: 1, order: null },
};

const confrimOrderSlice = createSlice({
    name: 'Orderinfo',
    initialState,
    reducers: {
      // setconfirmOrderInfo: (state, action) => {
      //   state.confirmOrderInfo = action.payload
      // },
      setconfirmOrderInfo:(state, action)=> {
        state.confirmOrderInfo = action.payload;
      },
    }
  })

export const {setconfirmOrderInfo} = confrimOrderSlice.actions


export default confrimOrderSlice.reducer;

