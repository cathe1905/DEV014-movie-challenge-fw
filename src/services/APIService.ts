import {Movie} from "../models/Movie.ts"
import {formatMovie} from "../utils/transformers.ts"
import { token } from "./token.ts";

type GenreMap = Map<number, string>;
export class Services{

    async getMovies({ filters: { page= 1 }} :{ filters: { page?: number } }, genremap:GenreMap, genreId: number | null, sortBy: string | null, term: string | null ): Promise<{ metaData: { pagination: { currentPage: number, totalPages: number } }, movies: Movie[] }> {
      console.log(genremap, genreId, sortBy, term)
        try {
          let type=''

          if(term !== null){
            type= 'search'
          } else{
            type= 'discover'
          }

          let url= `https://api.themoviedb.org/3/${type}/movie?query=${term}`


          if (genreId !== null && genreId !== 0) {
            url += `&with_genres=${genreId}`
          }
          if(sortBy !== null && sortBy !== ''){
            url += `&sort_by=${sortBy}`
          }
          url+= `&page=${page}`

          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
        
          if (!response.ok) {
            throw new Error('Failed to fetch movies');
          }
          const data = await response.json();

         const movies = data.results.map((movie: any) => formatMovie(movie, genremap));
          const metaData= {
            pagination: {
              currentPage: data.page,
              totalPages: data.total_pages
            }
          };
          console.log(movies)
          return { metaData, movies };
        } catch (error) {

          throw error; 
        }
      }
}