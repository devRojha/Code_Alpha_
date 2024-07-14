"use client"

import { adminState, logedinState } from "@/state/atom";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";


export default function Appbar1() {
  const router = useRouter()
  const [Token , setToken]= useState<string>("");
  const [AdminAtom, setAdminAtom] = useRecoilState(adminState);
  const [loginAtom , setLoginAtom] = useRecoilState(logedinState);

  useEffect(()=>{
    try{
      const token = localStorage.getItem("Token") || "";
      setToken(token)
      if(token){
        setLoginAtom(true);
        if(localStorage.getItem("Admin") === "true"){
          setAdminAtom(true);
        }
      }
      else{
        setAdminAtom(false);
        setLoginAtom(false);
      }
    }
    catch(e){
      console.log(e);
      setAdminAtom(false);
      setLoginAtom(false);
    }
  },[loginAtom])
    return (
      <div className="w-full z-40 py-4 px-4 bg-zinc-800 text-white flex justify-between fixed top-0">
        <div className="ml-20 max-sm:ml-6 max-sm:text-lg font-bold text-2xl">Code Alpha</div>
        {/* Not authenticate  */}
        <div className={`space-x-4 max-sm:text-sm ${(loginAtom)?"hidden":"flex"}`}>
          <button onClick={()=> router.push("/signin")} className="hover:text-blue-600">Signin</button>
          <button onClick={()=> router.push("/signup")} className="hover:text-blue-600">Signup</button>
        </div>
        {/* After Authenticate  */}
        <div className={`space-x-4 max-sm:text-sm ${(loginAtom)?"flex":"hidden"}`}>
          <button onClick={()=> {
            localStorage.clear();
            setAdminAtom(false);
            setLoginAtom(false);
            setToken("");
            router.push("/");
            }} className="hover:text-blue-600">Log Out</button>
            <button onClick={()=> router.push("/profile")} className="hover:bg-blue-700 hover:text-white text-gray-600 active:border relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <span className="font-medium  dark:text-gray-300">D</span>
            </button>
        </div>
      </div>
    );
  }
  