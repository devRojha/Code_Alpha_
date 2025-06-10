"use client"
import { logedinState } from "@/state/atom";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import {  useRecoilState } from "recoil";


export default function ChangePassword(){
    const router = useRouter();
    const param = useParams();
    const id = param.id;
    const [Password, setPassword] = useState<string>("");
    const [CnfPassword, setCnfPassword] = useState<string>("");
    const setloginState = useRecoilState(logedinState)[1];

    const ChangePassword = async ()=>{
        if(Password != CnfPassword || Password.length == 0){
            alert("Fill Correct Credential")
        }
        else{
            try{
                const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/user/updatePassword`,{
                    id,
                    Password
                })
                alert(response.data.msg);
                if(response.data.msg === "Password Updated"){
                    localStorage.removeItem("Token");
                    setloginState(false);
                    router.push("/auth/signin");
                }
            }
            catch(e){
                console.log(e);
                alert("Internal Server Down");
            }
        }
    }
    return (
        <div className="h-screen text-black">
            <div className="h-full flex flex-col justify-center">
                <div className="flex justify-center">
                    <div className="flex flex-col border border-black rounded-lg px-10 py-10">
                        <div className=" text-center text-2xl font-bold font-serif mb-4">Change Password</div>
                        <label className="my-2">New Password</label>
                        <input onChange={(e)=>{setPassword(e.target.value)}} className="mb-8 border border-black rounded-md py-2 px-2  w-[300px]"/>
                        
                        <label className="my-2">Confirm Password</label>
                        <input onChange={(e)=>{setCnfPassword(e.target.value)}} className="mb-8 border border-black rounded-md py-2 px-2  w-[300px]"/>

                        <div className="mt-8 flex justify-center">
                            <button onClick={()=> ChangePassword()} className="border px-4 py-2 rounded-lg border-blue-500 hover:text-blue-900 hover:border-black active:text-white">Update Password</button>
                        </div>
                    </div>
                </div>
            </div>  
        </div>
    )
}