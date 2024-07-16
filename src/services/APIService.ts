
import {Movie} from "../models/Movie.ts"
import {formatMovie} from "../utils/transformers.ts"


export class Services{

    async getMovies({ filters: { page= 1 }} :{ filters: { page?: number } }): Promise<{ metaData: { pagination: { currentPage: number, totalPages: number } }, movies: Movie[] }> {

        try {
          const response = await fetch(`https://api.themoviedb.org/3/discover/movie?page=${page}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${import.meta.env.VITE_TOKEN_API}`
            }
          });
          console.log(response)
          if (!response.ok) {
            throw new Error('Failed to fetch movies');
          }
          const data = await response.json();

          const movies = data.results.map((movie: any) => formatMovie(movie));
          const metaData= {
            pagination: {
              currentPage: data.page,
              totalPages: data.total_pages
            }
          };
    
          return { metaData, movies };
        } catch (error) {

          throw error; 
        }
      }
}