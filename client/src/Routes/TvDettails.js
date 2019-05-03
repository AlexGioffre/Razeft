import React, {Component} from 'react';
import TvDettails from '../components/TvDettails/TvDettails';

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
            !this.state.isLoad ? <h1>Loading...</h1> : <TvDettails messlikeSeries={this.props.messlikeSeries} loadUser={this.props.loadUser} likeSeries={this.props.likeSeries} auth={this.props.auth} element={this.props.data.series}/>
        )
    }
}

export default TvDettailsRoute;