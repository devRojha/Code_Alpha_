"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function ForgotPassword(){
    const router = useRouter();
    const [Email, setEmail] = useState<string>("");

    const sendLinkFun = async ()=>{
        try{
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/email/forgotPassword`,{
                Email,
            })
            router.push("/");
            alert("An Email is Sent");
        }
        catch(e){
            console.log(e);
            alert("Internal Server Down");
        }
    }
    return (
        <div className="h-screen text-black">
            <div className="h-full flex flex-col justify-center">
                <div className="flex justify-center">
                    <div className="flex flex-col border border-black rounded-lg px-10 py-10">
                        <div className=" text-center text-2xl font-bold font-serif mb-4">Forgot Password</div>
                        <label className="my-2">Email</label>
                        <input type="email" onChange={(e)=>{setEmail(e.target.value)}} className="mb-8 border border-black rounded-md py-2 px-2  w-[300px]"/>
                        <div>{Email}</div>
                        <div className="mt-8 flex justify-center">
                            <button onClick={sendLinkFun} className="border px-4 py-2 rounded-lg border-blue-500 hover:text-blue-900 hover:border-black active:text-white">Send Link</button>
                        </div>
                    </div>
                </div>
            </div>  
        </div>
    )
}