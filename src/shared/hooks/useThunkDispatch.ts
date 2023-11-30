import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { RootState } from 'store/root-store';

/**
 * Custom hook for accessing the Redux store's dispatch function with Thunk support.
 *
 * This hook wraps the standard `useDispatch` hook from react-redux and provides
 * a typed version of `dispatch` which is compatible with Redux Thunk. It allows
 * for dispatching regular actions as well as thunks in a type-safe manner.
 *
 * @returns {ThunkDispatch<RootState, void, AnyAction>} A dispatch function
 *          with Redux Thunk support for asynchronous actions.
 */
export const useThunkDispatch = () => useDispatch<ThunkDispatch<RootState, void, AnyAction>>();
