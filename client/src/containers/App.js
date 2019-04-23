import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from '../components/Header/Header';
import Search from '../components/Search/Search';
import Home from '../Routes/Home';
import MoviesPage from '../Routes/Movies';
import TvSeriesPage from '../Routes/TvSeries';
import TvDettailsRoute from '../Routes/TvDettails';
import MovieDettailsRouter from '../Routes/MovieDettails';
import Register from '../Routes/Register';
import Login from '../Routes/Login';
import {connect} from 'react-redux';

import {getHomeShows} from '../actions/homeActions';
import {getMoviesShows} from '../actions/moviesActions';
import {getSeriesShows} from '../actions/seriesActions';
import {getMovieDettails} from '../actions/movieDettailActions';
import {getSeriesDettails} from '../actions/seriesDettailActions';
import {SearchShow} from '../actions/searchActions';

const mapStateToProps = (state) => {
  return {
    homeShows: state.homeShows,
    moviesShows: state.moviesShows,
    seriesShows: state.seriesShows,
    movieDettail: state.movieDettail,
    serieDettail: state.serieDettail,
    searchResult: state.searchResult
  }
};


const mapDispatchToProps = (dispatch) => {
  return {
    onGetShows: () => dispatch(getHomeShows()),
    onGetMovies: () => dispatch(getMoviesShows()),
    onGetSeries: () => dispatch(getSeriesShows()),
    searchShow: (query) => dispatch(SearchShow(query)),
    onGetMovieDettail: (id) => dispatch(getMovieDettails(id)),
    onGetSeriesDettail: (id) => dispatch(getSeriesDettails(id))
  }
}

class App extends Component {


  render(){
    return (
      <Router>
        <div  className="container">
          <header  className="header">
            <Header  />
            <Search search={this.props.searchResult} getResults={this.props.searchShow} />
          </header>
            <Switch>
              <Route exact path="/"  render={(routeProps ) => <Home  data={this.props.homeShows}  onGetShows={this.props.onGetShows}  {...routeProps} />}/>
              <Route exact path="/movies" render={(routeProps) => <MoviesPage data={this.props.moviesShows} onGetMovies={this.props.onGetMovies} {...routeProps} /> }/>
              <Route exact path="/tvSeries" render={(routeProps) => <TvSeriesPage   data={this.props.seriesShows} onGetSeries={this.props.onGetSeries} {...routeProps}/>}/>
              <Route exact path="/tv/:id"  render={(routeProps) => <TvDettailsRoute key={routeProps.match.params.id} data={this.props.serieDettail} serieDettail={this.props.onGetSeriesDettail} {...routeProps}/>}/>
              <Route exact path="/movie/:id"  render={(routeProps) => <MovieDettailsRouter key={routeProps.match.params.id} data={this.props.movieDettail} movieDettail={this.props.onGetMovieDettail} {...routeProps}/>}/>
              <Route exact path="/register" render={(routeProps) => <Register {...routeProps}/>} />
              <Route exact path="/login" render={(routeProps) => <Login {...routeProps}/> } />
            </Switch>
        </div>
      </Router>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
