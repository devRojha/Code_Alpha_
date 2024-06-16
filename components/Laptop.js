"use client"
import Image from "next/image";
import { useEffect, useState } from "react";



export default function Laptop(){
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

    return <div className="">
        <Image className="z-20 max-lg:hidden absolute top-[44px] h-[740px]" src={"/laptop.png"} alt="Loading..." height={2000} width={2000} />
        <div className="z-30 max-lg:hidden  grid grid-cols-2 absolute w-full h-screen top-0 pt-40">
            <div className="col-span-1 h-[498px] border-r border-b rounded-r-lg mr-3 z-30 bg-black text-white flex flex-col justify-center">
                <div className="flex justify-center h-full">
                    <Image className="flex justify-center border-r  rounded-lg w-full" src={photo} alt="Loading..." width={400} height={400} />
                </div>
            </div>
        </div>
    </div>
}