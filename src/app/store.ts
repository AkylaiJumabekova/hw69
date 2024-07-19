import { configureStore } from '@reduxjs/toolkit';
import { searchReducer } from '../containers/Search/SearchSlice';
import { showDetailsReducer } from '../containers/ShowDetails/ShowDetailsSlice';

export const store = configureStore({
    reducer: {
        search: searchReducer,
        showDetails: showDetailsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
