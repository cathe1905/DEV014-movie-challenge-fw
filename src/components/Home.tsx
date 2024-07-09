import MovieList from "./MovieList";
import React, { useEffect, useState } from 'react';
import { Services } from "../services/APIService";
import { Movie } from '../models/Movie';
import CarouselFadeExample from "./carousel";
import Navbar from "./nav";

const Home: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]); // Estado para almacenar las películas
    const services = new Services();

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const fetchedMovies = await services.getMovies();
                setMovies(fetchedMovies); // Actualiza el estado con las películas obtenidas
            } catch (error) {
                console.log(error);
            }
        };

        fetchMovies(); // Llama a la función asíncrona para obtener las películas
    }, []); // [] asegura que se ejecute solo una vez al montar el componente
  
    return (
        <div>
            < Navbar />
            <div>
                <CarouselFadeExample />
            </div>
            <div className="container-lg my-2">

                <div className="d-flex justify-content-center ">
                    < MovieList movie= {movies}/>
                </div>

            </div>
        </div>

    )
    
}

export default Home;