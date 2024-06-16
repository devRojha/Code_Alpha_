"use client"
import Authquote from "@/components/Authquote";
import SigninComponent from "@/components/SigninComponent";
import { useRouter } from "next/navigation";


export default function Signin(){
    const router = useRouter();
    return (
        <div className="bg-zinc-700 h-screen grid grid-cols-2 max-md:grid-cols-1">
            <SigninComponent />
            <Authquote />
        </div>
    )
}
