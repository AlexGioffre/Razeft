import React, {Component} from 'react';
import Movies from '../components/Movies/Movies';

class MoviesPage extends Component {
    constructor() {
        super();
        this.state ={
            isLoad: false
        }
    }

    componentDidMount() {
        this.props.onGetMovies();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.data.isPeddingMovie === false) {
            setTimeout(() => {
                var loader = document.querySelector(".loader");
                if(loader){
                    this.fadeOut(loader);
                }
                setTimeout(() => {
                 this.setState({isLoad: true});
                }, 500);
            }, 6000)
        }
    }

    fadeOut = (el) => {
        el.style.opacity = 1;
        (function fade() {
          if ((el.style.opacity -= .1) < 0) {
            el.style.display = "none";
          } else {
            requestAnimationFrame(fade);
          }
        })();
    };


    render() {
        console.log(this.props.movies);
        return (
            !this.state.isLoad ? <h1 className="loader">Loading</h1> : <Movies element={this.props.data.movies}/>
        )
    }
}

export default MoviesPage;