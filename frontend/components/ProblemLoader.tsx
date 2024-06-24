"useclient"
import { useRouter } from "next/navigation"


export default function ProblemLoader (){
    return (
        <div className="bg-slate-700">
            <div className="h-screen bg-zinc-900 mx-32 max-lg:mx-10 border-b overflow-y-auto pt-10">
                {/* filter component */}
                <div className="mb-10 px-6 flex">
                    <select className="text-white bg-slate-800 px-2 py-2 border rounded-lg focus:outline-none mr-6">
                        <option value={"All"}>Status</option>
                        <option value={"Solved"} className="text-green-700">Solved</option>
                        <option value={"Unsolved"} className="text-red-700">Unsolved</option>
                        <option value={"Attempted"} className="text-yellow-600">Attempted</option>
                    </select>
                    <select  className="text-white bg-slate-800 px-2 py-2 border rounded-lg focus:outline-none mr-6">
                        <option value={"All"}>Difficulty</option>
                        <option value={"Easy"} className="text-green-700">Easy</option>
                        <option value={"Medium"} className="text-yellow-600">Medium</option>
                        <option value={"Hard"} className="text-red-700">Hard</option>
                    </select>
                    <input className="bg-transparent border focus:outline-none text-white px-2 py-2 rounded-lg w-[250px]" placeholder="Search..." />
                </div>
                {/* title */}
                <div className="border-b grid grid-cols-6 text-slate-400 shadow-lg shadow-slate-600 mb-10">
                    <div className="col-span-1 px-4 py-2">Status</div>
                    <div className="col-span-3 px-4 py-2">Title</div>
                    <div className="col-span-1 px-4 py-2">Difficulty</div>
                    <div className="col-span-1 px-4 py-2">Acceptance</div>
                </div>
                {/* question grid */}
                <Problem/>
            </div>
        </div>
    )
}



function Problem() {
    const router = useRouter();
    return (
        // <div className="border-b shadow-sm shadow-white grid grid-cols-6 text-white mx-4">

        // </div>
        <>
            <div role="status" className=" animate-pulse mx-4">
                <div className=" bg-gray-200 dark:bg-gray-700 w-full h-[70px] border-b shadow-sm shadow-white mb-4"></div>
            </div>
            <div role="status" className=" animate-pulse mx-4">
                <div className=" bg-gray-200 dark:bg-gray-700 w-full h-[70px] border-b shadow-sm shadow-white mb-4"></div>
            </div>
            <div role="status" className=" animate-pulse mx-4">
                <div className=" bg-gray-200 dark:bg-gray-700 w-full h-[70px] border-b shadow-sm shadow-white mb-4"></div>
            </div>
            <div role="status" className=" animate-pulse mx-4">
                <div className=" bg-gray-200 dark:bg-gray-700 w-full h-[70px] border-b shadow-sm shadow-white mb-4"></div>
            </div>
            <div role="status" className=" animate-pulse mx-4">
                <div className=" bg-gray-200 dark:bg-gray-700 w-full h-[70px] border-b shadow-sm shadow-white mb-4"></div>
            </div>
            <div role="status" className=" animate-pulse mx-4">
                <div className=" bg-gray-200 dark:bg-gray-700 w-full h-[70px] border-b shadow-sm shadow-white mb-4"></div>
            </div>
            <div role="status" className=" animate-pulse mx-4">
                <div className=" bg-gray-200 dark:bg-gray-700 w-full h-[70px] border-b shadow-sm shadow-white mb-4"></div>
            </div>
            <div role="status" className=" animate-pulse mx-4">
                <div className=" bg-gray-200 dark:bg-gray-700 w-full h-[70px] border-b shadow-sm shadow-white mb-4"></div>
            </div>
            <div role="status" className=" animate-pulse mx-4">
                <div className=" bg-gray-200 dark:bg-gray-700 w-full h-[70px] border-b shadow-sm shadow-white mb-4"></div>
            </div>
            
        </>

    );
}