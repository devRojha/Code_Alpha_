"use client"

import axios from "axios"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export default function Page() {
    const router = useRouter();
    const [nameEdit, setNameEdit] = useState(false);
    const [name , setName] = useState("");
    const [email , setEmail] = useState("");
    const [emailEdit, setEmailEdit] = useState(false);
    const [easy, setEasy] = useState([]);
    const [medium, setMedium] = useState([]);
    const [hard, setHard] = useState([]);
    const [user, setUser] = useState({});

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("http://localhost:3000/api/userProfile", {
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
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, []);

    async function UpdateUser(){
        try{
            const response = await axios.put("http://localhost:3000/api/userProfile/update",{
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
            const response = await axios.delete("http://localhost:3000/api/userProfile/delete",{
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
            <div className="text-3xl font-bold mb-8 text-green-800">Hii {user.Name}...</div>
            <div className="space-y-8">
                <div className="grid grid-cols-7">
                    <div className="space-y-8 col-span-3">
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
                        <button onClick={UpdateUser} className={`${(emailEdit || nameEdit)?"":"hidden"} border px-2 py-1 rounded-lg bg-blue-600 mb-4`}>Confirm Change</button>
                        <button onClick={DeleteUser} className="border px-2 py-1 rounded-lg bg-red-600">Delete Account</button>
                    </div>
                </div>
                <div className="flex space-x-4">
                    <label className="font-bold">Total Problem Solved :</label>
                    <div className={`text-green-700 font-bold`}>{user.ProblemSolved?.length}</div>
                </div>
                {/* problem solved list  */}
                <div className="w-full">
                    <label className="font-bold">Problem Solved :</label>
                    <div className="grid grid-cols-3 mt-8 shadow-lg shadow-white border-b h-[500px]">
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
            </div>
        </div>
    );
}


function Problems({Title , _id}){
    const router = useRouter();
    return (
        <button className="hover:text-blue-600 overflow-x-auto" onClick={()=>{
            router.push(`/problemset/problem?id=${_id}`)
        }}>{Title}</button>
    )
}