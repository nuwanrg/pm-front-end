import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBoxComponent from "../searchBoxComponent/searchBoxComponent";



function CarouselComponent(){
    return(
        <div id="carousel-example-generic" className="carousel slide" data-ride="carousel">
            <div id="serchbox" className="serchbox" >
                <SearchBoxComponent />
            </div>
        <Carousel>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="download (1).jpg"
                    alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="220235448.jpg"
                    alt="Third slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="unnamed.jpg"
                    alt="Third slide"
                />
            </Carousel.Item>
        </Carousel>
        </div>
    );
}

export default CarouselComponent;