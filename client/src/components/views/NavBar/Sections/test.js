import React, { useReducer, useEffect } from "react";
import "../Sections/Navbar.css";
import axios from "axios";
import Movie from "./movie";
import Search from "../../MovieDetail/Sections/search";


const MOVIE_API_URL = "https://api.themoviedb.org/3/?s=man&apikey=b497c9753de195dadd7522a518933ea"; // you should replace this with yours
const initialState = {
  loading: true,
  movies: [],
  errorMessage: null
};
const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_MOVIES_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    case "SEARCH_MOVIES_SUCCESS":
      return {
        ...state,
        loading: false,
        movies: action.payload
      };
    case "SEARCH_MOVIES_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      };
    default:
      return state;
  }
};

const Test = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
    
        fetch(MOVIE_API_URL)
            .then(response => response.json())
            .then(jsonResponse => {
        
            dispatch({
                type: "SEARCH_MOVIES_SUCCESS",
                payload: jsonResponse.Search
        	});
      	});
  	}, []);

    const search = searchValue => {
    	dispatch({
      	type: "SEARCH_MOVIES_REQUEST"
    	});
	
        fetch(`https://api.themoviedb.org/3/?s=${searchValue}&apikey=b497c9753de195dadd7522a518933ea`)
      	.then(response => response.json())
      	.then(jsonResponse => {
        	if (jsonResponse.Response === "True") {
          	dispatch({
                type: "SEARCH_MOVIES_SUCCESS",
                payload: jsonResponse.Search
          	});
        	} else {
          	dispatch({
                type: "SEARCH_MOVIES_FAILURE",
                error: jsonResponse.Error
          	});
          }
      	});
	  };
    
    
    return (
    <div className="App">
    
      <Search search={search} />
      
      
    </div>
  );
};


export default Test;