// app/pages/problemset/problem/[id]/index.tsx
"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
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
    const id = "667d5019f77920b6cbc50602";
    const router = useRouter();
    const [problem , setProblem] = useState<ProblemType>();
    const [canEdit , setcanEdit] = useState<boolean>(false);
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
        <div className="h-screen border-b bg-zinc-900 pt-8 px-4 text-white min-h-screen grid grid-cols-2">
            <div className="border-r px-2">
                <div className="text-3xl font-bold mb-16 flex justify-between">
                    <div>{problem?.Title}</div>
                        <div className="text-lg font-normal mt-1">{problem?.Deficulty}</div>
                    <div className={`${canEdit?"flex":"hidden"} text-lg font-normal mr-6 space-x-3`}>
                        <button onClick={()=>router.push("/problemset/editproblem")} className="active:border px-2 py-1 rounded-lg bg-blue-600">Edit</button>
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
            <div>hii</div>
        </div>
    );
}
