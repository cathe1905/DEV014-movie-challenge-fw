import {useEffect } from "react"
import { useState } from "react";
import { getMovieDetail } from "../services/movieService"
import { getMovieGenres } from "../services/movieService";
import { formatGenresToMap } from "../utils/transformers";
import { Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Navbar from "./nav";
import '../styles/navBar.css'; 


const MovieDetail: React.FC = () => {
    const [genreMap, setGenreMap] = useState<Map<number, string>>(new Map());
    const [movie, setMovie] = useState<any>(null); 
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const { id } = useParams<{ id: string }>();
    const id_number= Number(id)

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const genresArray = await getMovieGenres();
                const genresMap = formatGenresToMap(genresArray);
                setGenreMap(genresMap);

                const movieDetail = await getMovieDetail(id_number, genreMap);
                setMovie(movieDetail);
                setIsLoading(false);

                
            } catch (error) {
                console.error('Error fetching movie detail:', error);
                setIsLoading(false);
                setError(true);
            }
        };

        fetchMovie();
    }, [id,genreMap ]); 
    return (
        <>
        
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
            {!isLoading && !error &&  movie &&(
                <div className="background-container" style={{ 
                    background: `linear-gradient(rgba(5,7,12,0.75), rgba(5,7,12,0.75)), url(https://image.tmdb.org/t/p/w500${movie.background})`,
                     backgroundSize: 'cover',
                    backgroundPosition: 'center center'
                    }}>
                    <Navbar></Navbar>
                    <div className="container-lg my-4 my-md-4 px-md-5">
                        <h1 className="display-3 fw-bold my-5 my-md-4">{movie.title}</h1>
                        <aside className="d-flex flex-column justify-content-start mb-3 md-row group-p">
                            <p className="my-0">{movie.duration} minutes</p>
                            
                            <aside className="d-flex flex-row justify-content-start my-0">
                                {movie.genres.map((genre: string, index: number) => (
                                    <p key={index} className="mx-1 my-0">-{genre}</p>
                                ))}
                            </aside>
                            
                            <p className="my-0">{movie.year}</p>
                        </aside>
                        <p className="mb-5 w-parrafo">{movie.description}</p>
                        <button className="button-play">Play Movie</button>
                        
                        
                    </div>
                </div>
            ) }
        </>
    );
};

export default MovieDetail;