"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";



export default function SigninComponent(){
    const [Email, setEmail] = useState<string>("");
    const [Password, setPassword] = useState<string>("");
    const [Admin, setAdmin] = useState<Boolean>(false);
    const handleSubmit = async () => {
        try {
            const response = await axios.post(`${(Admin)?`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/admin/signin`:`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/user/signin`}`, {
                Email,
                Password
            });
            // console.log(response.data)
            if (response.data.Token) {
                localStorage.setItem("Token", response.data.Token);
                if(Admin === true){
                    localStorage.setItem("Admin", "true");
                }
                else{
                    localStorage.setItem("Admin", "false");
                }
                router.push("/")
            }
        } catch (error) {
            console.error("Signin failed", error);
            alert("Signin Error")
        }
    };

    const router = useRouter();
    return (
        <div className="bg-slate-400 flex flex-col justify-center">
            <div className="border py-20 shadow-lg shadow-white rounded-lg mx-20 max-lg:mx-10 max-sm:sm-4 flex flex-col justify-center">
                <div className="mb-10 flex justify-center text-2xl font-bold text-black">Sign In</div>
                <div className="flex justify-center w-full ">
                    <div className="flex flex-col justify-center max-lg:w-[90%] w-[60%]">
                        <InputComponent onChange={(e)=> setEmail((e.target.value))} type={"text"} lable={"Email"}/>
                        <InputComponent onChange={(e)=> setPassword(e.target.value)} type={"password"} lable={"Password"}/> 
                        <div className="flex mb-4 ">
                            <input onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setAdmin(e.target.checked)} type={"checkbox"} className="border rounded-md px-3 py-1 text-slate-500 focus:outline-none focus:text-black mr-4"/>
                            <label  className="text-black mb-2 flex flex-col justify-center h-full">Admin</label>
                        </div>
                        <div className="flex justify-center space-x-6 mb-4 mt-4">
                            <button onClick={handleSubmit} className="border text-white px-3 py-1 rounded-lg text bg-zinc-700 hover:bg-zinc-900 active:border-black">Login</button>
                        </div>  
                        <div className="flex justify-center space-x-6">
                            <button className=" text-blue-60 text-blue-700">Forgot Password</button>
                            <button onClick={()=>{router.push("/signup")}} className=" text-blue-60 text-blue-700">Register</button>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    )
}

interface InputComponentType{
    lable: string,
    type: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function InputComponent({lable, type, onChange}: InputComponentType){
    return (
        <div className="flex flex-col mb-4">
            <label className="text-black mb-2 fond-semibold">{lable}</label>
            <input onChange={onChange} type={type} className="rounded-md px-3 py-1 text-slate-500 focus:outline-none focus:text-black"/>
        </div>
    )
}