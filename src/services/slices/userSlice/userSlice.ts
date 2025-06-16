import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../../utils/cookie';

type TInitialState = {
  isAuthChecked: boolean;
  error: string | null;
  user: TUser | null;
};

const initialState: TInitialState = {
  user: null,
  isAuthChecked: false,
  error: null
};

export const checkUser = createAsyncThunk('user/check', () =>
  getUserApi().then((res) => {
    if (res.success) {
      return res.user;
    }
  })
);

export const registerUser = createAsyncThunk(
  'user/register',
  (data: TUser & { password: string }) => registerUserApi(data)
);

export const loginUser = createAsyncThunk('user/login', (data: TLoginData) =>
  loginUserApi(data).then((res) => {
    if (res.success) {
      setCookie('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      return res.user;
    }
  })
);

export const logOutUser = createAsyncThunk('user/logOut', () =>
  logoutApi().then((res) => {
    if (res.success) {
      deleteCookie('accessToken');
      localStorage.removeItem('refreshToken');
    }
  })
);

export const updateUser = createAsyncThunk(
  'user/update',
  (data: Partial<TRegisterData>) =>
    updateUserApi(data).then((res) => {
      if (res.success) {
        return res.user;
      }
    })
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkUser.pending, (state) => {
        state.isAuthChecked = false;
      })
      .addCase(checkUser.fulfilled, (state, { payload }) => {
        state.isAuthChecked = true;
        state.user = payload || null;
      })
      .addCase(checkUser.rejected, (state, { error }) => {
        state.isAuthChecked = true;
        state.error = error.message || 'Unknown error';
      })

      .addCase(registerUser.pending, (state) => {
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.user = payload.user;
      })
      .addCase(registerUser.rejected, (state, { error }) => {
        state.error = error.message || 'Unknown error';
      })

      .addCase(loginUser.pending, (state) => {
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.user = payload || null;
      })
      .addCase(loginUser.rejected, (state, { error }) => {
        state.error = error.message || 'Unknown error';
      })

      .addCase(logOutUser.pending, (state) => {
        state.error = null;
      })
      .addCase(logOutUser.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(logOutUser.rejected, (state, { error }) => {
        state.error = error.message || 'Unknown error';
      })

      .addCase(updateUser.pending, (state) => {
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.user = payload || null;
      })
      .addCase(updateUser.rejected, (state, { error }) => {
        state.error = error.message || 'Unknown error';
      });
  }
});

export default userSlice.reducer;
