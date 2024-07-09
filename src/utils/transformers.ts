import {Movie} from "../models/Movie.ts"

export function formatMovie(obj: any): Movie{

  const name = obj.title || "";
  const img = obj.poster_path || "";
  
  let year;
  try {
    const date = new Date(obj.release_date);
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date");
    }
    year = date.getFullYear();
  } catch (error) {
    year = NaN; 
  }

  const movie: Movie = {
    title: name,
    poster_path: `https://image.tmdb.org/t/p/original${img}`,
    year: year,
  };

  return movie;
}