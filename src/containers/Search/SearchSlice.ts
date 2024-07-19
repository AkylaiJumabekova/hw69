import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { TVShow } from '../../types';
import { RootState } from '../../app/store';

interface SearchState {
    results: TVShow[];
    query: string;
    isLoading: boolean;
    isError: boolean;
}

const initialState: SearchState = {
    results: [],
    query: '',
    isLoading: false,
    isError: false,
};

export const searchTVShows = createAsyncThunk<TVShow[], void, { state: RootState }>(
    'search/fetchShows',
    async (_, thunkAPI) => {
        const query = thunkAPI.getState().search.query;
        const response = await axiosApi.get<{ show: TVShow }[]>(`http://api.tvmaze.com/search/shows?q=${query}`);
        return response.data.map((item) => item.show);
    }
);

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setQuery: (state, action) => {
            state.query = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchTVShows.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(searchTVShows.fulfilled, (state, action) => {
                state.isLoading = false;
                state.results = action.payload;
            })
            .addCase(searchTVShows.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });
    },
});

export const { setQuery } = searchSlice.actions;
export const SearchReducer = searchSlice.reducer;
