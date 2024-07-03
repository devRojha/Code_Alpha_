import { adminState, logedinState } from "@/state/atom";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSetRecoilState } from "recoil";



export default function SignupComponent(){
    const router = useRouter();
    const [Email, setEmail] = useState<string>("");
    const [Name, setName] = useState<string>("");
    const [Password, setPassword] = useState<string>("");
    const [Admin, setAdmin] = useState<boolean>(false);
    const setAdminAtom = useSetRecoilState(adminState);
    const setLoginAtom = useSetRecoilState(logedinState);

    const handleSubmit = async () => {
        try {
            const response = await axios.post(`${(Admin)?`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/admin/signup`:`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/user/signup`}`, {
                Name,
                Email,
                Password
            });
            console.log(response.data)
            if (response.data.Token) {
                localStorage.setItem("Token", response.data.Token);
                setLoginAtom(true);
                if(Admin == true){
                    localStorage.setItem("Admin", "true");
                    setAdminAtom(true);
                }
                else{
                    localStorage.setItem("Admin", "false");
                    setAdminAtom(false);
                }
                router.push("/")
            }
        } catch (error) {
            setLoginAtom(false);
            console.error("Signin failed", error);
            alert("Signin Error")
        }
    };

    return (
        <div className="bg-slate-400 flex flex-col justify-center">
            <div className="border py-20 shadow-lg shadow-white rounded-lg mx-20 max-lg:mx-10 max-sm:sm-4 flex flex-col justify-center">
                <div className="mb-10 flex justify-center text-2xl font-bold text-black">Sign up</div>
                <div className="flex justify-center w-full ">
                    <div className="flex flex-col justify-center max-lg:w-[90%] w-[60%]">
                        <InputComponent onChange={(e)=>{setName(e.target.value)}} type={"text"} lable={"Name"}/>
                        <InputComponent onChange={(e)=>{setEmail(e.target.value)}} type={"text"} lable={"Email"}/>
                        <InputComponent onChange={(e)=>{setPassword(e.target.value)}} type={"password"} lable={"Password"}/> 
                        <div className="flex mb-4 ">
                            <input  onChange={(e)=>setAdmin(e.target.checked)} type={"checkbox"} className="border rounded-md px-3 py-1 text-slate-500 focus:outline-none focus:text-black mr-4"/>
                            <label  className="text-black mb-2 flex flex-col justify-center h-full">Admin</label>
                        </div>
                        <div className="flex justify-center space-x-6 mb-4 mt-4">
                            <button onClick={handleSubmit} className="border text-white px-3 py-1 rounded-lg text bg-zinc-700 hover:bg-zinc-900 active:border-black">Register</button>
                        </div>  
                        <div className="flex justify-center space-x-6">
                            <button className=" text-blue-60 text-blue-700">Forgot Password</button>
                            <button onClick={()=>{router.push("/signin")}} className=" text-blue-60 text-blue-700">Login</button>
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

function InputComponent({lable, type, onChange}:InputComponentType){
    return (
        <div className="flex flex-col mb-4">
            <label  className="text-black mb-2">{lable}</label>
            <input onChange={onChange} type={type} className="rounded-md px-3 py-1 text-slate-500 focus:outline-none focus:text-black"/>
        </div>
    )
}