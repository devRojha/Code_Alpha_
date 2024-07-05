"use client"

import { adminState } from "@/state/atom";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import { useRecoilValue } from "recoil";



export default function Page(){
    const router = useRouter();
    const [Title , setTitle] = useState<string>("");
    const [Description , setDescription] = useState<string>("");
    const [Deficulty , setDeficulty] = useState<string>("Easy");
    const [Constraint , setConstraint] = useState<string>("");
    const [Example , setExample] = useState<string>("");
    const [Company , setCompany] = useState<string>("");
    const [Topic , setTopic] = useState<string>("");
    const admin = useRecoilValue(adminState);
    useEffect(()=>{
        const token = localStorage.getItem("Token");
        if(!token){
            router.push("/problemset");
        }
    },[])

    return (
        <div className="bg-zinc-900 pt-8 text-white px-8 border-b">
            <div className="text-3xl font-bold mb-10">Set your Problem</div>
            <div className=" flex mb-10 max-md:flex-col">
                <label className="text-2xl max-md:text-lg">Set Title</label>
                <input onChange={(e)=>{setTitle(e.target.value)}} className="ml-8 max-md:mx-0 max-md:my-4 py-3 px-2 border rounded-lg text-black text-2xl w-[40%] max-md:w-[80%] focus:outline-none" placeholder="Title of the Question"/>
            </div>
            <div className="flex mb-10">
                <div className="text-2xl max-md:text-lg mr-4">Set deficulty Level : </div>
                <select onChange={(e)=> setDeficulty(e.target.value)} className="text-2xl max-md:text-lg text-black focus:outline-none px-2 py-1 rounded-lg">
                    <option value={"Easy"}>Easy</option>
                    <option value={"Medium"}>Medium</option>
                    <option value={"Hard"}>Hard</option>
                </select>
            </div>
            <div className="flex mb-10 max-md:flex-col">
                <label className="text-2xl max-md:text-lg">Set Description</label>
                <textarea onChange={(e)=>{
                    setDescription(e.target.value)
                }}  className="ml-8 max-md:mx-0 max-md:my-4 py-3 px-2 border rounded-lg text-black text-2xl w-[50%] max-lg:w-[70%]  max-md:w-[95%] h-[300px] focus:outline-none" placeholder="Type Description here..."/>
            </div>
            <div className="flex mb-10 max-md:flex-col">
                <label className="text-2xl max-md:text-lg">Set Constraint</label>
                <textarea onChange={(e)=>{setConstraint(e.target.value);}} className="max-md:mx-0 max-md:my-4 ml-8 py-3 px-2 border rounded-lg text-black text-2xl w-[50%] max-lg:w-[70%] max-md:w-[95%] h-[300px] focus:outline-none" placeholder="Type constraint here..."/>
            </div>
            <div className="flex mb-10 max-md:flex-col">
                <label className="text-2xl max-md:text-lg">Set Example</label>
                <textarea onChange={(e)=>{setExample(e.target.value);}} className="max-md:mx-0 max-md:my-4 ml-8 py-3 px-2 border rounded-lg text-black text-2xl w-[50%] max-lg:w-[70%] max-md:w-[95%] h-[300px] focus:outline-none" placeholder="Type constraint here..."/>
            </div>
            <div className="flex mb-10 max-md:flex-col">
                <label className="text-2xl max-md:text-lg">Set Topic</label>
                <input onChange={(e)=>{setTopic(e.target.value);}} className="max-md:mx-0 max-md:my-4 ml-8 py-3 px-2 border rounded-lg text-black text-2xl w-[50%] max-lg:w-[70%] max-md:w-[95%] focus:outline-none" placeholder="Type constraint here..."/>
            </div>
            <div className="flex mb-10 max-md:flex-col">
                <label className="text-2xl max-md:text-lg">Set Company</label>
                <input onChange={(e)=>{setCompany(e.target.value);}} className="max-md:mx-0 max-md:my-4 ml-8 py-3 px-2 border rounded-lg text-black text-2xl w-[50%] max-lg:w-[70%] max-md:w-[95%] focus:outline-none" placeholder="Type constraint here..."/>
            </div>
            <div className="pb-10">
                <button onClick={()=>{
                    if(admin === false){
                        router.push("/");
                        alert("Not an admin");
                    }
                    else{
                        try{
                            axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/problem/setproblem`,{
                                Title,
                                Description,
                                Deficulty,
                                Constraint,
                                Example, 
                                Company, 
                                Topic,
                            }, {
                                headers: {
                                    Token: localStorage.getItem("Token")
                                }
                            })
                            alert("Problem Added");
                        }
                        catch(e){
                            console.log(e);
                        }
                    }
                }} className="px-3 py-1 border rounded-lg text-2xl hover:border-blue-800 active:text-blue-800">ADD</button>
            </div>
        </div>
    )
}