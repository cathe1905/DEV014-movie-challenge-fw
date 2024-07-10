import MovieList from "./MovieList";
import React, { useEffect, useState } from 'react';
import { Services } from "../services/APIService";
import { Movie } from '../models/Movie';
import CarouselFadeExample from "./carousel";
import Navbar from "./nav";
import { Spinner } from "react-bootstrap";

const Home: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]); 
    const services = new Services();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 2000)); 
                const fetchedMovies = await services.getMovies();
                setMovies(fetchedMovies); 
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                setError(true)
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies(); 
    }, []); 

    return (
        <div>
            <Navbar />
            <div>
                <CarouselFadeExample />
            </div>
            <div className="container-lg my-2">
                <div>
                    {isLoading ? (
                        <div className="spinner-container">
                            <Spinner animation="grow" variant="primary" className="large-spinner" />
                        </div>
                    ) : error ? (
                        <div className="spinner-container">
                            <p className="spectral-extrabold fs-3">Something went wrong while fetching movies.</p>
                        </div>
                    ) : (
                        <MovieList movie={movies} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;
