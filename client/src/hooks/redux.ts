import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/store';

// Use throughout your TYPED instead of plain `useDispatch` and `useSelector`
type DispatchFunc = () => AppDispatch;
export const useTDispatch: DispatchFunc = useDispatch;
export const useTSelector: TypedUseSelectorHook<RootState> = useSelector;