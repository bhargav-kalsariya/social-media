import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { axiosClient } from '../../utils/axiosClient';

export const getMyInfo = createAsyncThunk('user/getMyInfo', async (body, thunkAPI) => {

    try {

        thunkAPI.dispatch(setLoading(true));
        const response = await axiosClient.get('/user/getMyInfo')
        console.log(response);
        return response.result

    } catch (error) {

        return Promise.reject(error);

    } finally {

        thunkAPI.dispatch(setLoading(false));

    }

})

const appConfigSlice = createSlice({

    name: 'appConfigSlice',
    initialState: {
        isLoading: false,
        myProfile: {}
    },
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getMyInfo.fulfilled, (state, action) => {
            state.myProfile = action.payload.user;
        })
    }

});

export default appConfigSlice.reducer;

export const { setLoading } = appConfigSlice.actions;