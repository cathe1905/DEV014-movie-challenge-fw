import React from 'react';
import { Movie } from '../models/Movie.ts';

interface MovieCardProps {
    movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    const { title, poster_path, year } = movie;

    return (
        <div className='text-center'>
            <img className='custom-img' src={poster_path} alt="Poster" />
            <p>{title}, {year}</p>
        </div>
    );
};

export default MovieCard;
