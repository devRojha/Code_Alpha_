"use client"

import axios from "axios";
import { useState } from "react"



export default function Page(){
    const [Title , setTitle] = useState<string>("");
    const [Description , setDescription] = useState<string>("descreption1");
    const [Deficulty , setDeficulty] = useState<string>("Easy");
    const [Constraint , setConstraint] = useState<string>("");



    return (
        <div className="bg-zinc-900 pt-8 text-white px-8 border-b">
            <div className="text-3xl font-bold mb-10">Set your Problem</div>
            <div className="mb-10">
                <label className="text-2xl">Set Title</label>
                <input onChange={(e)=>{setTitle(e.target.value)}} className="ml-8 py-3 px-2 border rounded-lg text-black text-2xl w-[40%] focus:outline-none" placeholder="Title of the Question"/>
            </div>
            <div className="flex mb-10">
                <div className="text-2xl mr-4">Set deficulty Level : </div>
                <select onChange={(e)=> setDeficulty(e.target.value)} className="text-2xl text-black focus:outline-none px-2 py-1 rounded-lg">
                    <option value={"Easy"}>Easy</option>
                    <option value={"Medium"}>Medium</option>
                    <option value={"Hard"}>Hard</option>
                </select>
            </div>
            <div className="flex mb-10">
                <label className="text-2xl">Set Description</label>
                <textarea onChange={(e)=>{
                    setDescription(e.target.value)
                    console.log(Description)
                }} className="ml-8 py-3 px-2 border rounded-lg text-black text-2xl w-[50%] h-[300px] focus:outline-none" placeholder="Type Description here..."/>
            </div>
            <div className="flex mb-10">
                <label className="text-2xl">Set Constraint</label>
                <textarea onChange={(e)=>{setConstraint(e.target.value);}} className="ml-8 py-3 px-2 border rounded-lg text-black text-2xl w-[50%] h-[300px] focus:outline-none" placeholder="Type constraint here..."/>
            </div>
            <div className="pb-10">
                <button onClick={async ()=>{
                    await axios.post("http://localhost:3000/api/problem/setProblem",{
                        headers: {
                            Token : localStorage.getItem("Token")
                        },
                        body:{
                            Title,
                            Description,
                            Deficulty,
                            Constraint
                        }
                    })
                }} className="px-3 py-1 border rounded-lg text-2xl hover:border-blue-800 active:text-blue-800">ADD</button>
            </div>
        </div>
    )
}