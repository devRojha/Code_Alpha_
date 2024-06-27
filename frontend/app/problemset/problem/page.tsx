// app/pages/problemset/problem/[id]/index.tsx
"use client"

import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface ProblemType{
    _id: String,
    Title: String,
    Deficulty: String,
    Description: String,
    Constraint : String,
    AdminId: String,
}
export default function Page() {
    const parms = useSearchParams().toString();
    const id = parms.substring(3);
    const router = useRouter();
    const [problem , setProblem] = useState<ProblemType>();
    const [canEdit , setcanEdit] = useState<boolean>(false);
    const [input , setInput] = useState<boolean>(true);
    const [output , setOutput] = useState<boolean>(false);
    const [verdic , setVerdic] = useState<boolean>(false);
    const [inputData , setInputData] = useState<string>("");
    const [outputData , setOutputData] = useState<string>("Output");
    const [verdicData , setVerdicData] = useState<string>("Verdic");
    const [lang , setLang] = useState<string>("c++")

    useEffect(()=>{
        const getProblem = async ()=>{
            try{
                const response = await axios("http://localhost:3000/api/problem/problembyid",{
                    headers :{
                        Token : localStorage.getItem("Token"),
                        id : id
                    }
                })
                setProblem(response.data.problem);
                const Admin = localStorage.getItem("Admin")
                if(response.data.Edit === "true" && Admin === "true"){
                    setcanEdit(true);
                }
            }
            catch(e){
                console.log(e);
            }
        }
        getProblem();
    },[id])

    return (
        <div className="border-b bg-zinc-900 pt-8 px-4 text-white min-h-screen grid grid-cols-2 max-lg:grid-cols-1">
            {/* problem  */}
                <div className="overflow-y-auto border-r h-full px-2 border-b max-lg:border-r-0 ">
                    <div className="text-3xl font-bold mb-16 flex justify-between overflow-auto">
                        <div>{problem?.Title}</div>
                            <div className="text-lg font-normal mt-1">{problem?.Deficulty}</div>
                        <div className={`${canEdit?"flex":"hidden"} text-lg font-normal mr-6 space-x-3`}>
                            <button onClick={()=>router.push(`/problemset/editproblem?id=${id}`)} className="active:border px-2 py-1 rounded-lg bg-blue-600">Edit</button>
                            <button onClick={async ()=>{
                                await axios.delete("http://localhost:3000/api/problem/deleteproblem",{
                                    headers:{
                                        Token : localStorage.getItem("Token"),
                                        id : id
                                    }
                                })
                                router.push("/problemset")
                            }} className="active:border px-2 py-1 bg-red-600 rounded-lg">Delete</button>
                        </div>
                    </div>
                    <p className="flex mb-4">{problem?.Description}</p>
                    <div className="flex mb-4">{problem?.Constraint}</div>
            </div>
            {/* compiler  */}
            <div className="">
                <div className="h-10 bg-zinc-600 flex justify-between py-1 px-8">
                    <div className="h-full space-x-4 ">
                        <button className="h-full bg-blue-700 hover:bg-blue-800 active:text-black border rounded-lg px-2 py-1">Run</button>
                        <button className="h-full hover:bg-green-700 active:text-black border rounded-lg px-2 py-1 bg-green-600">Submit</button>
                    </div>
                    <select onChange={(e)=>setLang(e.target.value)} className="border px-2 py-1 rounded-lg bg-transparent focus:outline-none">
                        <option value={"c++"}>C++</option>
                        <option value={"java"}>JAVA</option>
                        <option value={"python"}>PYTHON</option>
                    </select>
                </div>
                <div className=" bg-zinc-600  px-6 pb-6 pt-0 h-[700px]">
                    <div className=" bg-zinc-800 w-full h-full p-4 overflow-auto">
                    </div>
                </div>
                <div className=" h-[350px]">
                    <div className="text-md font-bold ml-6 py-2 flex justify-around">
                        <button onClick={()=>{
                            setInput(true); setOutput(false); setVerdic(false);
                            }} className={`${input?"border-b text-blue-500":"text-white"}`}>INPUT</button>
                        <button onClick={()=>{
                            setInput(false); setOutput(true); setVerdic(false);
                            }} className={`${output?"border-b text-blue-500":"text-white"}`}>OUTPUT</button>
                        <button onClick={()=>{
                            setInput(false); setOutput(false); setVerdic(true);
                            }} className={`${verdic?"border-b text-blue-500":"text-white"}`}>VERDICT</button>
                    </div>
                    <textarea onChange={(e)=>{setInputData(e.target.value)}} className={`${input?"":"hidden"} bg-zinc-800 w-full h-[305px]  p-4 overflow-auto focus:outline-none`} placeholder="write input here..."/>
                    <div className={`${output?"":"hidden"} bg-zinc-800 w-full h-[305px]  p-4 overflow-auto`}>
                        {outputData}
                    </div>
                    <div className={`${verdic?"":"hidden"} bg-zinc-800 w-full h-[305px]  p-4 overflow-auto`}>
                        {verdicData}
                    </div>
                </div> 
            </div>
        </div>
    );
}

