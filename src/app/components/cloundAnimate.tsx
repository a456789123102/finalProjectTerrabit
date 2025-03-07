const CloudAnimation = () => {
    return (
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute top-4 left-[-150px] z-10 animate-sun w-[250px] opacity-100">
          <img src="/images/sun.png" alt="sun" className="w-full h-auto" />
        </div>
        {/* เมฆซ้าย */}
        <div className="absolute top-20 left-[-150px] animate-cloud w-[250px] opacity-90">
          <img src="/images/cloud2.png" alt="Cloud" className="w-full h-auto" />
        </div>
  
        {/* เมฆขวา */}
        <div className="absolute top-60 right-[-150px] animate-cloud-fast w-[180px] opacity-90">
          <img src="/images/cloud2.png" alt="Cloud" className="w-full h-auto" />
        </div>
      </div>
    );
  };
  
  export default CloudAnimation;
  