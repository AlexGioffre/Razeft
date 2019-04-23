import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";


const responsive = {
    0: { items: 1 },
    400: {items: 1},
    600: { items: 2 },
    1024: { items: 4 },
};



const GalleryVideos = ({data}) => {

  
  const handleOnDragStart = e => e.preventDefault();
  return (
    <AliceCarousel mouseDragEnabled  responsive={responsive} buttonsDisabled={true} dotsDisabled={true}>
      {
        data.map((ele, index) => {
          return(
            <iframe onDragStart={handleOnDragStart} className="video" key={index} title={ele.name} src={`https://www.youtube.com/embed/${ele.key}`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          )
        })
      }
    </AliceCarousel>
  )
}

export default GalleryVideos;