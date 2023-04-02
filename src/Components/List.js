import React, { Component } from 'react'
//import {movies} from './getMovies'
import axios from "axios";
//import { movies } from './getMovies';

export default class List extends Component {

  constructor() {
    super();
    console.log("constructor is called... ")
    this.state = {
      hover:'',
      movies:[],
    }
  }

  handleEnter = (id) => {
    this.setState({
      hover: id,
    })
  }

  handleLeave = () => {
    this.setState({
      hover: '',
    })  
  }  

  async componentDidMount() {
    // console.log("CDM is called... ");
    // let res = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=1749ee86927c862e6ac40360e3eb8c0d&language=en-US&page=1");
    // let data = await res.json();
    let data = await axios.get(
      "https://api.themoviedb.org/3/movie/popular?api_key=1749ee86927c862e6ac40360e3eb8c0d&language=en-US&page=1"
      );
    console.log(data.data);

    this.setState({
      movies:[...data.data.results],
    })

  }
  componentDidUpdate() {
    console.log("CDU is called... ");
  }
  componentWillUnmount() {
    console.log("CWU is called... ");
  }

  render() {
    console.log("rendered ....")
    //let allmovie = movies.results;
    return (
      <>
        {this.state.movies.length === 0 ? (
          <div className='spinner-border text-warning' role="status">
          <span clclassName='visually-hidden'>Loading...</span>
        </div>
        ) : (
          <>
            <div> 
              <h3 className='trending'>
                <strong>Trending</strong>
              </h3>
              <div className='movies-list'>
              {
                this.state.movies.map((movieObj) => {
                return (
                  <div 
                    className="card movie-card" 
                    onMouseEnter={()=>this.handleEnter(movieObj.id)} 
                    onMouseLeave={this.handleLeave}
                    key = {movieObj.id}
                    >
                    <img 
                      src={`https://image.tmdb.org/t/p/original/${movieObj.backdrop_path}`} 
                      className="card-img-top movie-img" 
                      alt="..." 
                      />
                    <h5 className="card-title movie-title">{movieObj.original_title}</h5>
                    <div className='button-wrapper'>
                      { this.state.hover === movieObj.id &&
                        <a href='...' className='btn btn-info movie-button'>
                          Add to Favourites
                        </a>
                      }     
                    </div>
                  </div>
                )
              })}    
              </div>
            </div> 
            <nav aria-label="Page navigation example" className='pagination'>
              <ul className="pagination">
                <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                <li className="page-item"><a className="page-link" href="#">1</a></li>
                <li className="page-item"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item"><a className="page-link" href="#">Next</a></li>
              </ul>
            </nav>
          </>
       )}   
      </>
    )
  }
}
