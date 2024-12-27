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
  totalPrice:number;
}



interface CartState {
  addProducts: Product[];
  checkoutCart: Product[]; // Should be an array of products
}

// Initial state
const initialState: CartState = {
  addProducts: [],
  checkoutCart: [] // Initialize as an empty array
};

const addtoCartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {

    // Action to add products to the cart
    setAddProducts: (state, action: PayloadAction<Product>) => {
      const itemIndex = state.addProducts.findIndex(
        (item) => item?._id === action.payload?._id
      );
    
      if (itemIndex >= 0) {
        // If the product is already in the cart, increment the quantity
        state.addProducts[itemIndex].qnty += 1;
        // Recalculate the total price based on the updated quantity
        state.addProducts[itemIndex].totalPrice =
          state.addProducts[itemIndex].qnty * state.addProducts[itemIndex].price;
      } else {
        // If the product is not in the cart, add it with a quantity of 1 and calculate total price
        const temp = { 
          ...action.payload, 
          qnty: 1, 
          totalPrice: action.payload.price // Set initial total price
        };
        state.addProducts.push(temp);
      }
    },
    
    setRemoveProduct: (state, action: PayloadAction<Product>) => {
      // Filter out the product to remove
      state.addProducts = state.addProducts.filter(
        (item) => item._id !== action.payload._id
      );
    },

    //multiple array of object remove to cart
    setRemovemultipleProduct: (state, action: PayloadAction<Product[]>) => {
      // Filter out the products to remove
      const idsToRemove = action.payload.map(product => product._id); // Extract all the _id values to remove
    
      state.addProducts = state.addProducts.filter(
        (item) => !idsToRemove.includes(item._id) // Only keep items that are not in the idsToRemove array
      );
    },
    

    //decrement cart item
    setDicrementProduct:(state,action: PayloadAction<Product>)=>{
      const IteamIndex_dec = state.addProducts.findIndex(
        (iteam) => iteam._id === action.payload._id
      );
      if (state.addProducts[IteamIndex_dec].qnty > 1) {
        state.addProducts[IteamIndex_dec].qnty -= 1
        state.addProducts[IteamIndex_dec].totalPrice =
          state.addProducts[IteamIndex_dec].qnty * state.addProducts[IteamIndex_dec].price;
      }
    },


    //empty an cart
    setEmptyCart:(state)=>{
      state.addProducts=[]
    
    },
    // Action to set the checkout items
    setCheckoutItem: (state, action: PayloadAction<Product[]>) => {
      state.checkoutCart = action.payload;
    }
   
  },
});

export const { setAddProducts,setRemoveProduct,setDicrementProduct,setEmptyCart,setCheckoutItem,setRemovemultipleProduct } = addtoCartSlice.actions;

export default addtoCartSlice.reducer;
