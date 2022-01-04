import React, { useState } from 'react';
import { useQuery, useLazyQuery, gql } from '@apollo/client';

function DisplayMovies() {

  const getMovies = gql`
    query getMovies {
      movies {
        id
        name
        yearOfPublication
        isInTheaters
      }
    }
  `;
  const { loading, error, data } = useQuery(getMovies);

  const [movieSearched, setMovieSearched] = useState('');

  const getMovieByName = gql`
    query Movie($name: String!) {
      movie(name: $name) {
        id
        name
        isInTheaters
        yearOfPublication
      }
    }
  `;

  const [ fetchMovie, { data: movieData } ] = useLazyQuery(getMovieByName);
  

  console.log(movieData, movieSearched)

  if(loading) {
    return (<p>Loading ...</p>);
  }

  if(error) {
    return (<p>{error}</p>);
  }

  return (
    <div>
      <input type="text" placeholder='search movies by name' onChange={(event) => setMovieSearched(event.target.value)}/>
      <span>{' '}</span>
      <button
        onClick={() => fetchMovie({variables: { "name": movieSearched }}) }
      >
        Fetch Movie
      </button>
      {
        movieData && (
          <div>
          <p>{movieData.movie.name}</p>
          <p>{movieData.movie.yearOfPublication}</p>
          <p>is In Theaters : {movieData.movie.isInTheaters}</p>
          </div>
        )
      }
      { !movieData && data && data.movies.map(movie => (
        <div key={movie.id}>
          <p>{movie.name}</p>
          <p>{movie.yearOfPublication}</p>
          <p>is In Theaters : {movie.isInTheaters}</p>
          <br/>
          <hr/>
          <br/>
        </div>
      )) }
    </div>
  )
}

export default DisplayMovies
