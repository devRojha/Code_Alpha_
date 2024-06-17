import { useRouter } from "next/navigation"



export default function Clickme(){
    const router = useRouter();
    return (
        <div className="mt-20 stick z-30 flex justify-center">
            <button onClick={()=>{
                router.push("/compiler")
            }} className="border px-4 py-2 font-semibold rounded-lg shadow-lg shadow-slate-600 active:border-black">Click me</button>
        </div>
    )
}