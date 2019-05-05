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
import Profile from '../Routes/Profile';
import {connect} from 'react-redux';

import {getHomeShows} from '../actions/homeActions';
import {getMoviesShows} from '../actions/moviesActions';
import {getSeriesShows} from '../actions/seriesActions';
import {getMovieDettails, likeMovie} from '../actions/movieDettailActions';
import {getSeriesDettails, likeSeries} from '../actions/seriesDettailActions';
import {SearchShow} from '../actions/searchActions';
import {loadUser} from '../actions/authActions';
import {register} from '../actions/authActions';
import {login} from '../actions/authActions';
import {logout} from '../actions/authActions';
import {clearErrors} from '../actions/errorActions';


const mapStateToProps = (state) => {
  return {
    homeShows: state.homeShows,
    moviesShows: state.moviesShows,
    seriesShows: state.seriesShows,
    movieDettail: state.movieDettail,
    movieLike: state.movieLike,
    seriesLike: state.seriesLike,
    serieDettail: state.serieDettail,
    searchResult: state.searchResult,
    auth: state.auth,
    error: state.error
  }
};


const mapDispatchToProps = (dispatch) => {
  return {
    loadUser: () => dispatch(loadUser()),
    onGetShows: () => dispatch(getHomeShows()),
    onGetMovies: () => dispatch(getMoviesShows()),
    onGetSeries: () => dispatch(getSeriesShows()),
    clearErrors: () => dispatch(clearErrors()),
    register: (user) => dispatch(register(user)),
    login: (user) => dispatch(login(user)),
    logout: () => dispatch(logout()),
    searchShow: (query) => dispatch(SearchShow(query)),
    onGetMovieDettail: (id) => dispatch(getMovieDettails(id)),
    likeMovie: (id) => dispatch(likeMovie(id)),
    onGetSeriesDettail: (id) => dispatch(getSeriesDettails(id)),
    likeSeries: (id) => dispatch(likeSeries(id))
  }
}

class App extends Component {


  componentDidMount() {
    this.props.loadUser();
  }

  render(){
    return (
      <Router>
        <div  className="container">
          <header  className="header">
            <Header  auth={this.props.auth} logout={this.props.logout}/>
            <Search search={this.props.searchResult} getResults={this.props.searchShow} />
          </header>
            <Switch>
              <Route exact path="/"  render={(routeProps ) => <Home  data={this.props.homeShows}  onGetShows={this.props.onGetShows}  {...routeProps} />}/>
              <Route exact path="/movies" render={(routeProps) => <MoviesPage data={this.props.moviesShows} onGetMovies={this.props.onGetMovies} {...routeProps} /> }/>
              <Route exact path="/tvSeries" render={(routeProps) => <TvSeriesPage   data={this.props.seriesShows} onGetSeries={this.props.onGetSeries} {...routeProps}/>}/>
              <Route exact path="/tv/:id"  render={(routeProps) => <TvDettailsRoute key={routeProps.match.params.id} auth={this.props.auth} messlikeSeries={this.props.seriesLike} likeSeries={this.props.likeSeries} data={this.props.serieDettail} serieDettail={this.props.onGetSeriesDettail} {...routeProps}/>}/>
              <Route exact path="/movie/:id"  render={(routeProps) => <MovieDettailsRouter likeMovie={this.props.likeMovie} messlikeMovie={this.props.movieLike} key={routeProps.match.params.id} data={this.props.movieDettail} auth={this.props.auth} movieDettail={this.props.onGetMovieDettail} {...routeProps}/>}/>
              <Route exact path="/register" render={(routeProps) => <Register auth={this.props.auth} error={this.props.error} clearErrors={this.props.clearErrors} register={this.props.register} {...routeProps}/>} />
              <Route exact path="/login" render={(routeProps) => <Login {...routeProps}  auth={this.props.auth}  error={this.props.error} clearErrors={this.props.clearErrors} login={this.props.login}/> } />
              <Route exact path="/profile" render={(routeProps) => <Profile {...routeProps}  loadUser={this.props.loadUser} auth={this.props.auth} onGetmovieDettail={this.props.onGetMovieDettail} movieDettail={this.props.movieDettail} />} />
            </Switch>
        </div>
      </Router>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
