import React, {Component} from 'react';
import ProfileComponent from '../components/Profile/Profile';
import {Redirect} from 'react-router-dom';

      
class Profile extends Component {

    constructor(){
        super();
        this.state = {
            movies: [],
            series: [],
            i: 0,
            y: 0,
            load: false
        }
    }

    componentDidMount(){
        if(this.props.auth.user){
            this.setState({i: 0});
            this.loopMovie();

        }
    }

    loopMovie = () => {
        if(this.props.auth.user){

            if(this.props.auth.user.movies === null || this.props.auth.user.movies === undefined  ){
                this.setState({movies: [], load: false, y: 0});
                this.loopSeries();
                return -1;
            }
            if(  this.state.i === this.props.auth.user.movies.length ){
                this.setState({movies: this.state.movies});
                this.loopSeries();
                return -1;
            }

            fetch(`/api/movieId/${this.props.auth.user.movies[this.state.i]}`,{
                headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
            })
            .then(response => response.json())
            .then(movies =>  {
                this.setState({movies: this.state.movies.concat(movies.dettail)})
                this.setState({i: this.state.i + 1});
                this.loopMovie()
            })
            .catch(err => console.log(err));
        }
    }

    loopSeries = () => {
        if(this.props.auth.user){
            console.log(this.props.auth.user.tvseries)
            if(this.props.auth.user.tvseries === null){
                this.setState({series: [], load: true});
                return -1;
            }
            if( this.state.y === this.props.auth.user.tvseries.length){
                this.setState({series: this.state.series, load: true});
                return -1;
            }
            fetch(`/api/seriesId/${this.props.auth.user.tvseries[this.state.y]}`,{
                headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
            })
            .then(response => response.json())
            .then(shows =>  {

                this.setState({series: this.state.series.concat(shows.dettail)})
                this.setState({y: this.state.y + 1});
                this.loopSeries()
            })
            .catch(err => console.log('series'));
        }
    }

    render(){
        return(
            !this.props.auth.isAuthenticated ? <Redirect to="/" /> :
            !this.state.load ? <h1 className="loader">Loading</h1> :
            <ProfileComponent auth={this.props.auth} movies={this.state.movies} series={this.state.series} />
        )
    }
}


export default Profile;