import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
export default function Banner() {
  return (
    <div>
         <Carousel >
      <Carousel.Item interval={1000}>
        <img
          
          className="d-block"
          style = {{width  : "50vw" , aspectRatio : '13/9',marginLeft : "auto", marginRight : "auto" }}
          src={require ("./dead.gif")}
          alt="First slide"
        />
        <Carousel.Caption>
         
          <p className = "theme">Lets GO !!!</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={500}>
        <img
          className="d-block "
          style = {{width  : "50vw" , aspectRatio : '15/9',marginLeft : "auto", marginRight : "auto" }}


          src={require("./uta.jpg")}
          alt="Second slide"
        />
        <Carousel.Caption>
         
          <p className = "theme" style ={{color : "yellow"}}>:3 </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block "
          style = {{width  : "50vw" , aspectRatio : '15/9',marginLeft : "auto", marginRight : "auto" }}
          src={require("./juzo.jpg")}
          alt="Third slide"
        />
        <Carousel.Caption>
          
          <p className = "theme" style = {{color : "red", fontSize : 12}}>
            Ini Mini MIINI mo
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
  )
}




