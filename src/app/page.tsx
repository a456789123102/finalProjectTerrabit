import Nav from './components/nav';
import sLogo from "@/app/assets/images/sLogo.png";
import Quote1 from "@/app/assets/images/quote1.png"
import Image from "next/image";
import CloudAnimation from "./components/cloundAnimate";
import HomeDeatailsBox from './components/homeDeatailsBox';


const firebaseImageUrl =
  "https://firebasestorage.googleapis.com/v0/b/terrabit-5d129.appspot.com/o/decorative%2F66958a0f24351aef552ceaf1_hero-speck-image-sized-nocharacter.png?alt=media";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-indigo-600 font-pixelify">
      <Nav />
      <CloudAnimation />

      {/* Content */}
      <div className="flex flex-col w-full relative z-10">
        <div className="border flex flex-col items-center justify-center mt-7 py-12 gap-8 text-center">
          <Image src={sLogo} alt="Logo" width={800} height={800} />
          <Image src={Quote1} alt="Quote" width={800} height={800} />
          <div className=" text-slate-50 w-1/2 text-[1.4rem]">
            Every pixel tells a story. Discover unique indie games and exclusive in-game items that bring your adventures to life.
          </div>
        </div>

        <div
          className="flex flex-col items-center justify-items-center min-h-screen  pb-20 gap-16 p-20  border border-yellow-600"
          style={{
            backgroundImage: `url(${firebaseImageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          < HomeDeatailsBox/>
          {/* <div className='border flex flex-row  justify-between text-white border-red-500 gap-5 mt-24'>
            <div className='border-2 border-x-white bg-lime-900 bg-opacity-70 hover:bg-opacity-90 flex flex-row w-1/2 p-6 gap-5'>
              <div className='w-1/3'>image here</div>
              <div className='flex flex-col'>
                <div className='text-[1.4rem]'>Games: Play Beyond Imagination</div>
                <div className='text-[1.2rem]'>"Crafting Worlds, One Pixel at a Time"</div>
                <div>Step into a world where every pixel tells a story.
                  Explore our collection of handcrafted indie games, designed to bring out the nostalgia of
                  classic gaming while incorporating modern creativity.</div>
              </div>
            </div>
            <div>box2</div>
          </div> */}
        </div>

        <div>dsaasdasd</div>
      </div>
    </div>

  );
}
