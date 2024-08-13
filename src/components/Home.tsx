import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import Navbar from "./nav";
import CarouselFadeExample from "./carousel";
import MovieList from "./MovieList";
import PaginationComponent from "./Pagination"; 
import { Services } from "../services/APIService";
import { Movie } from '../models/Movie';
import { useSearchParams } from 'react-router-dom';
import ListOptions from './ListOptions';
import {getMovieGenres} from '../services/movieService';
import {formatGenresToMap, formatGenresToOptions} from '../utils/transformers'
import SearchForm from './SearchForm';


const Home: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [genreMap, setGenreMap] = useState<Map<number, string>>(new Map());
    const [genreOptions, setGenreOptions] = useState<{ value: string; label: string }[]>([]);
    const sortOptions= [{value: 'popularity.asc', label:'Popularity - Asc.'}, {value: 'popularity.desc', label:'Popularity - Desc.'}]
    const services = new Services();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [params, setParams] = useSearchParams()
    const page = parseInt(params.get('page') || '1');
    const genreP= params.get('genre');
    const sortP= params.get('sort_by');
    const [selectedGenre, setSelectedGenre] = useState<{ value: string; label: string } | null>(null);
    const [selectedSort, setSelectedSort] = useState<{ value: string; label: string } | null> (null);
    const [selectedSearch, setSelectedSearch] = useState<string | null> (null);


    useEffect(() => {
        const fetchMovies = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));

                const genresArray = await getMovieGenres();
                const genresMap = formatGenresToMap(genresArray);
                setGenreMap(genresMap);

                const genreOptions = formatGenresToOptions(genresArray);
                setGenreOptions(genreOptions);

                const { movies} = await services.getMovies({ filters: { page } }, genreMap, genreId, sortValue, searchValue);
                setMovies(movies);
                setTotalPages(500);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                setError(true);
                console.error('Error fetching movies:', error);
            }
        };

        const genreId = genreP ? parseInt(genreP) : selectedGenre ? parseInt(selectedGenre.value) : null;
        const sortValue= sortP ? sortP :   selectedSort ? selectedSort.value : null;
        const searchValue= selectedSearch ? selectedSearch: null;
        fetchMovies();
    }, [params, selectedGenre, selectedSort, selectedSearch]);

    const handelSelectPage = (page: number) => {
        const genre = selectedGenre ? selectedGenre.value : '';
        const sortBy = selectedSort ? selectedSort.value : '';
        setParams({ genre, sort_by: sortBy, page: page.toString() });
    };

    const handleOnChange = (option: { value: string; label: string }, type: string) => {
        if (type === 'genre') {
            setSelectedGenre(option);
            const sortBy = selectedSort ? selectedSort.value : '';
            setParams({ genre: option.value, sort_by: sortBy, page: '1' });
        } else if (type === 'sort') {
            setSelectedSort(option);
            const genre = selectedGenre ? selectedGenre.value : '';
            setParams({ genre, sort_by: option.value, page: '1' });
        }
    };

    const handleOnClear = (type: string) => {
        if (type === 'genre') {
            setSelectedGenre(null);
        } else if (type === 'sort') {
            setSelectedSort(null);
        } else if(type === 'search'){
            setSelectedSearch(null);
        }
        setParams({ page: page.toString() })
    };

    const handleSearchSubmit = (term: string) => {
        setSelectedSearch(term);
      };

    return (
        <div className='home mt-0 mb-0'>
            <Navbar />
            <div>
                <CarouselFadeExample />
                <div className="container-lg my-4 my-md-5 px-md-5">
                    <div className="row justify-content-center justify-content-md-center ">
                        <div className="col-6 col-md-3 mb-3 align-items-md-center d-md-flex">
                            <ListOptions 
                                options={genreOptions}
                                selectedOption={selectedGenre}
                                onChange={(option) => handleOnChange(option, 'genre')}
                                onClear={() => handleOnClear('genre')} 
                                tipo="genre"            
                            />
                        </div>
                        <div className="col-6 col-md-3 mb-3 align-items-md-center d-md-flex">
                            <ListOptions
                                options={sortOptions}
                                selectedOption={selectedSort}
                                onChange={(option) => handleOnChange(option, 'sort')}
                                onClear={() => handleOnClear('sort')} 
                                tipo="sort"              
                            />
                        </div>
                        <div className="col-12 col-md-6 mb-3 justify-content-md-center">
                            <SearchForm 
                                onSearchSubmit={handleSearchSubmit}
                                onClear={() => handleOnClear('search')} 
                            />
                        </div>
                    </div>
                </div>

        
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
