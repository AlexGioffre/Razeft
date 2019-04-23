import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";


const responsive = {
    0: { items: 1 },
    400: {items: 1},
    600: { items: 1 },
    1024: { items: 3 },
};



const GalleryDettail = ({data}) => {

  
  const handleOnDragStart = e => e.preventDefault();
  return (
    <AliceCarousel mouseDragEnabled  responsive={responsive} buttonsDisabled={true} dotsDisabled={true}>
      {
        data.map((ele, index) => {
          return(
            <picture  onDragStart={handleOnDragStart} key={index}>
                <source  media="(max-width: 500px)" srcSet={`https://image.tmdb.org/t/p/w500${ele.profile_path}`} />
                <source media="(max-width: 780px)" srcSet={`https://image.tmdb.org/t/p/w780${ele.profile_path}`}/>
                <img className="photo_cast"  src={`https://image.tmdb.org/t/p/original${ele.profile_path}`} alt="Poster" />
                <div className="info_cast">
                    <h2>{ele.name}</h2>
                    <h3>{ele.character || ele.job}</h3>
                </div>
            </picture>
          )
        })
      }
    </AliceCarousel>
  )
}

export default GalleryDettail;