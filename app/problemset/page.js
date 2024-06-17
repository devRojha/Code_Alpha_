"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Page(){
    const [status , setStatus] = useState("All")
    const [difficult , setDefficult] = useState("All")
    const [searchProb , setSearchProb] = useState("");
    const [filterProblem , setFilterProblem] = useState([]);
    const [AllProblem, SetAllProblem] = useState([
        {
            id:1,
            status: "Solved",
            title: "Sum of Square Numbers",
            difficulty: "Medium",
            accept: "35.6%"
        },
        {
            id:2,
            status: "Solved",
            title: "Sum of Square Numbers",
            difficulty: "Medium",
            accept: "35.6%"
        },
        {
            id:3,
            status: "Attempted",
            title: "Sum of cube Numbers",
            difficulty: "Hard",
            accept: "35.6%"
        },
        {
            id:4,
            status: "Unsolved",
            title: "Sub of Square Numbers",
            difficulty: "Easy",
            accept: "35.6%"
        },
    ])

    // filtering 
    useEffect(()=>{
        if(searchProb.length > 0){
            const filter1 = [];
            for(var i = 0 ; i < AllProblem.length ; i++){
                const str = AllProblem[i].title.toLocaleLowerCase();
                console.log(searchProb.toLocaleLowerCase());
                if(str.includes(searchProb.toLocaleLowerCase())){
                    filter1.push(AllProblem[i]);
                }
            }
            setFilterProblem(filter1);
        }
        else if(status === "All" && difficult === "All"){
            setFilterProblem(AllProblem);
        }
        else{
            if(status != "All" && difficult != "All"){
                var filter1 = AllProblem.filter(item => (item.difficulty === difficult));
                filter1 = filter1.filter(item=> (item.status === status));
                setFilterProblem(filter1);
            }
            else{
                if(status != "All"){
                    var filter1 = AllProblem.filter(item=> (item.status === status));
                    setFilterProblem(filter1);
                }
                else{
                    var filter1 = AllProblem.filter(item => (item.difficulty === difficult));
                    setFilterProblem(filter1);
                }
            }
        }
    },[status, difficult, searchProb])

    return (
        <div className="bg-slate-700">
            <div className="h-screen bg-zinc-900 mx-32 max-lg:mx-10 border-b overflow-y-auto pt-10">
                {/* filter component  */}
                <div className="mb-10 px-6 flex">
                    <select onChange={(e) => setStatus(e.target.value)} className="text-white bg-slate-800 px-2 py-2 border rounded-lg focus:outline-none mr-6">
                        <option value={"All"}>Status</option>
                        <option value={"Solved"} className="text-green-700">Solved</option>
                        <option value={"Unsolved"} className="text-red-700">Unsolved</option>
                        <option value={"Attempted"} className="text-yellow-600">Attempted</option>
                    </select>
                    <select onChange={(e) => setDefficult(e.target.value)} className="text-white bg-slate-800 px-2 py-2 border rounded-lg focus:outline-none mr-6">
                        <option value={"All"}>Difficulty</option>
                        <option value={"Easy"} className="text-green-700">Easy</option>
                        <option value={"Hard"} className="text-red-700">Hard</option>
                        <option value={"Medium"} className="text-yellow-600">Medium</option>
                    </select>
                    <input onChange={(e)=> setSearchProb(e.target.value)} className="bg-transparent border focus:outline-none text-white px-2 py-2 rounded-lg w-[250px]" placeholder="Search..."/>
                </div>
                {/* title  */}
                <div className="border-b grid grid-cols-6 text-slate-400 shadow-lg shadow-slate-600 mb-10">
                    <div className="col-span-1 px-4 py-2">Status</div>
                    <div className="col-span-3 px-4 py-2">Title</div>
                    <div className="col-span-1 px-4 py-2">Difficulty</div>
                    <div className="col-span-1 px-4 py-2">Acceptance</div>
                </div>
                {/* question grid  */}
                {filterProblem.map(prob =>{
                    return (
                        <Problem 
                            key={prob.id}
                            id={prob.id}
                            status={prob.status}
                            title={prob.title}
                            difficulty={prob.difficulty}
                            accept={prob.accept}
                        />
                    )
                })}
            </div>
        </div>
    )
}

function Problem({status, title, difficulty, accept}){
    const router = useRouter();
    return (
        <div className="border-b shadow-sm shadow-white grid grid-cols-6 text-white  mx-4">
            <div className={`col-span-1 px-4 py-6 ${(status === "Solved")?"text-green-700":(status === "Unsolved")?"text-red-700":"text-yellow-600"}`}>{status}</div>
            <div className={`col-span-3 px-4 py-6`}><button onClick={()=>{router.push("/problemset/problem")}}>{title}</button></div>
            <div className={`col-span-1 px-4 py-6 ${(difficulty === "Easy")?"text-green-700":(difficulty === "Hard")?"text-red-700":"text-yellow-600"}`}>{difficulty}</div>
            <div className={`col-span-1 px-4 py-6`}>{accept}</div>
        </div>
    )
}