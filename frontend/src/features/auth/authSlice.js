import { createSlice } from "@reduxjs/toolkit";

const savedToken = localStorage.getItem("token");

let savedUser = null;

try {
  const userFromStorage = localStorage.getItem("user");

  if (
    userFromStorage &&
    userFromStorage !== "undefined"
  ) {
    savedUser = JSON.parse(userFromStorage);
  }
} catch (error) {
  console.error("Invalid user in localStorage");
  localStorage.removeItem("user");
}

const initialState = {
  user: savedUser,
  token: savedToken || null,
  isAuthenticated: !!savedToken,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },

    loginSuccess: (state, action) => {
      state.loading = false;

      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;

      localStorage.setItem(
        "token",
        action.payload.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(action.payload.user)
      );
    },

    loginFailure: (state) => {
      state.loading = false;

      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
} = authSlice.actions;

export default authSlice.reducer;