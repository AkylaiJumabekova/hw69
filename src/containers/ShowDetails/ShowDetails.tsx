import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
        return <p>Loading...</p>;
    }

    if (isError) {
        return <p>Error loading show details</p>;
    }

    if (!show) {
        return <p>No show details available</p>;
    }

    const cleanSummary = show.summary ? show.summary.replace(/<\/?[^>]+(>|$)/g, "") : "";

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-4">
                    {show.image && <img src={show.image.medium} alt={show.name} className="img-fluid" />}
                </div>
                <div className="col-md-8">
                    <h1>{show.name}</h1>
                    <p className="mt-3">{cleanSummary}</p>
                </div>
            </div>
        </div>
    );
};

export default ShowDetails;
