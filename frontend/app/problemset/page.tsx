"use client"

import ProblemLoader from "@/components/ProblemLoader";
import { adminState, logedinState } from "@/state/atom";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

interface ProblemType{
    id: Number,
    status: String,
    title: String,
    difficulty: String,
    accept: Number
}


export default function Page() {
    var it = 0;
    const router = useRouter();
    // const [Admin, setAdmin] = useState<string>("false");
    const [status, setStatus] = useState<string>("All");
    const [difficulty, setDifficulty] = useState<string>("All");
    const [searchProb, setSearchProb] = useState<string>("");
    const [filterProblem, setFilterProblem] = useState<ProblemType[]>([]);
    const [AllProblem, setAllProblem] = useState<ProblemType[]>([])
    const Admin = useRecoilValue(adminState);
    const logedIn = useRecoilValue(logedinState);

    useEffect(() => {
        const token = localStorage.getItem("Token") || "";
        if(!token){
            router.push("/")
            // alert("Loged in failed")
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
    }, [status, difficulty, searchProb, Admin, AllProblem, logedIn]);

    useEffect(()=>{
        async function fetchdata (){
            const response1 = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/problem/allproblem`)
            const response2 = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/problemstatus`, {
                headers: {
                Token: localStorage.getItem("Token") 
            }});
            const FetchProblems = response1.data.Problems;
            const UserProblemsolved = response2.data.ProblemSolved;
            var Problems =[];
            for(var i = 0 ; i < FetchProblems.length ; i++){
                var problemStatus = "Unsolved";
                for(var j = 0 ; j < UserProblemsolved.length ; j++){
                    if(UserProblemsolved[j] === FetchProblems[i]._id){
                        problemStatus = "Solved";
                        break;
                    }
                }

                let Accept = 0;
                if(FetchProblems[i].TotalSubmit.length > 0){
                    let count = 0;
                    for(let j = 0 ; j < FetchProblems[i].TotalSubmit.length ; j++){
                        if( FetchProblems[i].TotalSubmit[j].status === "success"){
                            count++;
                        }
                    }
                    Accept = (count* 100)/FetchProblems[i].TotalSubmit.length;
                    Accept = Math.floor(Accept);
                }

                var problem:ProblemType = {
                    id : FetchProblems[i]._id,
                    title : FetchProblems[i].Title,
                    difficulty : FetchProblems[i].Deficulty,
                    accept: Accept,
                    status : problemStatus
                }
                // console.log(problem);
                Problems.push(problem);
            }
            setAllProblem(Problems);
        }
        fetchdata();
    },[Admin, logedIn])

    return (
        <div className="bg-slate-700">
            <div className="h-screen bg-zinc-900 mx-32 max-lg:mx-10 border-b overflow-y-auto pt-10 ">
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
                    <button onClick={()=>{router.push("/problemset/setproblem")}} className={`${(Admin) ? "flex" : "hidden"} ml-4 border text-white px-4 py-2 rounded-lg`}>Add Problem +</button>
                </div>
                {/* title */}
                <div className="border-b grid grid-cols-6 text-slate-400 shadow-lg shadow-slate-600 mb-10">
                    <div className="col-span-1 px-4 py-2">Status</div>
                    <div className="col-span-3 px-4 py-2">Title</div>
                    <div className="col-span-1 px-4 py-2">Difficulty</div>
                    <div className="col-span-1 px-4 py-2">Acceptance</div>
                </div>
                {/* question grid */}
                <div>
                    {(filterProblem.length == 0)?
                    <div> <ProblemLoader /></div>
                    :<div>
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
                    </div>}
                </div>
            </div>
        </div>
    );
}


function Problem({ status, title, difficulty, accept, id}: ProblemType) {
    const router = useRouter();
    return (
        <div className="border-b shadow-sm shadow-white grid grid-cols-6 text-white mx-4">
            <div className={`col-span-1 px-4 py-6 ${status === "Solved" ? "text-green-700" : status === "Unsolved" ? "text-red-700" : "text-yellow-600"}`}>{status}</div>
            <div className="col-span-3 px-4 py-6">
                <button className="hover:text-blue-600" onClick={() => { router.push(`/problemset/problem/${id}`) }}>{title}</button>
            </div>
            <div className={`col-span-1 px-4 py-6 ${difficulty === "Easy" ? "text-green-700" : difficulty === "Hard" ? "text-red-700" : "text-yellow-600"}`}>{difficulty}</div>
            <div className="col-span-1 px-4 py-6">{accept.toString()+` %`}</div>
        </div>
    );
}
