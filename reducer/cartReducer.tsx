import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface Product {
  _id: string;
  productName: string;
  price: number;
  oldprice: number;
  featured: boolean;
  image: string[]; // Array of image URLs
  rating: number;
  createdAt: string; // ISO date string
  brand: string;
  category: string;
  description: string;
  color: string;
  __v: number;
  qnty: number; // Optional quantity, since it's not part of the original object
}

// Define the type for the auth user


// Define the state type
interface CartState {
  addProducts: Product[];
}

// Initial state
const initialState: CartState = {
  addProducts: [],
};

const addtoCartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Action to add products to the cart
    setAddProducts: (state, action: PayloadAction<Product>) => {
      console.log(action.payload?._id, 'Product ID in reducer');

      const itemIndex = state.addProducts.findIndex(
        (item) => item?._id === action.payload?._id
      );

      if (itemIndex >= 0) {
        // If the product is already in the cart, increment the quantity
        state.addProducts[itemIndex].qnty += 1;
      } else {
        // If the product is not in the cart, add it with a quantity of 1
        const temp = { ...action.payload, qnty: 1 };
        state.addProducts.push(temp);
      }
    },

    setRemoveProduct: (state, action: PayloadAction<Product>) => {
      // Filter out the product to remove
      state.addProducts = state.addProducts.filter(
        (item) => item._id !== action.payload._id
      );
    },

   
  },
});

export const { setAddProducts,setRemoveProduct } = addtoCartSlice.actions;

export default addtoCartSlice.reducer;
