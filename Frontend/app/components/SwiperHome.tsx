"use client"
import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import dotlifeBanner1 from "../../public/productsImage/dotlifestore1.jpg";
import dotlifeBanner2 from "../../public/productsImage/dotlifestore2.jpg";
const SwiperHome = () => {
  return (
    <Swiper
        className="h-[350px] w-screen"
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
      >
        <SwiperSlide className="flex items-center justify-center">
          <Image
            src={dotlifeBanner1}
            alt="Image"
            fill
            className="object-cover object-[50%_45%]"
          />
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center">
          <Image
            src={dotlifeBanner2}
            alt="Image"
            fill
            className="object-cover object-[50%_35%]"
          />
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center">
          <Image
            src={dotlifeBanner2}
            alt="Image"
            fill
            className="object-cover object-[50%_45%]"
          />
        </SwiperSlide>
      </Swiper>
  )
}

export default SwiperHome