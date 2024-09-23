import Nav from './components/nav';

export default function Home() {
  return (
<div>
<Nav/>
<div className="flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-[#93B1A6] text-[#040D12]">
      <div>
      Welcome page: This is my final Project
      </div>
      <div>Font Usage1:<div className="font-pixelify">Pixelify</div></div>
      <div>go to ... page</div>
    </div>
</div>
  );
}
