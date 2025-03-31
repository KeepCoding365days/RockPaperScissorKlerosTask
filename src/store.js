import { configureStore } from "@reduxjs/toolkit";
import { accountAddressSlice } from "./features/accountAddressSice";

export default configureStore({
  reducer: {
    accountAddress: accountAddressSlice.reducer,
  },
});
