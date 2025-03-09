"use client";

import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Swiper as SwiperClass } from "swiper";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { X } from "lucide-react";

interface ImageData {
  id: number;
  name: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  productId: number;
}

interface ImageSwiperProps {
  images: ImageData[];
}

const ImageSwiper: React.FC<ImageSwiperProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const swiperRef = useRef<SwiperClass | null>(null); 

  return (
    <section className="bg-black p-4">
      <div className="container">
        {/* Main Swiper */}
        <Swiper
          spaceBetween={20}
          navigation={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          modules={[Navigation, Autoplay]}
          className="h-96 max-w-4xl mx-auto"
          onSwiper={(swiper) => (swiperRef.current = swiper)} 
        >
          {images.map((image) => (
            <SwiperSlide key={image.id}>
              <div className="flex h-full w-full items-center justify-center">
                <Image
                  src={image.imageUrl}
                  alt={`Slide ${image.id}`}
                  width={800}
                  height={500}
                  className="block h-full w-full object-contain max-h-[400px] cursor-pointer"
                  priority={image.id === images[0].id}
                  onClick={() => setSelectedImage(image.imageUrl)}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Thumbnail */}
        <nav className="my-4">
          <ul className="flex gap-4">
            {images.map((image, index) => (
              <li key={image.id}>
                <button
                  onClick={() => swiperRef.current?.slideTo(index)} 
                  className="relative block h-full w-full overflow-hidden border border-gray-600"
                >
                  <Image
                    src={image.imageUrl}
                    alt={`Thumbnail ${index + 1}`}
                    width={80}
                    height={40}
                    className="block h-full w-full object-cover"
                  />
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Modal for full-screen image */}
      {selectedImage && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative p-4 rounded-lg max-w-5xl">
            <button
              className="absolute top-0 right-0 text-white bg-red-500 px-3 py-1"
              onClick={() => setSelectedImage(null)}
            >
              <X size={20} />
            </button>

            <Image
              src={selectedImage}
              width={1200}
              height={800}
              alt="Expanded Image"
              className="max-w-full max-h-screen object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default ImageSwiper;
