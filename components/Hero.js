"use client"
import Image from "next/image";
import Laptop from "./Laptop";
import { useEffect, useState } from "react";
import Clickme from "./Clickme";


export default function Hero(){
    return <>
      <Hero1 />
      <Hero2 />
    </>
}

function Hero1(){
  return (
    <div className="max-lg:hidden">
          <Laptop />
        <div className="h-screen w-full z-20">
          <div className="h-[60%] bg-zinc-900 text-white">
            <div className=" h-full flex flex-col justify-end pb-20">
              <div className="grid grid-cols-2">
                <div></div>
                <div className="w-full flex justify-center">
                  <div className="flex flex-col space">
                    <div className="text-slate-600 text-3xl font-bold">Need a cool compiler..?</div>
                    <Clickme />
                    {/* <div className="mt-20 text-green-700 text-3xl font-bold"></div> */}
                  </div>
                </div>
              </div>
            </div>
          </div> 
        </div>
      </div>
  )
}

function Hero2(){
    const [photo, setPhoto] = useState("/code2.png")
    const [it , setIt] = useState(0);
    const dPhoto = ["/code.png", "/code2.png"];
    useEffect(()=>{
        const interval = setInterval(()=>{
            setPhoto(dPhoto[it]);
            setIt(it+1);
            if(it === dPhoto.length){
                setIt(0);
                setPhoto(dPhoto[0]);
            }
        },3000);
        return () => clearInterval(interval);
    },[it,photo])
  return (
    <div className="hidden max-lg:flex flex-col bg-zinc-900 text-white">
      <div className="w-full flex justify-end pr-4 py-20">
        <div className="flex flex-col space">
          <div className="text-slate-600 text-3xl max-sm:text-[24px] font-bold">Need a cool compiler..?</div>
          <Clickme />
          {/* <div className="mt-20 text-green-700 text-3xl font-bold"></div> */}
        </div>
      </div>
      <div className="pb-20 h-[250px] bg-slate-100">
        <div className="absolute max-sm:relative top-40 max-sm:top-2 left-[-25px] rounded-lg p-5 h-[450px] max-md:h-[400px] w-[50%] max-sm:w-[80%] max-sm:h-[300px] shadow-lg shadow-black bg-zinc-800">
            <Image className="h-full w-full border rounded-lg bg-black overflow-hidden" src={photo} alt="Loading..." width={2000} height={2000}/>
        </div>
      </div>
    </div>
  )
}