import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import Gallery from '../Gallery/Gallery';

import './Main.css';

class Main extends Component  {

    componentDidMount() {
        var main = document.querySelector(".main");
        setTimeout(() => {
            main.classList.add("main-active");
        },50);
    }

    render(){
        let string = "";
        if(this.props.headerslide[0].overview.lenght <= 100){
        string = this.props.headerslide[0].overview;
        } else {
        string = this.props.headerslide[0].overview.substring(0, 100) + "...";
        }

        let whatShow = "";
        if(this.props.isTv === true){
            whatShow = "tv";
        } else if (this.props.isMovies === true){
        whatShow = "movie"
        }
        return(
        <div className="main">
            <div className="main_show">
                <picture >
                    <source  media="(max-width: 500px)" srcSet={`https://image.tmdb.org/t/p/w500${this.props.headerslide[0].poster_path}`} />
                    <source media="(max-width: 780px)" srcSet={`https://image.tmdb.org/t/p/w780${this.props.headerslide[0].poster_path}`}/>
                    <source media="(max-width: 1280px)" srcSet={ this.props.headerslide[0].backdrop_path ? `https://image.tmdb.org/t/p/w1280${this.props.headerslide[0].backdrop_path}` : `https://image.tmdb.org/t/p/original${this.props.headerslide[0].poster_path}`} />
                    <img className="main_show-poster" src={`https://image.tmdb.org/t/p/original${this.props.headerslide[0].backdrop_path}`} alt="Poster" />
                </picture>
                <div className="caption">
                    <h1>{this.props.headerslide[0].name || this.props.headerslide[0].title}</h1>
                    <h2>{string}</h2>
                    <NavLink  to={`/${whatShow}/${this.props.headerslide[0].id}`}> <button className="btn_card">See More <i className="far fa-play-circle"></i></button></NavLink>
                </div>
            </div>
            
            <section>
                <h1 className="title_section">Popular Tv Series</h1>
                <Gallery data={this.props.tvSeries} media="tv"/>
            </section>

            <section>
                <h1 className="title_section">Popular Movies</h1>
                <Gallery data={this.props.movies} media="movie"/>
            </section>

            <section>
                <h1 className="title_section">Horror Movies</h1>
                <Gallery data={this.props.horror} media="movie"/>
            </section>

            <section>
                <h1 className="title_section">Anime</h1>
                <Gallery data={this.props.anime} media="tv"/>
            </section>

        </div>
    )}
}

export default Main;