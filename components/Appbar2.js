"use client"

import { useRouter } from "next/navigation";

export default function Appbar2() {
  const router = useRouter()
    return (
      <div className="w-full z-40 py-4 px-4 bg-black text-white flex justify-end fixed top-14">
        <div className="mr-40 space-x-20 font-semibold">
            <button onClick={()=>router.push("/")} className="hover:text-blue-600">Home</button>
            <button onClick={()=>router.push("/about")} className="hover:text-blue-600">About</button>
            <button className="hover:text-blue-600">Problem</button>
            <button className="hover:text-blue-600">Contest</button>
            <button className="hover:text-blue-600">Contact</button>
        </div>
      </div>
    );
  }
  