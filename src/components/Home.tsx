import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import Navbar from "./nav";
import CarouselFadeExample from "./carousel";
import MovieList from "./MovieList";
import PaginationComponent from "./Pagination"; 
import { Services } from "../services/APIService";
import { Movie } from '../models/Movie';
import { useSearchParams } from 'react-router-dom';
import SelectComponent from './Select';

const Home: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const services = new Services();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [params, setParams] = useSearchParams()
    const page = parseInt(params.get('page') || '1', 10);

    useEffect(() => {
        const fetchMovies = async (page: number = 1) => {
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));
                const { movies, metaData } = await services.getMovies({ filters: { page } });
                setMovies(movies);
                setTotalPages(metaData.pagination.totalPages - 2);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                setError(true);
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies(page);
    }, [params]);

    const handelSelectPage = (page: number) => {
        setParams({ page: page.toString() })
    };

    return (
        <div>
            <Navbar />
            <div>
                <CarouselFadeExample />
                < SelectComponent/>
            </div>
            <div className="container-lg my-2">
                <div>
                    {isLoading && (
                        <div className="spinner-container">
                            <Spinner animation="grow" variant="primary" className="large-spinner" />
                        </div>
                    )}
                    {error && (
                        <div className="spinner-container">
                            <p className="spectral-extrabold fs-3">Something went wrong while fetching movies.</p>
                        </div>
                    )}
                    {!isLoading && !error && (
                        <MovieList movie={movies} />
                    )}
                </div>
            </div>
            <div>
                {!isLoading && !error && (
                    <PaginationComponent
                        currentPage={page}
                        totalPages={totalPages}
                        onSelectPage={handelSelectPage}
                    />
                )}
            </div>
        </div>
    );
};

export default Home;
