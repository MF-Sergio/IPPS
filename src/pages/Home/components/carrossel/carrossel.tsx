import React from "react";
import styles from "./carrossel.module.css";
import img1 from "../../../../assets/img/foto1.jpg";
import img2 from "../../../../assets/img/foto2.jpg";
import img3 from "../../../../assets/img/foto3.jpg";
import img4 from "../../../../assets/img/foto4.jpg";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

export function Carrossel() {
  return (
    <Carousel showArrows={true} infiniteLoop={true} autoPlay={true}>
      <div>
        <img src={img1} alt="Image 1" />
      </div>
      <div>
        <img src={img2} alt="Image 2" />
      </div>
      <div>
        <img src={img3} alt="Image 3" />
      </div>
      <div>
        <img src={img4} alt="Image 4" />
      </div>
    </Carousel>
  );
}

export default Carrossel;
