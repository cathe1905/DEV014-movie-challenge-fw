import { token } from "./token";
import { Movie } from "../models/Movie";
import {formatMovie} from "../utils/transformers.ts"

export const getMovieGenres = async (): Promise<{ id: number; name: string }[]> => {
    try {
        const response= await fetch('https://api.themoviedb.org/3/genre/movie/list?', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
            
        })
        if (!response.ok) {
            throw new Error('Failed to fetch movies');
          }
          const data = await response.json();

          if (Array.isArray(data.genres)) {
              return data.genres;
          } else {
              throw new Error('Unexpected response format');
          }

    } catch (error) {
        throw error
    }
    
}
type GenreMap = Map<number, string>;
export const getMovieDetail = async (movie_id: number, genremap: GenreMap): Promise<Movie> => {
    try {
        const url= `https://api.themoviedb.org/3/movie/${movie_id}`

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        if(!response.ok){
            throw new Error('Failed to fetch movies');
        }
        const data = await response.json();
        data.genre_ids = data.genres.map((el: {id: number, name: string}) => el.id);

        const movie= formatMovie(data, genremap)
        console.log(movie)
        return movie
    } catch(error){
        throw error
    }
}