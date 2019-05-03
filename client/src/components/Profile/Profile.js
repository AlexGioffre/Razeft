import React, {Component} from 'react';
import './Profile.css';
import Gallery from '../Gallery/Gallery';
class Profile extends Component {

    render(){

        return (
            <div className="profile_main">
                <h1 className="title">{this.props.auth.user.name}'s favorite show</h1>
                <section className="profile_section">
                    <h2 className="profile_section-title">Favorite Movies</h2>
                    {
                        this.props.movies.length > 0 ?
                        <Gallery data={this.props.movies} media="movie"/> :
                        <h1 style={{textAlign: "center"}}>You don't have already a Favorite Movies</h1>
                    }
                </section>
                <section className="profile_section">
                    <h2 className="profile_section-title">Favorite Series</h2>
                    {
                        this.props.series.length > 0 ?
                        <Gallery data={this.props.series} media="tv"/> :
                        <h1 style={{textAlign: "center"}}>You don't have already a Favorite Tv Series</h1>
                    }
                </section>
            </div>
        )
    }
}


export default Profile;