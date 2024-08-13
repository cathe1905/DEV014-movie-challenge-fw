import React from 'react';
import { Movie } from '../models/Movie.ts';
import { useNavigate } from 'react-router-dom';

interface MovieCardProps {
    movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    const { poster_path, id_movie} = movie;
     const defaultImage= 'public/images.png'
     const navigator= useNavigate()

     const handleClick = (id: number) => {
        navigator(`/movie/${id}`);
      };

    return (
        <a onClick={() => handleClick(id_movie)} className='d-flex justify-content-center'>
           <img className='custom-img ' src={poster_path} alt="Poster" onError={(e) => {
          e.currentTarget.src = defaultImage;}}/>
        </a>

    );
};

export default MovieCard;
