"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function About(){
    const router = useRouter();
    const [photo, setPhoto] = useState<string>("/code2.png")
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
        <div className="bg-zinc-800 px-20 max-lg:px-4 py-10 max-sm:pt-20 text-white">
            <div className="text-3xl max-sm:text-2xl font-semibold mb-8 ml-4">About</div>
            <div className="grid grid-cols-2 max-md:grid-cols-1 space-x-2">
                <div className="pt-20 max-md:py-4 text-justify pr-8 max-md:pr-0 text-md max-sm:text-[12px]">Online Judge provides a seamless environment to write, compile, and run your code effortlessly. Organize and participate in college contests, challenging your skills in a competitive setting. Access a curated collection of problem sheets to enhance your coding abilities across various topics. Track your progress, celebrate achievements, and identify areas for improvement. Whether you're an individual learner or part of a team, Online Judge supports your journey to coding excellence. <button onClick={()=>router.push("/about")}  className="text-blue-600">more...</button></div>
                <div className="rounded-lg p-5 h-[450px] max-sm:h-[300px] shadow-lg shadow-black bg-zinc-800">
                    <Image className="h-full w-full border rounded-lg bg-black overflow-hidden" src={photo} alt="Loading..." width={2000} height={2000}/>
                </div>
            </div>
      </div>
    )
}