"use client"
import Image from "next/image";
import { useEffect, useState } from "react";


export default function Page(){
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
        <div className="px-20 bg-zinc-800 pt-20 text-white">
            <div className=" py-5 text-white mb-12">
                <div className="text-3xl font-semibold mb-8 ml-4 text-white">About Online Judge</div>
                <div className="grid grid-cols-2 space-x-2">
                    <div className="pt-10 text-justify pr-8 text-md">
                        <AboutCompo 
                            title={"Code Compilation and Execution"}
                            para={"Online Judge provides a seamless environment where you can write, compile, and run your code effortlessly. Our intuitive interface ensures you spend more time coding and less time dealing with setup and configuration."}
                        />
                        <AboutCompo
                            title={"College Contests"}
                            para={"Teams can organize and participate in college contests easily. Our platform supports comprehensive contest management, allowing you to challenge your peers and test your skills in a competitive setting."}
                        />
                        <AboutCompo
                            title={"Problem Sheets"}
                            para={"Explore a curated collection of problem sheets designed to challenge and improve your coding abilities. From beginner to advanced levels, our problems cover a wide range of topics to help you grow as a programmer."}
                        />
                        <AboutCompo
                            title={"Progress Tracking"}
                            para={"Monitor your progress over time with our detailed tracking features. Celebrate your achievements and identify areas for improvement, ensuring continuous growth and development in your coding journey."}
                        />
                    </div>
                    <div className="rounded-lg p-5 h-[450px] shadow-lg shadow-black bg-zinc-800">
                        <Image className="h-full w-full border rounded-lg bg-black overflow-hidden" src={photo} alt="Loading..." width={2000} height={2000}/>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-4 space-x-2 pb-8">
                <Image className="rounded-lg col-span-1 h-[300px] w-[300px] object-cover border" src={"/owner.jpg"} alt="Loading..." width={3000} height={3000}/>
                <div className="col-span-3">
                    <div className="mb-4 text-2xl text-zinc-400 font-semibold">Ownership</div>
                    <div className="ml-4 text-1xl font-bold mb-4">DEVRAJ KUMAR</div>
                    <p className="ml-6 text-white">Hollaa..</p>
                    <p className="ml-6 text-slate-400">I am a Prefinal Year Student in National Institute of Technology, Patna in the Department of Electrical Engineering</p>
                </div>
            </div>
        </div>
    )
}

function AboutCompo({title, para}){
    return (
        <div className="mb-10">
            <div className="text-lg font-semibold mb-2">{title}</div>
            <div className="text-slate-300">{para}</div>
        </div>
    )
}