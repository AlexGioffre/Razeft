import React, {Component} from 'react';
import GalleryDettail from '../GalleryDettail/GalleryDettail';
import GalleryImages from '../GalleryDettail/GalleryImages';
import GalleryBackdrop from '../GalleryDettail/GalleryBackdrop';
import GalleryVideos from '../GalleryDettail/GalleryVideos';
import './dettail.css';

class MovieDettails extends Component {
    componentDidMount() {
        var main = document.querySelector(".container_show");
        setTimeout(() => {
            main.classList.add("container_show-active");
        },50);
        console.log(this.props)
    }


    openSection = (e) => {
        let box = e.target.parentNode;
        box.classList.toggle('show_section--active');

    }

    render() {
        return(
            <div className="container_show">
                {
                    this.props.element.dettail.backdrop_path != null ? 
                    <picture>
                        <source  media="(max-width: 500px)" srcSet={`https://image.tmdb.org/t/p/w500${this.props.element.dettail.backdrop_path}`} />
                        <source media="(max-width: 780px)" srcSet={`https://image.tmdb.org/t/p/w780${this.props.element.dettail.backdrop_path}`}/>
                        <img className="show_image"  src={`https://image.tmdb.org/t/p/original${this.props.element.dettail.backdrop_path}`} alt={this.props.element.dettail.title} />
                        {
                            this.props.element.dettail.title.length <= 20 ?
                            <div className="show_title">
                                <h1>{this.props.element.dettail.title}</h1>
                                {this.props.element.dettail.title === this.props.element.dettail.original_title ? null : <h2>{this.props.element.dettail.original_title}</h2>}
                            </div> :
                            <div className="show_title-m">
                                <h1>{this.props.element.dettail.title}</h1>
                                {this.props.element.dettail.title === this.props.element.dettail.original_title ? null : <h2>{this.props.element.dettail.original_title}</h2>}
                            </div>
                        }
                    </picture> :
                    <picture>
                        <source  media="(max-width: 500px)" srcSet={`https://via.placeholder.com/500x700`} />
                        <source media="(max-width: 780px)" srcSet={`https://via.placeholder.com/800x700`}/>
                        <img className="show_image"  src={`https://via.placeholder.com/1920x1080`} alt={this.props.element.dettail.title} />
                        {
                            this.props.element.dettail.title.length <= 20 ?
                            <div className="show_title">
                                <h1>{this.props.element.dettail.title}</h1>
                                {this.props.element.dettail.title === this.props.element.dettail.original_title ? null : <h2>{this.props.element.dettail.original_title}</h2>}
                            </div> :
                            <div className="show_title-m">
                                <h1>{this.props.element.dettail.title}</h1>
                                {this.props.element.dettail.title === this.props.element.dettail.original_title ? null : <h2>{this.props.element.dettail.original_title}</h2>}
                            </div>
                        }
                    </picture>
                }
                <div className="show_section">
                    <h3 className="show_section--title" onClick={this.openSection}>Plot</h3>
                    {
                        this.props.element.dettail.overview.length >= 200 ?
                        <div className="show_section_content-text">
                            <p>{this.props.element.dettail.overview}</p>
                        </div> :
                        <div className="show_section_content-text-m">
                            <p>{this.props.element.dettail.overview}</p>
                        </div>
                    }
                </div>
                <div className="show_section mt">
                    <h3 className="show_section--title" onClick={this.openSection}>Cast</h3>
                    {
                        this.props.element.cast.length > 0 ?
                        <div className="show_section_content-gallery">
                            <GalleryDettail data={this.props.element.cast} />
                        </div> :
                        <div className="show_section_content-text-error">
                            <h1 className="error_data">NO INFO SORRY!</h1>
                        </div>
                    }
                </div>
                <div className="show_section mt">
                    <h3 className="show_section--title" onClick={this.openSection}>Crew</h3>
                    {
                        this.props.element.crew.length > 0 ?
                        <div className="show_section_content-gallery">
                           <GalleryDettail data={this.props.element.crew} />
                        </div> :
                        <div className="show_section_content-text-error">
                            <h1 className="error_data">NO INFO SORRY!</h1>
                        </div>
                    }
                </div>
                <div className="show_section mt">
                    <h3 className="show_section--title" onClick={this.openSection}>Poster</h3>
                    {
                        this.props.element.images.poster.length > 0 ?
                        <div className="show_section_content-gallery-poster">
                           <GalleryImages data={this.props.element.images.poster} />
                        </div> :
                        <div className="show_section_content-text-error">
                            <h1 className="error_data">NO IMAGES SORRY!</h1>
                        </div>
                    }
                </div>
                <div className="show_section mt">
                    <h3 className="show_section--title" onClick={this.openSection}>Backdrops</h3>
                    {
                        this.props.element.images.backdrops.length > 0 ?
                        <div className="show_section_content-gallery-backdrop">
                            <GalleryBackdrop data={this.props.element.images.backdrops} />
                        </div> :
                        <div className="show_section_content-text-error">
                            <h1 className="error_data">NO IMAGES SORRY!</h1>
                        </div>
                    }
                </div>
                <div className="show_section mt">
                    <h3 className="show_section--title" onClick={this.openSection}>Videos</h3>
                    {
                        this.props.element.videos.length > 0 ?
                        <div className="show_section_content-gallery-video">
                            <GalleryVideos data={this.props.element.videos} />
                        </div> :
                        <div className="show_section_content-text-error">
                            <h1 className="error_data">NO VIDEOS SORRY!</h1>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default MovieDettails;