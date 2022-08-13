import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {act} from 'react-test-renderer';
import type {RootState} from '../store';

// Define a type for the slice state
interface AuthStateProps {
  isLogin: boolean;
  userInfo: any;
}

// Define the initial state using that type
const initialState: AuthStateProps = {
  isLogin: false,
  userInfo: null,
};

export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setLogin: (state: AuthStateProps, action: any) => {
      // console.log('action', action);
      const {payload} = action;
      state.isLogin = true;
      state.userInfo = payload.data;
    },
    setLogout: (state: AuthStateProps) => {
      state.isLogin = false;
      state.userInfo = null;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
});

export const {setLogin, setLogout} = authSlice.actions;

export default authSlice.reducer;
