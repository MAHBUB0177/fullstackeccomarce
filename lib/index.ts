// authUtils.ts
// import { RootState } from "@/store";
// import { store } from "@/store"; // Ensure you export your store properly

// export const getAuthData = (): AuthDataType | null => {
//   const state = store.getState() as RootState;
//   return state.auth.authData || null;
// };


// src/utils/getAuthData.ts
import { AuthDataType } from "@/components/common/commonList"; // Ensure the correct import path
import { store } from "@/store"; // Ensure store is correctly imported
import { RootState } from "@/store"; // Ensure RootState is correctly imported

export const getAuthData = (): AuthDataType | null => {
  const state = store.getState() as RootState;
  console.log(state,'state===============')
  return state.auth.authData || null;
};
