import React, {Component} from 'react';
import Gallery from '../Gallery/Gallery';

class Movies extends Component {

    componentDidMount() {
        var main = document.querySelector(".main");
        setTimeout(() => {
            main.classList.add("main-active");
        },50);
    }

    render() {
        return(
            <div className="main">
                <section>
                    <h1 className="title_section">Popular </h1>
                    <Gallery data={this.props.element.popular} media="movie"/>
                </section>

                <section>
                    <h1 className="title_section">Documentary</h1>
                    <Gallery data={this.props.element.documentary} media="movie"/>
                </section>

                <section>
                    <h1 className="title_section">History</h1>
                    <Gallery data={this.props.element.history} media="movie"/>
                </section>

                <section>
                    <h1 className="title_section">Cartoon</h1>
                    <Gallery data={this.props.element.cartoon} media="movie"/>
                </section>

                <section>
                    <h1 className="title_section">Crimes</h1>
                    <Gallery data={this.props.element.crimes} media="movie"/>
                </section>

            </div>
        )
    }
}

export default Movies;