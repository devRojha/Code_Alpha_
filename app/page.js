
import Laptop from "@/components/Laptop";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <Laptop />
      <div className="h-screen w-full z-10">
        <div className="h-[50%] bg-zinc-900">hii</div> 
      </div>
    </div>
  );
}
