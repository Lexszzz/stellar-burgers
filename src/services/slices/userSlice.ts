import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setCookie, deleteCookie } from '../../utils/cookie';
import {
  loginUserApi,
  registerUserApi,
  getUserApi,
  updateUserApi,
  logoutApi
} from '../../utils/burger-api';

import { TUser } from '../../utils/types';

type TUserState = {
  user: TUser | null;
  isLoading: boolean;
  isAuthChecked: boolean;
  error: string | null;
};

const initialState: TUserState = {
  user: null,
  isLoading: false,
  isAuthChecked: false,
  error: null
};

export const loginUserThunk = createAsyncThunk('user/login', loginUserApi);

export const registerUserThunk = createAsyncThunk(
  'user/register',
  registerUserApi
);

export const getUserThunk = createAsyncThunk('user/getUser', getUserApi);

export const updateUserThunk = createAsyncThunk(
  'user/updateUser',
  updateUserApi
);

export const logoutUserThunk = createAsyncThunk('user/logout', async () => {
  await logoutApi();
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(loginUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;

        localStorage.setItem('refreshToken', action.payload.refreshToken);

        setCookie('accessToken', action.payload.accessToken);

        state.user = action.payload.user;
      })

      .addCase(loginUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка авторизации';
      })

      .addCase(registerUserThunk.fulfilled, (state, action) => {
        localStorage.setItem('refreshToken', action.payload.refreshToken);

        setCookie('accessToken', action.payload.accessToken);

        state.user = action.payload.user;
      })

      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })

      .addCase(logoutUserThunk.fulfilled, (state) => {
        localStorage.removeItem('refreshToken');
        deleteCookie('accessToken');

        state.user = null;
      })

      .addCase(getUserThunk.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })

      .addCase(getUserThunk.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthChecked = true;
      });
  }
});

export const userReducer = userSlice.reducer;
