"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ProblemType{
    id: Number,
    status: String,
    title: String,
    difficulty: String,
    accept: String
}


export default function Page() {
    var it = 0;
    const router = useRouter();
    const [Admin, setAdmin] = useState<string>("false");
    const [status, setStatus] = useState<string>("All");
    const [difficulty, setDifficulty] = useState<string>("All");
    const [searchProb, setSearchProb] = useState<string>("");
    const [filterProblem, setFilterProblem] = useState<ProblemType[]>([]);
    const [AllProblem, setAllProblem] = useState<ProblemType[]>([
        {
            id: 1,
            status: "Solved",
            title: "Sum of Square Numbers",
            difficulty: "Medium",
            accept: "35.6%"
        },
        {
            id: 2,
            status: "Solved",
            title: "Sum of Square Numbers",
            difficulty: "Medium",
            accept: "35.6%"
        },
        {
            id: 3,
            status: "Attempted",
            title: "Sum of cube Numbers",
            difficulty: "Hard",
            accept: "35.6%"
        },
        {
            id: 4,
            status: "Unsolved",
            title: "Sub of Square Numbers",
            difficulty: "Easy",
            accept: "35.6%"
        },
    ]);
    useEffect(() => {
        const token = localStorage.getItem("Token");
        const admin = localStorage.getItem("Admin");
        if(admin === "true"){
            setAdmin("true");
        }
        else{
            setAdmin("false");
        }
        if(token == null){
            router.push("/")
        }
        let filteredProblems = AllProblem;
        if (searchProb) {
            filteredProblems = filteredProblems.filter(problem =>
                problem.title.toLowerCase().includes(searchProb.toLowerCase())
            );
        }

        if (status !== "All") {
            filteredProblems = filteredProblems.filter(problem => problem.status === status);
        }

        if (difficulty !== "All") {
            filteredProblems = filteredProblems.filter(problem => problem.difficulty === difficulty);
        }

        setFilterProblem(filteredProblems);
    }, [status, difficulty, searchProb, Admin, AllProblem]);

    return (
        <div className="bg-slate-700">
            <div className="h-screen bg-zinc-900 mx-32 max-lg:mx-10 border-b overflow-y-auto pt-10">
                {/* filter component */}
                <div className="mb-10 px-6 flex">
                    <select onChange={(e) => setStatus(e.target.value)} className="text-white bg-slate-800 px-2 py-2 border rounded-lg focus:outline-none mr-6">
                        <option value={"All"}>Status</option>
                        <option value={"Solved"} className="text-green-700">Solved</option>
                        <option value={"Unsolved"} className="text-red-700">Unsolved</option>
                        <option value={"Attempted"} className="text-yellow-600">Attempted</option>
                    </select>
                    <select onChange={(e) => setDifficulty(e.target.value)} className="text-white bg-slate-800 px-2 py-2 border rounded-lg focus:outline-none mr-6">
                        <option value={"All"}>Difficulty</option>
                        <option value={"Easy"} className="text-green-700">Easy</option>
                        <option value={"Medium"} className="text-yellow-600">Medium</option>
                        <option value={"Hard"} className="text-red-700">Hard</option>
                    </select>
                    <input onChange={(e) => setSearchProb(e.target.value)} className="bg-transparent border focus:outline-none text-white px-2 py-2 rounded-lg w-[250px]" placeholder="Search..." />
                    <button onClick={()=>{router.push("/problemset/setproblem")}} className={`${(Admin === "true") ? "flex" : "hidden"} ml-4 border text-white px-4 py-2 rounded-lg`}>Add Problem +</button>
                </div>
                {/* title */}
                <div className="border-b grid grid-cols-6 text-slate-400 shadow-lg shadow-slate-600 mb-10">
                    <div className="col-span-1 px-4 py-2">Status</div>
                    <div className="col-span-3 px-4 py-2">Title</div>
                    <div className="col-span-1 px-4 py-2">Difficulty</div>
                    <div className="col-span-1 px-4 py-2">Acceptance</div>
                </div>
                {/* question grid */}
                {filterProblem.map(prob => (
                    <Problem
                        key={it++}
                        id={prob.id}
                        status={prob.status}
                        title={prob.title}
                        difficulty={prob.difficulty}
                        accept={prob.accept}
                    />
                ))}
            </div>
        </div>
    );
}


function Problem({ status, title, difficulty, accept}: ProblemType) {
    const router = useRouter();
    return (
        <div className="border-b shadow-sm shadow-white grid grid-cols-6 text-white mx-4">
            <div className={`col-span-1 px-4 py-6 ${status === "Solved" ? "text-green-700" : status === "Unsolved" ? "text-red-700" : "text-yellow-600"}`}>{status}</div>
            <div className="col-span-3 px-4 py-6">
                <button onClick={() => { router.push("/problemset/problem") }}>{title}</button>
            </div>
            <div className={`col-span-1 px-4 py-6 ${difficulty === "Easy" ? "text-green-700" : difficulty === "Hard" ? "text-red-700" : "text-yellow-600"}`}>{difficulty}</div>
            <div className="col-span-1 px-4 py-6">{accept}</div>
        </div>
    );
}
