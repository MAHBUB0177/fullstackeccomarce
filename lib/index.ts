// authUtils.ts
import { RootState } from "@/store";
import { store } from "@/store"; // Ensure you export your store properly

export const getAuthData = (): AuthDataType | null => {
  const state = store.getState() as RootState;
  return state.auth.authData || null;
};
