import { useRouter } from "next/navigation";



export default function SignupComponent(){
    const router = useRouter();
    return (
        <div className="bg-slate-400 flex flex-col justify-center">
            <div className="border py-20 shadow-lg shadow-white rounded-lg mx-20 max-lg:mx-10 max-sm:sm-4 flex flex-col justify-center">
                <div className="mb-10 flex justify-center text-2xl font-bold text-black">Sign up</div>
                <div className="flex justify-center w-full ">
                    <div className="flex flex-col justify-center max-lg:w-[90%] w-[60%]">
                        <InputComponent type={"text"} lable={"Name"}/>
                        <InputComponent type={"text"} lable={"Username"}/>
                        <InputComponent type={"password"} lable={"Password"}/> 
                        <div className="flex justify-center space-x-6 mb-4 mt-4">
                            <button className="border text-white px-3 py-1 rounded-lg text bg-zinc-700 hover:bg-zinc-900 active:border-black">Register</button>
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


function InputComponent({lable, type}){
    return (
        <div className="flex flex-col mb-4">
            <label className="text-black mb-2 fond-semibold">{lable}</label>
            <input type={type} className="rounded-md px-3 py-1 text-slate-500 focus:outline-none focus:text-black"/>
        </div>
    )
}