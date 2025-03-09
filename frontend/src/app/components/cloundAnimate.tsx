import Image from "next/image";

const CloudAnimation = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
      {/* ดวงอาทิตย์ */}
      <div className="absolute top-4 left-[-150px] z-10 animate-sun w-[250px] opacity-100">
        <Image
          src="/images/sun.png"
          alt="Sun"
          width={250}
          height={250}
          className="w-full h-auto"
          priority // โหลดเร็วขึ้น
        />
      </div>

      {/* เมฆซ้าย */}
      <div className="absolute top-20 left-[-150px] animate-cloud w-[250px] opacity-90">
        <Image
          src="/images/cloud2.png"
          alt="Cloud"
          width={250}
          height={150}
          className="w-full h-auto"
        />
      </div>

      {/* เมฆขวา */}
      <div className="absolute top-60 right-[-150px] animate-cloud-fast w-[180px] opacity-90">
        <Image
          src="/images/cloud2.png"
          alt="Cloud"
          width={180}
          height={120}
          className="w-full h-auto"
        />
      </div>
    </div>
  );
};

export default CloudAnimation;
