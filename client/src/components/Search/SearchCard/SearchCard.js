import React from 'react';
import { NavLink } from 'react-router-dom';

const info = (e) => {
    e.target.style.display = "none";
    const parent = e.target.parentNode;
    const card = parent.childNodes[1];
    const btnClose = card.childNodes[0];
    const info = card.childNodes[1];
    card.classList.add('caption_info-active');
    btnClose.classList.add('btn_gallery-close-active');
    setTimeout(() => {
      info.classList.add('caption_data-active');
    }, 600)
  }

  const close = (e) => {
    e.target.classList.remove('btn_gallery-close-active');
    const parent = e.target.parentNode;
    const par = parent.parentNode;
    const btn = par.childNodes[0];
    parent.childNodes[1].classList.remove("caption_data-active");
    setTimeout(() => {
      parent.classList.remove('caption_info-active');
      setTimeout(() => {
        btn.style.display = "inline";
      }, 500);
    }, 500)
  }

  const openResult = () => {
    var html = document.querySelector("html");
    var box = document.getElementById('searchBox');
    html.style.overflowY = "auto";
    box.classList.remove('search_box-active');
  }

const SearchCard = ({img, name, overview, id, media}) =>   {

    let text = "";
    if(overview.lenght <= 500){
        text = overview
    } else {
        text = overview.substring(0, 500) + "...";
    }


    return(
        <div className="searchResult_card" id="cardSearch">
            <picture >
                <source  media="(max-width: 500px)" srcSet={`https://image.tmdb.org/t/p/w500${img}`} />
                <source media="(max-width: 780px)" srcSet={`https://image.tmdb.org/t/p/w780${img}`}/>
                <img className="poster"  src={`https://image.tmdb.org/t/p/original${img}`} alt={`Poster ${name}`} />
            </picture>
            <div className="caption" id={id}>
                <button className="btn_gallery" onClick={info}>!</button>
                <div className="caption_info">
                  <button className="btn_gallery-close" onClick={close}>X</button>
                  <div className="caption_data">
                    <h1>{name}</h1>
                    <p>{text}</p>
                    <NavLink  to={`/${media}/${id}`}> <button onClick={openResult} className="btn_card">See More <i className="far fa-play-circle"></i></button></NavLink>
                  </div>
                </div>
              </div>
        </div>
        )
}



export default SearchCard;