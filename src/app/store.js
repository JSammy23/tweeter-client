import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import { tweetsApi } from '../api';


export const store = configureStore({
    reducer: {
        user: userReducer,
        [tweetsApi.reducerPath]: tweetsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(tweetsApi.middleware),
});