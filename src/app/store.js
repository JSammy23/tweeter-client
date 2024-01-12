import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import { tweetsApi, messagesApi } from '../api';



export const store = configureStore({
    reducer: {
        user: userReducer,
        [tweetsApi.reducerPath]: tweetsApi.reducer,
        [messagesApi.reducerPath]: messagesApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(tweetsApi.middleware)
            .concat(messagesApi.middleware),
});