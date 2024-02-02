import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';
import { DocumentData } from 'firebase/firestore';

import { db } from '../../components/layout/signIn/config';
import { Fields } from '../../components/shared/formSignIn/types';
import { AppDispatch, RootState } from '../store';

import {
  checkDocsInDB,
  checkFieldInDocsInDB,
  setDocsInDB,
  signInWithPopupApi,
  signOutApi,
} from 'api/api';
import { Collections } from 'api/types';
import { handleError } from 'helpers/handleError';

export interface IInitialState {
  user: Nullable<User>;
  token: Nullable<string>;
  isLoggedIn: boolean;
  isLoading: boolean;
  isNameAvailable: boolean;
  error: Nullable<string | undefined>;
}

const initialState: IInitialState = {
  user: null,
  token: null,
  isLoggedIn: false,
  isLoading: false,
  isNameAvailable: true,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(checkDocs.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkDocs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = action.payload;
        state.error = null;
      })
      .addCase(checkDocs.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.error = action.payload;
      })
      .addCase(signInWithGoogle.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signInWithGoogle.fulfilled, (state, action) => {
        state.user = action.payload;
        state.token = action.payload.uid;
        state.isLoading = false;
        localStorage.setItem('uid', action.payload.uid);
      })
      .addCase(signInWithGoogle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(setDoc.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(setDoc.fulfilled, state => {
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(setDoc.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(checkFieldName.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkFieldName.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isNameAvailable = !action.payload;
      })
      .addCase(checkFieldName.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(signOut.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signOut.fulfilled, state => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.user = null;
        state.token = null;
        state.isNameAvailable = true;
        localStorage.removeItem('uid');
      })
      .addCase(signOut.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

const signInWithGoogle = createAsyncThunk<
  User,
  void,
  { state: RootState; dispatch?: AppDispatch; rejectValue: string }
>('user/signInWithGoogle', async (data, thunkApi) => {
  const { rejectWithValue } = thunkApi;

  try {
    const responseData = await signInWithPopupApi();

    return responseData;
  } catch (error) {
    const message = handleError(error as Error);

    return rejectWithValue(message);
  }
});

const checkDocs = createAsyncThunk<
  boolean,
  string,
  { state: RootState; dispatch?: AppDispatch; rejectValue: string }
>('user/checkDoc', async (token, thunkApi) => {
  const { rejectWithValue } = thunkApi;

  try {
    const userDoc = await checkDocsInDB({
      uid: token,
      collectionName: Collections.Users,
    });

    return !!userDoc?.name;
  } catch (error) {
    const message = handleError(error as Error);

    return rejectWithValue(message);
  }
});

const setDoc = createAsyncThunk<
  void,
  DocumentData,
  { state: RootState; dispatch?: AppDispatch; rejectValue: string }
>('user/setDoc', async (data, thunkApi) => {
  const { getState, rejectWithValue } = thunkApi;
  const { user } = getState();

  if (!user.token) return;

  try {
    await setDocsInDB({
      uid: user.token,
      database: db,
      collectionName: Collections.Users,
      data,
    });
  } catch (error) {
    const message = handleError(error as Error);

    return rejectWithValue(message);
  }
});

const checkFieldName = createAsyncThunk<
  boolean,
  string,
  { state: RootState; dispatch?: AppDispatch; rejectValue: string }
>('user/checkFields', async (data, thunkApi) => {
  const { rejectWithValue } = thunkApi;

  try {
    const isResponse = await checkFieldInDocsInDB({
      nickname: data,
      database: db,
      collectionName: Collections.Users,
      checkField: Fields.Name,
    });

    return isResponse;
  } catch (error) {
    const message = handleError(error as Error);

    return rejectWithValue(message);
  }
});

const signOut = createAsyncThunk<
  boolean,
  void,
  { state: RootState; dispatch?: AppDispatch; rejectValue: string }
>('user/signOut', async (data, thunkApi) => {
  const { rejectWithValue } = thunkApi;

  try {
    await signOutApi();

    return true;
  } catch (error) {
    const message = handleError(error as Error);

    return rejectWithValue(message);
  }
});

export const userThunk = {
  checkDocs,
  signInWithGoogle,
  setDoc,
  checkFieldName,
  signOut,
};

export default userSlice.reducer;
