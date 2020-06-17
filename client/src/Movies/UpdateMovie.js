import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import axios from "axios";
import MovieCard from "./MovieCard";



const UpdateMovie = (props) => {
    
    
    const params = useParams();
    const initialForm = {id: `${params.id}`, title: '', director: '', metascore: '', stars: []}
    const [movie, setMovie] = useState(initialForm)
    const [formChange, setFormChange] = useState (initialForm)
    console.log(props)
    console.log(initialForm)
    console.log(params)
    console.log(movie.stars)

    const handleChanges = e => {
        const name = e.target.name
        const value = e.target.value

        setFormChange({
            ...formChange,
            [name]: value
        })
    }
    const updateStars = e => {
        const name = e.target.name
        const value = e.target.value
        setFormChange({
            ...formChange,
            [name]:[value]
        })
    }
    const MovieUpdate = e => {
        e.preventDefault()

        axios.put(`http://localhost:5000/api/movies/${params.id}`, formChange)
        .then(res => {
            console.log('Successfully updated the movie list')
            // useHistory.push('/movies')
            window.location.assign('/movies')
        })
        .catch(err => {
            console.log('something went wrong')
        })
    }

    const fetchMovie = (id) => {
        axios
          .get(`http://localhost:5000/api/movies/${id}`)
          .then((res) => setMovie(res.data))
          .catch((err) => console.log(err.response));
      };

      useEffect(() => {
        fetchMovie(params.id);
      }, []);

    return ( 
<div>
    <h2>{movie.title}</h2>
            <div className="movie-director">
                Director: <em>{movie.director}</em>
            </div>
            <div className="movie-metascore">
                Metascore: <strong>{movie.metascore}</strong>
            </div>
            <h3>Actors</h3>
            {movie.stars.map(star => (
                <div key={star} className="movie-star">
                    {star}
                </div>))}

         <form onSubmit={MovieUpdate}>
             <input
            name='title'
            placeholder='Title'
            value={formChange.title}
            onChange={handleChanges}
            />
             <input
            name='director'
            placeholder='Director'
            value={formChange.director}
            onChange={handleChanges}
            />
             <input
            name='metascore'
            placeholder='metascore'
            value={formChange.metascore}
            onChange={handleChanges}
            />
             <input
            name='stars'
            placeholder='stars'
            value={formChange.stars}
            onChange={updateStars}
            />
            <button type='submit'>Update</button>
        </form>
        </div>
   
    )
}
export default UpdateMovie