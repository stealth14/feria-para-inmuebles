import React from "react";
import styles from "./PhotosCarousel.module.scss";
import { Carousel } from "antd";
import Image from "next/image";

interface PhotosCarouselProps {
  photos: string[];
}

export default function PropertyCarousel(props: PhotosCarouselProps) {
  const { photos } = props;
  return (
    <Carousel className={styles.container}>
      {photos.map((photo: string, index: number) => {
        return (
          <div key={index}>
            <div className={styles.tile}>
              <div
                style={{ backgroundImage: `url(${photo})` }}
                className={styles.background}
              />
              <img
                alt={`inmueble foto ${index}`}
                className={styles.photo}
                src={photo}
              />
            </div>
          </div>
        );
      })}
    </Carousel>
  );
}
