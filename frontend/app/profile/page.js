"use client"

import { adminState } from "@/state/atom";
import axios from "axios"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import { useRecoilValue } from "recoil";


export default function Page() {
    const router = useRouter();
    const [nameEdit, setNameEdit] = useState(false);
    const [name , setName] = useState("");
    const [email , setEmail] = useState("");
    const [emailEdit, setEmailEdit] = useState(false);
    const [easy, setEasy] = useState([]);
    const [medium, setMedium] = useState([]);
    const [hard, setHard] = useState([]);
    const [easyCreate, setEasyCreate] = useState([]);
    const [hardCreate, setHardCreate] = useState([]);
    const [mediumCreate, setMediumCreate] = useState([]);
    const [user, setUser] = useState({});
    const [AllUser , setAllUser] = useState([]);
    const [TotalProblem, setTotalProblem] = useState(0);
    const [progresBar , setProgresBar] = useState(0);
    // const [admin , setAdmin] = useState(false);
    const adminatom = useRecoilValue(adminState);


    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/userProfile`, {
                    headers: {
                        Token: localStorage.getItem("Token")
                    }
                });
                setUser(response.data);

                const easyProblems = response.data.ProblemSolved?.filter(problem => problem.Deficulty === "Easy") || [];
                const mediumProblems = response.data.ProblemSolved?.filter(problem => problem.Deficulty === "Medium") || [];
                const hardProblems = response.data.ProblemSolved?.filter(problem => problem.Deficulty === "Hard") || [];

                setEasy(easyProblems);
                setMedium(mediumProblems);
                setHard(hardProblems);

                // fetchnig problem which created by adminatom
                const response1 = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/problem/allproblem`)
                const filterByAdmin = response1.data.Problems?.filter(problem => problem.AdminId === response.data._id) || [];
                const easycreate = filterByAdmin?.filter(problem => problem.Deficulty === "Easy") || [];
                const mediumcreate = filterByAdmin?.filter(problem => problem.Deficulty === "Medium") || [];
                const hardcreate = filterByAdmin?.filter(problem => problem.Deficulty === "Hard") || [];
                setEasyCreate(easycreate);
                setMediumCreate(mediumcreate);
                setHardCreate(hardcreate);


                let ResUser = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/all`,{
                    headers:{
                        Token: localStorage.getItem("Token")
                    }
                });
                const users = ResUser.data.allUsers;
                users.sort((a, b) => b.ProblemSolved.length - a.ProblemSolved.length);
                setAllUser(users);
                let allProblem = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/problem/allproblem`)
                setTotalProblem(allProblem.data.Problems.length);
                //setting progres bar %
                setProgresBar(Math.floor((response.data.ProblemSolved?.length*100)/allProblem.data.Problems.length));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, []);

    async function UpdateUser(){
        try{
            const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/userProfile/update`,{
                Name : name || "",
                Email : email || ""
            },{
                headers :{
                    Token : localStorage.getItem("Token")
                }
            })
            if(response.data.msg == "user updated"){
                alert("user updated succesfully")
            }
        }
        catch(e){
            console.log("fontError : "+e);
            alert("error while fetching");
        }
    }
    async function DeleteUser(){
        try{
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/userProfile/delete`,{
                headers:{
                    Token : localStorage.getItem("Token")
                }
            })
            if(response.data.msg === "user deleted"){
                alert("User deleted Succesfully")
                localStorage.clear();
                router.push("/");
            }
        }
        catch(e){
            console.log("fontError : "+e);
            alert("error while fetching");
        }
    }

    return (
        <div className="bg-zinc-900 min-h-screen text-white pt-10 px-8">
            <div className="space-y-8">
                <div className="grid grid-cols-7">
                    <div className="col-span-3 space-y-8">
                        <div className="text-3xl font-bold mb-8 text-green-800">Hii {user.Name}...</div>
                        <div className="space-y-8">
                            <div className="flex space-x-4">
                                <label className="font-bold">Name :</label>
                                <div className={`${!nameEdit ? "flex" : "hidden"} w-[200px] text-slate-400 px-4 py-1 focus:outline-none bg-white`}>{user.Name}</div>
                                <input onChange={(e)=>setName(e.target.value)} className={`${nameEdit ? "flex" : "hidden"} w-[200px] text-black px-4 py-1 focus:outline-none`} />
                                <button onClick={() =>{
                                    if(nameEdit){
                                       setName("");
                                    }
                                 setNameEdit(!nameEdit);
                                 }} className="border bg-blue-600 px-2 py-1 rounded-lg hover:border-black active:text-slate-800">{!nameEdit ? "Edit" : "cancel"}</button>
                            </div>
                        <div className="flex space-x-4">
                            <label className="font-bold">Email :</label>
                            <div className={`${!emailEdit ? "flex" : "hidden"} w-[200px] text-slate-400 px-4 py-1 focus:outline-none bg-white`}>{user.Email}</div>
                            <input onChange={(e)=>setEmail(e.target.value)} className={`${emailEdit ? "flex" : "hidden"} w-[200px] text-black px-4 py-1 focus:outline-none`} />
                            <button onClick={() => {
                                if(emailEdit){
                                    setEmail("");
                                }
                                setEmailEdit(!emailEdit);
                            }} className="border bg-blue-600 px-2 py-1 rounded-lg hover:border-black active:text-slate-800">{!emailEdit ? "Edit" : "cancel"}</button>
                        </div>
                    </div>
                        {/* updata and delete user */}
                        <div className="col-span-1 flex flex-col justify-center">
                            <div><button onClick={UpdateUser} className={`${(emailEdit || nameEdit)?"":"hidden"} border px-2 py-1 rounded-lg bg-blue-600 mb-4`}>Confirm Change</button></div>
                            <div><button onClick={DeleteUser} className="border px-2 py-1 rounded-lg bg-red-600">Delete Account</button></div>
                        </div>
                        <div className="flex space-x-4">
                            <label className="font-bold">Total Problem Solved :</label>
                            <div className={` font-bold`}><span className="text-green-700">{user.ProblemSolved?.length || 0}</span> out of <span className="text-red-700">{TotalProblem}</span></div>
                        </div>
                        <div className="w-[400px] h-[40px] border rounded-md">
                            <div className={`${(user.ProblemSolved?.length == 0)? "w-[0%]":`w-[${progresBar}%]`}  bg-green-700 h-full text-center flex flex-col justify-center rounded-md`}>{progresBar}%</div>
                        </div>
                    </div>
                    {/* standing  */}
                    <div className="col-span-4">
                        <div className="flex">
                            <div className="text-2xl font-semibold mb-4">Standing</div>
                            <button onClick={()=>{
                                router.push(`#${user._id}`);
                            }} className="border px-2 py-1 ml-8 mb-4 rounded-lg hover:text-blue-600 active:border-black">Your Standing</button>
                        </div>
                        <div className=" rounded-lg bg-slate-300 ">
                            <div className="grid grid-cols-4 px-6 sticky border-b-2 border-black ">
                                <div className="col-span-1 border-slate-500 border-r text-black font-semibold px-2 text-center">Rank</div>
                                <div className="col-span-2 border-slate-500  border-x text-black font-semibold px-2 text-center">Name</div>
                                <div className="col-span-1 border-slate-500  border-l text-black font-semibold px-2 text-center">Language</div>
                            </div>
                            <div className="h-[445px] overflow-y-auto">
                                {AllUser.map((standing, index)=>{
                                    return (
                                        <div id={`${standing._id}`}  key={index} className={`grid grid-cols-4 px-6 border-b border-slate-500 ${(user._id === standing._id)?"bg-green-600":""}`}>
                                            <div className="col-span-1 border-slate-500 border-r text-black font-semibold px-2 text-center">{index+1}</div>
                                            <div className="col-span-2 border-slate-500  border-x text-black font-semibold px-2 text-center">{standing.Name}</div>
                                            <div className="col-span-1 border-slate-500  border-l text-black font-semibold px-2 text-center">{standing.lang}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                {/* problem solved list  */}
                <div className="w-full">
                    <label className="font-bold">Problem Solved :</label>
                    <div className="grid grid-cols-3 mt-8 shadow-md shadow-white border-b h-[500px]">
                        <div className="border-r border-l flex flex-col items-center overflow-y-auto my-2">
                            <div className="text-green-800 font-semibold text-2xl mb-4">{easy.length} Easy</div>
                            {easy && easy.map((problem) => (
                                <Problems key={problem._id} _id={problem._id} Title={problem.Title} />
                            ))}
                        </div>
                        <div className="border-r border-l flex flex-col items-center overflow-y-auto my-2">
                            <div className="text-yellow-600 font-semibold text-2xl mb-4">{medium.length} Medium</div>
                            {medium && medium.map((problem) => (
                                <Problems key={problem._id} _id={problem._id} Title={problem.Title} />
                            ))}
                        </div>
                        <div className="border-r border-l flex flex-col items-center overflow-y-auto my-2">
                            <div className="text-red-600 font-semibold text-2xl mb-4">{hard.length} Hard</div>
                            {hard && hard.map((problem) => (
                                <Problems key={problem._id} _id={problem._id} Title={problem.Title} />
                            ))}
                        </div>
                    </div>
                </div>
                {/* problem make */}
                <div className={`w-full ${adminatom?"":"hidden"}`}>
                    <label className="font-bold">Problem created :</label>
                    <div className="grid grid-cols-3 mt-8 shadow-lg shadow-white border-b h-[500px]">
                        <div className="border-r border-l flex flex-col items-center overflow-y-auto my-2">
                            <div className="text-green-800 font-semibold text-2xl mb-4">{easyCreate.length} Easy</div>
                            {easyCreate && easyCreate.map((problem) => (
                                <Problems key={problem._id} _id={problem._id} Title={problem.Title} />
                            ))}
                        </div>
                        <div className="border-r border-l flex flex-col items-center overflow-y-auto my-2">
                            <div className="text-yellow-600 font-semibold text-2xl mb-4">{mediumCreate.length} Medium</div>
                            {mediumCreate && mediumCreate.map((problem) => (
                                <Problems key={problem._id} _id={problem._id} Title={problem.Title} />
                            ))}
                        </div>
                        <div className="border-r border-l flex flex-col items-center overflow-y-auto my-2">
                            <div className="text-red-600 font-semibold text-2xl mb-4">{hardCreate.length} Hard</div>
                            {hardCreate && hardCreate.map((problem) => (
                                <Problems key={problem._id} _id={problem._id} Title={problem.Title} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


function Problems({Title , _id}){
    const router = useRouter();
    return (
        <button className="hover:text-blue-600 overflow-x-auto" onClick={()=>{
            router.push(`/problemset/problem/${_id}`)
        }}>{Title}</button>
    )
}