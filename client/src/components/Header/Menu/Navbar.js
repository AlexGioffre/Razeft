import React,  {Component} from 'react';
import { NavLink } from 'react-router-dom'
import './Navbar.css';




class Navbar extends Component {


    searchButton = () => {
        var html = document.querySelector("html");
        var box = document.getElementById('searchBox');
        box.classList.add('search_box-active');
        html.style.overflow = "hidden";
    }

   render() {
        return (
            <div className="menu">
                <h1 className="logo">R<span>azeft</span></h1>
                <ul className="primary_menu">
                    <li><NavLink to="/" exact activeClassName="active">Home</NavLink></li>
                    <li><NavLink to="/movies" exact activeClassName="active">Movies</NavLink></li>
                    <li><NavLink to="/tvSeries" exact activeClassName="active">TV Series</NavLink></li>
                </ul>
                <nav className="menu_dinamic">
                    <div className="account">
                        {
                            this.props.auth.isAuthenticated ?
                            <NavLink to="/profile" exact>
                                <picture>
                                    <source  media="(max-width: 500px)" srcSet={`https://via.placeholder.com/30`} />
                                    <source media="(max-width: 780px)" srcSet={`https://via.placeholder.com/40`}/>
                                    <source media="(max-width: 1280px)" srcSet={`https://via.placeholder.com/40`} />
                                    <img src="https://via.placeholder.com/40" alt="icon" />
                                </picture>
                                <p>{this.props.auth.user.name}</p>
                            </NavLink> :
                            <NavLink to="/register" exact><p className="account_nav">Register</p></NavLink>
                        }
                    </div>
                    <div className="account">
                            {   this.props.auth.isAuthenticated ?
                                <li className="account_nav" onClick={this.props.logout}>Logout</li> :
                                <li><NavLink to="/login" exact><p className="account_nav">Login</p></NavLink></li>
                            }
                    </div>
                    <div className="search">
                        <button onClick={this.searchButton} id="searchIcon"><i className="fas fa-search fa-2x"></i></button>
                    </div>
                </nav>
            </div>
        );
   }
}

export default Navbar;