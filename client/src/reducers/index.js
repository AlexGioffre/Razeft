import {combineReducers} from 'redux';
import homeReducers from './homeReducers';
import moviesReducers from './moviesReducers';
import seriesReducers from './seriesReducers';
import movieDettailReducers from './movieDettailReducers';
import seriesDettailReducets from './seriesDettailReducers';
import searchReducers from './searchReducers';

export default combineReducers({
    homeShows: homeReducers,
    moviesShows: moviesReducers,
    seriesShows: seriesReducers,
    movieDettail: movieDettailReducers,
    serieDettail: seriesDettailReducets,
    searchResult: searchReducers
})