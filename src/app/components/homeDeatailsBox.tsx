"use client"; 

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; 

function HomeDeatailsBox() {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-between w-full min-w-96 text-white gap-5 mt-24">
      {/* Games - อยู่ซ้ายสุด */}
      <div className="flex w-full justify-start">
        <div className="w-[100vh] flex flex-row border border-white gap-5 bg-lime-800 bg-opacity-70 hover:bg-opacity-95 p-6 group">
          <div className="w-1/3 relative h-36 min-w-24">
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/terrabit-5d129.appspot.com/o/decorative%2Fimage0_0%20%285%29.jpg?alt=media"
              alt="Decorative Image"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />

          </div>
          <div className="flex flex-col">
            <div className="text-[1.4rem] font-bold">Games: Play Beyond Imagination</div>
            <div className="text-[1.2rem]">"Crafting Worlds, One Pixel at a Time"</div>
            <div>
              Step into a world where every pixel tells a story. Explore our collection of handcrafted indie games, designed to bring out the nostalgia of classic gaming while incorporating modern creativity.
            </div>
            {/* 🔗 ปุ่มเปลี่ยนหน้า */}
            <div
              className="self-end p-3 transition-all duration-300 cursor-pointer group-hover:bg-slate-50 group-hover:text-blue-600 inline-flex w-fit rounded-sm group-hover:shadow-lg"
              onClick={() => router.push("/product?category=1")} 
            >
              View All Games
            </div>
          </div>
        </div>
      </div>

      {/* Accessories - อยู่ขวาสุด */}
      <div className="flex w-full justify-end">
        <div className="w-[100vh] flex flex-row border border-white gap-5 bg-green-800 bg-opacity-80 hover:bg-opacity-95 p-6 group">
          <div className="w-1/3 relative h-36 min-w-24">
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/terrabit-5d129.appspot.com/o/decorative%2Fimage0_0%20%2841%29.jpg?alt=media"
              alt="Decorative Image3"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <div className="text-[1.4rem] font-bold">Accessories: Elevate Your Gaming Setup</div>
            <div className="text-[1.2rem]">"Enhance Your Play with Premium Gear"</div>
            <div>
              From custom keycaps and LED desk lights to high-quality gaming gear, our accessories collection is designed to enhance both functionality and aesthetics for the ultimate gaming experience.
            </div>
            <div
              className="self-end p-3 transition-all duration-300 cursor-pointer group-hover:bg-slate-50 group-hover:text-blue-600 rounded-sm group-hover:shadow-lg inline-flex w-fit"
              onClick={() => router.push("/product?category=3")} // ✅ ไปที่ /shop/accessories
            >
              Explore the Shop
            </div>
          </div>
        </div>
      </div>

      {/* Home Decoration - อยู่ซ้ายสุด */}
      <div className="flex w-full justify-start">
        <div className="w-[100vh] flex flex-row border border-white gap-5 bg-cyan-800 bg-opacity-80 hover:bg-opacity-95 p-6 group">
          <div className="w-1/3 relative h-36 min-w-24">
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/terrabit-5d129.appspot.com/o/decorative%2Fimage1_0%20%2825%29.jpg?alt=media"
              alt="Decorative Image2"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <div className="text-[1.4rem] font-bold">Home Decoration: Style Your Space</div>
            <div className="text-[1.2rem]">"Transform Your Room into a Gamer’s Haven"</div>
            <div>
              Make your gaming space truly unique with pixel-themed posters, neon signs, and artwork inspired by your favorite games. Elevate your room aesthetics with high-quality decorations tailored for gamers.
            </div>
            <div
              className="self-end p-3 transition-all duration-300 cursor-pointer group-hover:bg-slate-50 group-hover:text-blue-600 inline-flex w-fit rounded-sm group-hover:shadow-lg"
              onClick={() => router.push("/product?category=4")}
            >
              Browse Collection
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeDeatailsBox;
