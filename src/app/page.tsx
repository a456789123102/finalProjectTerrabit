import Nav from './components/nav';

export default function Home() {
  return (
<div>
<Nav/>
<div className="flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-[#93B1A6] text-[#040D12]">
      <div>
      Welcome page: This is my final Project
      </div>
<div>
<div className='text-3xl'>Font Usage</div>
<div className="font-pixelify">1.Pixelify "hello"</div>
<div className="font-poppins">2.Poppins "hello"</div>
</div>
    </div>
</div>
  );
}
