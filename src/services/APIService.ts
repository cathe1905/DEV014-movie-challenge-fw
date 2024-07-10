import {Movie} from "../models/Movie.ts"
import {formatMovie} from "../utils/transformers.ts"

export class Services{

    async getMovies(): Promise<Movie[]> {
      console.log(import.meta.env.VITE_TOKEN_API)
        try {
          const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TOKEN_API}`);
          if (!response.ok) {
            throw new Error('Failed to fetch movies');
          }
          const data = await response.json();

          const movies = data.results.map((movie: any) => formatMovie(movie));
          return movies;
        } catch (error) {
          console.error('Error fetching movies:');
          throw error; 
        }
      }
}