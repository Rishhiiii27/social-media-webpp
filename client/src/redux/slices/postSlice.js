import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";


export const getUserProfile = createAsyncThunk(
    "user/getUserProfile",
    async (body) => {
        try {
            // const dispatch=useDispatch()
            // thunkAPI.dispatch(setLoading(true));
            const response = await axiosClient.post(
                "/user/getUserProfile",
                body
            );
            console.log('userProfile',response.result); 
            return response;
            
        } catch (error) {
            return Promise.reject(error);
        }
        // finally{
        //     thunkAPI.dispatch(setLoading(false));
        // }
    }
);

export const likeAndUnlikePost = createAsyncThunk(
    "post/likeAndUnlike",
    async (body) => {
        try {
            // thunkAPI.dispatch(setLoading(true));
            const response = await axiosClient.post("/posts/like", body);
            return response.result.post;
        } catch (error) {
            return Promise.reject(error);
        } 
        // finally{
        //      thunkAPI.dispatch(setLoading(false));
        // }
    }
);

const postsSlice = createSlice({
    name: "postsSlice",
    initialState: {
        userProfile: {},
    },
    extraReducers: (builder) => {
        builder.addCase(getUserProfile.fulfilled, (state, action) => {
                state.userProfile = action.payload;
            })
            .addCase(likeAndUnlikePost.fulfilled, (state, action) => {
                const post = action.payload;
                const index = state?.userProfile?.result?.posts?.findIndex(
                    (item) => item._id === post._id
                );
                console.log("postslice", index);
                if (index !== -1 && index!==undefined) {
                    state.userProfile.result.posts[index] = post;
                }
            });
    },
});

export default postsSlice.reducer;
