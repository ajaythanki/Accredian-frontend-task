import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    id: "",
    email: "",
  },
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = { ...action.payload };
    },
    clearUser: (state) => {
      state.user = {
        id: "",
        email: "",
      };
      window.localStorage.removeItem("authUser");
    },
  },
});

export default userSlice.reducer;

export const { setUser, clearUser } = userSlice.actions;