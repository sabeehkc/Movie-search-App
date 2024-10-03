import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import MovieCard from './components/MovieCard';

const App = () => {
  const [allMovieData, setAllMovieData] = useState([]);
  const [searchMovie, setSearchMovie] = useState('');
  const [loading, setLoading] = useState(false);

 
  const fetchMovieData = async (query) => {
    try {
      setLoading(true);
      const res = await fetch(`https://omdbapi.com/?s=${query}&apikey=a1de9591`);
      const data = await res.json();
      setAllMovieData(data.Search || []);  
      console.log(data.Search);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

 
  useEffect(() => {
    const defaultMovie = 'Batman'; 
    fetchMovieData(defaultMovie);
  }, []); 

  return (
    <div>
      <Navbar />
      <div className="bg">
        <SearchBar searchMovie={searchMovie} setSearchMovie={setSearchMovie} fetchMovieData={() => fetchMovieData(searchMovie)} />
        <MovieCard allMovieData={allMovieData} loading={loading} />
      </div>
    </div>
  );
};

export default App;
