import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchShowDetails } from './ShowDetailsSlice';
import { RootState, AppDispatch } from '../../app/store';

const ShowDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch: AppDispatch = useDispatch();

    const show = useSelector((state: RootState) => state.showDetails.show);
    const isLoading = useSelector((state: RootState) => state.showDetails.isLoading);
    const isError = useSelector((state: RootState) => state.showDetails.isError);

    useEffect(() => {
        if (id) {
            dispatch(fetchShowDetails(id));
        }
    }, [dispatch, id]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError || !show) {
        return <div>Error loading show details</div>;
    }

    return (
        <div className="container mt-4">
            <h1>{show.name}</h1>
            <p>{show.summary}</p>
            <img src={show.image?.medium} alt={show.name} />
        </div>
    );
};

export default ShowDetails;
