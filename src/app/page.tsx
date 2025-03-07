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
    <div className="relative min-h-screen bg-blue-400 font-pixelify">
      <Nav />
      <CloudAnimation />

      {/* Content */}
      <div className="flex flex-col w-full relative z-10">
        <div className=" flex flex-col items-center justify-center mt-7 py-12 gap-8 text-center">
          <Image src={sLogo} alt="Logo" width={800} height={800} />
          <Image src={Quote1} alt="Quote" width={800} height={800} />
          <div className=" text-slate-50 w-1/2 text-[1.4rem]">
            Every pixel tells a story. Discover unique indie games and exclusive in-game items that bring your adventures to life.
          </div>
        </div>

        <div
          className="flex flex-col items-center justify-items-center min-h-screen  pb-20 gap-16 p-20"
          style={{
            backgroundImage: `url(${firebaseImageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          < HomeDeatailsBox/>
        </div>

        <div className='bg-black'>dsaasdasd</div>
      </div>
    </div>

  );
}
