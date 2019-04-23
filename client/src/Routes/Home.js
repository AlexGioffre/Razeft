import React, {Component} from 'react';
import Main from '../components/Home/Main';


class Home extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      isLoad: false,
      headerSlide: [],
      isTvSeries: false,
      isMovies: false
    }
  }

  componentDidMount() {
    this.props.onGetShows();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.data.isPeddingHome === false) {
      setTimeout(() => {
        this.loadHeader(this.props.data.shows.popularSeries, this.props.data.shows.popularMovies);
      }, 3000)
    }
  }

  loadHeader = (tvSeries, movies) =>{
    let pre = [];

    while(this.state.headerSlide.length !== 1) {
      let number = Math.floor(Math.random() * 20 );
      pre.forEach(num => {
        if(number === num){
          number++;
        }
      })

      if(number % 2 === 0 && tvSeries[number].backdrop_path != null && tvSeries[number].poster_path != null){
        let newElement = [...this.state.headerSlide, tvSeries[number]];
        this.setState({headerSlide: newElement, isTvSeries: true, isMovies: false})
      } else  if(movies[number].backdrop_path != null && movies[number].poster_path != null){
        let newElement = [...this.state.headerSlide,movies[number]];
        this.setState({headerSlide: newElement, isMovies: true, isTvSeries: false})
      }
      pre.push(number);
    }

    var loader = document.querySelector(".loader");
    if(loader){
      this.fadeOut(loader);
    }
    setTimeout(()=> {
      this.setState({isLoad: true})
    },1000)
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
    return(
      !this.state.isLoad ? <h1 className="loader">Loading</h1> :  <Main headerslide={this.state.headerSlide} isTv={this.state.isTvSeries} isMovies={this.state.isMovies} tvSeries={this.props.data.shows.popularSeries} movies={this.props.data.shows.popularMovies} horror={this.props.data.shows.horrorMovies} anime={this.props.data.shows.anime}/>
    )
  }
}

export default Home;