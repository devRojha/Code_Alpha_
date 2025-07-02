"use client"
import Authquote from "@/components/Authquote";
import SignupComponent from "@/components/SignupComponent";

import { useRouter } from "next/navigation";


export default function Signiup(){
    const router = useRouter();
    return (
        <div className="bg-zinc-700 h-screen grid grid-cols-2 max-md:grid-cols-1">
            <SignupComponent />
            <Authquote />
        </div>
    )
}
