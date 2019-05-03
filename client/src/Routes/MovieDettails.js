import React, {Component} from 'react';
import MovieDettails from '../components/MovieDettails/MovieDettails';

class MovieDettailsRouter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoad: false
        }
    }

    componentDidMount() {
        this.props.movieDettail(this.props.match.params.id);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.data.isPeddingDettails === false){
            setTimeout(()=> {
                this.setState({isLoad: true})
              },1000)
        }
    }

    render() {
        return (
            !this.state.isLoad ? <h1>Loading...</h1> : <MovieDettails messlikeMovie={this.props.messlikeMovie} loadUser={this.props.loadUser} likeMovie={this.props.likeMovie} auth={this.props.auth} element={this.props.data.movie}/>
        )
    }
}

export default MovieDettailsRouter;