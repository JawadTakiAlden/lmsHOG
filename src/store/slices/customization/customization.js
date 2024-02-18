import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  id: "default",
  opened: false,
  direction : 'ltr'
};
const customizationSlice = createSlice({
  name: "customization",
  initialState,
  reducers: {
    SET_MENU_ITEM: (state, action) => {
      state.id = action.payload;
    },
    TOGGLE_COLAPSED: (state) => {
      state.opened = !state.opened;
    },
    SET_DIRECTION : (state , action) => {
      state.direction = action.payload
    }
  },
});

export default customizationSlice;

export const { SET_MENU_ITEM, TOGGLE_COLAPSED , SET_DIRECTION } = customizationSlice.actions;
