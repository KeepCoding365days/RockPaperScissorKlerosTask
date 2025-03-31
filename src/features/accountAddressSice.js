import { createSlice } from "@reduxjs/toolkit";

export const accountAddressSlice = createSlice({
  name: "accountAddress",
  initialState: {
    value: "",
  },
  reducers: {
    update: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { update } = accountAddressSlice.actions;

export default accountAddressSlice.reducer;
