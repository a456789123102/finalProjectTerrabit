import React from 'react'

function HomeDeatailsBox() {
    return (
<div className="border flex flex-col justify-between w-full min-w-96 text-white border-red-500 gap-5 mt-24">
  {/* อยู่ซ้ายสุด */}
  <div className="flex w-full  justify-start">
    <div className="w-[100vh] flex flex-row border border-x-white bg-lime-800 bg-opacity-80 hover:bg-opacity-90 p-6">
      <div className="w-1/3">image here</div>
      <div className="flex flex-col">
        <div className="text-[1.4rem]">Games: Play Beyond Imagination</div>
        <div className="text-[1.2rem]">"Crafting Worlds, One Pixel at a Time"</div>
        <div>
          Step into a world where every pixel tells a story. Explore our collection of handcrafted indie games, designed to bring out the nostalgia of classic gaming while incorporating modern creativity.
        </div>
      </div>
    </div>
  </div>

  {/* อยู่ขวาสุด */}
  <div className="flex w-full justify-end">
    <div className="w-[100vh] flex flex-row border border-x-white bg-green-800 bg-opacity-80 hover:bg-opacity-90 p-6">
      <div className="w-1/3">image here</div>
      <div className="flex flex-col">
        <div className="text-[1.4rem]">Games: Play Beyond Imagination</div>
        <div className="text-[1.2rem]">"Crafting Worlds, One Pixel at a Time"</div>
        <div>
          Step into a world where every pixel tells a story. Explore our collection of handcrafted indie games, designed to bring out the nostalgia of classic gaming while incorporating modern creativity.
        </div>
      </div>
    </div>
  </div>
    {/* อยู่ซ้ายสุด */}
    <div className="flex w-full justify-start">
    <div className="w-[100vh] flex flex-row border border-x-white bg-emerald-800 bg-opacity-80 hover:bg-opacity-90 p-6">
      <div className="w-1/3">image here</div>
      <div className="flex flex-col">
        <div className="text-[1.4rem]">Games: Play Beyond Imagination</div>
        <div className="text-[1.2rem]">"Crafting Worlds, One Pixel at a Time"</div>
        <div>
          Step into a world where every pixel tells a story. Explore our collection of handcrafted indie games, designed to bring out the nostalgia of classic gaming while incorporating modern creativity.
        </div>
      </div>
    </div>
  </div>
</div>

    )
}

export default HomeDeatailsBox
