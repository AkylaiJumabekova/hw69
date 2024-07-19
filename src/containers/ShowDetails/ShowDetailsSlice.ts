import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { TVShow } from '../../types';

interface ShowDetailsState {
    show: TVShow | null;
    isLoading: boolean;
    isError: boolean;
}

const initialState: ShowDetailsState = {
    show: null,
    isLoading: false,
    isError: false,
};

export const fetchShowDetails = createAsyncThunk<TVShow, string>(
    'showDetails/fetchShowDetails',
    async (showId) => {
        const response = await axiosApi.get<TVShow>(`/shows/${showId}`);
        return response.data;
    }
);

const showDetailsSlice = createSlice({
    name: 'showDetails',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchShowDetails.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchShowDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.show = action.payload;
            })
            .addCase(fetchShowDetails.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })
    },
});

export const showDetailsReducer = showDetailsSlice.reducer;
