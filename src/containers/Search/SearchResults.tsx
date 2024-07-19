import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { TVShow } from '../../types';
import { RootState, AppDispatch } from '../../app/store';
import { searchTVShows, setQuery } from './SearchSlice';

const SearchResults: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const searchResults = useSelector((state: RootState) => state.search.results);
    const isLoading = useSelector((state: RootState) => state.search.isLoading);
    const query = useSelector((state: RootState) => state.search.query);

    useEffect(() => {
        if (query) {
            dispatch(searchTVShows());
        }
    }, [query, dispatch]);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        await dispatch(searchTVShows());
    };

    const handleShowClick = async (show: TVShow) => {
        navigate(`/shows/${show.id}`);
    };

    return (
        <div className="container mt-4">
            <h1>Search for TV Shows</h1>
            <form onSubmit={handleSearch}>
                <div className="mb-3">
                    <label htmlFor="search" className="form-label">Search for TV Show:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="search"
                        value={query}
                        onChange={(e) => dispatch(setQuery(e.target.value))}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Search</button>
            </form>
            {isLoading && <p>Loading...</p>}
            <div className="mt-4">
                {searchResults.map((show) => (
                    <div key={show.id} className="list-group-item" onClick={() => handleShowClick(show)}>
                        {show.name}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchResults;
