import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules'; // Correct module import for Swiper 8+
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

function ImageSwiper({ images }) {
  return (
    <section className="bg-black p-4">
      <div className="container">
        {/* Main Swiper */}
        <Swiper
          spaceBetween={20}
          navigation={true} // Enable navigation
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true} // *** เพิ่มคุณสมบัติ loop เพื่อให้เลื่อนกลับไปยังรูปแรก ***
          modules={[Navigation, Autoplay]} // Register modules correctly
          className="h-96 max-w-4xl mx-auto"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="flex h-full w-full items-center justify-center">
                <Image
                  src={image.imageUrl}
                  alt={image.alt || `Slide ${index + 1}`}
                  width={800}
                  height={500}
                  className="block h-full w-full object-contain max-h-[400px]"
                  priority={index === 0}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation */}
        <nav className="my-4">
          <ul className="flex gap-4">
            {images.map((image, index) => (
              <li key={index}>
                <button
                  onClick={() => {
                    const swiperInstance = document.querySelector('.swiper')?.swiper;
                    swiperInstance?.slideTo(index);
                  }}
                  className="relative block h-full w-full overflow-hidden border border-gray-600"
                >
                  <Image
                    src={image.imageUrl}
                    alt={image.alt || `Image ${index + 1}`}
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
    </section>
  );
}

export default ImageSwiper;
