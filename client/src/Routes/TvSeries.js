import React, {Component} from 'react';
import TvSeries from '../components/TvSeries/tvSeries';
import Loading from '../components/Loading/Loading';
class TvSeriesPage extends Component {
    constructor() {
        super();
        this.state ={
            isLoad: false
        }
    }

    componentDidMount() {
        this.props.onGetSeries();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.data.isPeddingSeries === false) {
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
        return (
            !this.state.isLoad ? <Loading /> : <TvSeries  element={this.props.data.series} />
        )
    }
}

export default TvSeriesPage;