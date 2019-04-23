import React, {Component} from 'react';
import SearchCard from './SearchCard/SearchCard'
import './Search.css';

class Search extends Component {


    constructor() {
        super();
        this.state = {
            searchText: ""
        }
    }

    searchCall = () =>{
        this.props.getResults(this.state.searchText)
    }

    closeBox = () => {
        var html = document.querySelector("html");
        var box = document.getElementById('searchBox');
        box.classList.remove('search_box-active');
        html.style.overflowY = "auto";
        this.setState({searchText: "", shows: []});
    }

    changeText = (event) => {
        this.setState({searchText: event.target.value});
    }


    render() {
        return (
            <div className="search_box" id="searchBox">
                <div className="top">
                    <div className="searchInput">
                        <input className="input" type="text" placeholder="Search Movies or TV Series" value={this.state.searchText}  onChange={this.changeText} />
                        <button className="searchbtn" onClick={this.searchCall}><i className="fas fa-search"></i></button>
                    </div>
                    <button className="btn_close" onClick={this.closeBox}>X</button>
                </div>
                <div className="searchResult">
                    {
                        this.props.search.result.map(data => {
                            return(
                                <SearchCard key={data.id} name={data.name || data.title} img={data.poster_path} overview={data.overview} id={data.id} media={data.media_type}/>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default Search;