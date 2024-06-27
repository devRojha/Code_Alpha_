"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

interface ProblemType{
    _id: String,
    Title: String,
    Deficulty: String,
    Description: String,
    Constraint : String,
    AdminId: String,
}

export default function Page(){
    const router = useRouter();
    const id = "667d5019f77920b6cbc50602"; //from param
    const [Title , setTitle] = useState<string>("");
    const [Description , setDescription] = useState<string>("");
    const [Deficulty , setDeficulty] = useState<string>("");
    const [Constraint , setConstraint] = useState<string>("");
    const [problem , setProblem] = useState<ProblemType>();
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
                if(!(response.data.Edit === "true" && Admin === "true")){
                    router.push("/")
                }
            }
            catch(e){
                console.log(e);
            }
        }
        getProblem();
    },[id])


    return (
        <div className="bg-zinc-900 pt-8 text-white px-8 border-b">
            <div className="text-3xl font-bold mb-10">Edit your Problem</div>
            <div className=" flex mb-10 max-md:flex-col">
                <label className="text-2xl max-md:text-lg">Set Title</label>
                <input onChange={(e)=>{setTitle(e.target.value)}} className="ml-8 max-md:mx-0 max-md:my-4 py-3 px-2 border rounded-lg text-black text-2xl w-[40%] max-md:w-[80%] focus:outline-none" placeholder={`${problem?.Title}`}/>
            </div>
            <div className="flex mb-10">
                <div className="text-2xl max-md:text-lg mr-4">Set deficulty Level : </div>
                <select onChange={(e)=> setDeficulty(e.target.value)} className="text-2xl max-md:text-lg text-black focus:outline-none px-2 py-1 rounded-lg">
                    <option value={""}>Prev {problem?.Deficulty}</option>
                    <option value={"Easy"}>Easy</option>
                    <option value={"Medium"}>Medium</option>
                    <option value={"Hard"}>Hard</option>
                </select>
            </div>
            <div className="flex mb-10 max-md:flex-col">
                <label className="text-2xl max-md:text-lg">Set Description</label>
                <textarea onChange={(e)=>{
                    setDescription(e.target.value)
                }} className="ml-8 max-md:mx-0 max-md:my-4 py-3 px-2 border rounded-lg text-black text-2xl w-[50%] max-lg:w-[70%]  max-md:w-[95%] h-[300px] focus:outline-none" placeholder={`${problem?.Description}`}/>
            </div>
            <div className="flex mb-10 max-md:flex-col">
                <label className="text-2xl max-md:text-lg">Set Constraint</label>
                <textarea onChange={(e)=>{setConstraint(e.target.value);}} className="max-md:mx-0 max-md:my-4 ml-8 py-3 px-2 border rounded-lg text-black text-2xl w-[50%] max-lg:w-[70%] max-md:w-[95%] h-[300px] focus:outline-none" placeholder={`${problem?.Constraint}`}/>
            </div>
            <div className="pb-10">
                <button onClick={()=>{
                    axios.put("http://localhost:3000/api/problem/editproblem",{
                        id: id,
                        Title: (Title || problem?.Title),
                        Description: (Description || problem?.Description),
                        Deficulty : (Deficulty || problem?.Deficulty),
                        Constraint : (Constraint || problem?.Constraint),
                    }, {
                        headers: {
                            Token: localStorage.getItem("Token")
                        }
                    })
                }} className="px-3 py-1 border rounded-lg text-2xl hover:border-blue-800 active:text-blue-800">Edit</button>
            </div>
        </div>
    )
}