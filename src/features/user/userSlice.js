import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.currentUser = action.payload;
        },
        clearUser: (state) => {
            state.currentUser = null;
        },
        updateUserLikes: (state, action) => {
            const { tweetId, isLiked } = action.payload;
            if (!isLiked) {
                state.currentUser.likes.push(tweetId);
            } else {
                state.currentUser.likes = state.currentUser.likes.filter(id => id !== tweetId);
            }
        },
    },
});

export const { setUser, clearUser, updateUserLikes } = userSlice.actions;
export default userSlice.reducer;