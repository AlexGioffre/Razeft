import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import { NavLink } from 'react-router-dom';

const responsive = {
    0: { items: 1 },
    400: {items: 1},
    600: { items: 2 },
    1024: { items: 4 },
};



const Gallery = ({data, media}) => {

  
  const handleOnDragStart = e => e.preventDefault();
  return (
    <AliceCarousel mouseDragEnabled  responsive={responsive}  dotsDisabled={true}>
      {
        data.map((ele, index) => {
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

          let title = "";
          if(ele.title) {
            title = ele.title;
          } else {
            title = ele.name;
          }

          let over = "";
          if(ele.overview.lenght <= 200){
            over = ele.overview
          } else {
            over = ele.overview.substring(0, 200) + "...";
          }

          return(
            <picture  onDragStart={handleOnDragStart} key={index}>
              <source  media="(max-width: 500px)" srcSet={`https://image.tmdb.org/t/p/w500${ele.poster_path}`} />
              <source media="(max-width: 780px)" srcSet={`https://image.tmdb.org/t/p/w780${ele.poster_path}`}/>
              <img className="element"  src={`https://image.tmdb.org/t/p/original${ele.poster_path}`} alt="Poster" />
              <div className="caption" id={ele.id}>
                <button className="btn_gallery" onClick={info}>!</button>
                <div className="caption_info">
                  <button className="btn_gallery-close" onClick={close}>X</button>
                  <div className="caption_data">
                    <h1>{title}</h1>
                    <p>{over}</p>
                    <NavLink  to={`/${media}/${ele.id}`}> <button className="btn_card">See More <i className="far fa-play-circle"></i></button></NavLink>
                  </div>
                </div>
              </div>
            </picture>
          )
        })
      }
    </AliceCarousel>
  )
}

export default Gallery;