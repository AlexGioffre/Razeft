import {combineReducers} from 'redux';
import homeReducers from './homeReducers';
import moviesReducers from './moviesReducers';
import seriesReducers from './seriesReducers';
import movieDettailReducers from './movieDettailReducers';
import seriesDettailReducets from './seriesDettailReducers';
import searchReducers from './searchReducers';
import errorReducers from './errorReducers';
import authReducers from './authReducers';
import movieLike from './movieLike';
import seriesLike from './seriesLike';

export default combineReducers({
    homeShows: homeReducers,
    moviesShows: moviesReducers,
    seriesShows: seriesReducers,
    movieDettail: movieDettailReducers,
    serieDettail: seriesDettailReducets,
    searchResult: searchReducers,
    error: errorReducers,
    movieLike: movieLike,
    seriesLike: seriesLike,
    auth: authReducers
})