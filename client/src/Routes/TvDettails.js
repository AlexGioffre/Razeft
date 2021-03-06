import React, {Component} from 'react';
import TvDettails from '../components/TvDettails/TvDettails';
import Loading from '../components/Loading/Loading';
class TvDettailsRoute extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoad: false
        }
    }
   
    componentDidMount() {
        this.props.serieDettail(this.props.match.params.id);
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
            !this.state.isLoad ? <Loading /> : <TvDettails messlikeSeries={this.props.messlikeSeries} likeSeries={this.props.likeSeries} auth={this.props.auth} element={this.props.data.series}/>
        )
    }
}

export default TvDettailsRoute;