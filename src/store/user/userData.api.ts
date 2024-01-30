import { createSlice } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';

export interface UserType {
  user: Nullable<User>;
  token: Nullable<string>;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: Nullable<string>;
}

const initialState: UserType = {
  user: null,
  token: null,
  isLoggedIn: false,
  isLoading: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUserRequest: state => {
      state.isLoading = true;
      state.error = null;
    },
    fetchUserSuccess: (state, action) => {
      state.user = action.payload;
      state.token = action.payload.uid;
      state.isLoading = false;
    },
    fetchUserFailure: (state, action) => {
      state.error = action.payload;
      state.isLoggedIn = false;
      state.isLoading = false;
    },
    setUserIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    clearUserData: state => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const {
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailure,
  setUserIsLoggedIn,
  clearUserData,
} = userSlice.actions;
export default userSlice.reducer;
