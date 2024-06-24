"use client"

import { useState } from "react"

export default function Page(){
    const [dark , setDark] = useState(true);
    return (
        <div className={` bg-zinc-800 ${dark?"bg-zinc-800":"bg-slate-200"} ${dark?"text-white":"text-black"} pt-4`}>
            <div className={`h-screen border grid grid-cols-2 ${dark?"border-white":"border-black"}`}>
                <div className={`col-span-1 border-r ${dark?"border-white":"border-black"}`}>
                    <div className={`flex border-b px-4 py-2 ${dark?"border-white":"border-black"} justify-between`}>
                        <select className={`${dark?"bg-zinc-800":"bg-slate-200"} ${dark?"border-white":"border-black"} focus:outline-none border p-1 rounded-md`}>
                            <option value="c++">C++</option>
                            <option value="java">JAVA</option>
                        </select>
                        <div className="space-x-20">
                            <select onChange={(e) => setDark(e.target.value === 'true')} className={`${dark?"bg-zinc-800":"bg-slate-200"} ${dark?"border-white":"border-black"} focus:outline-none border p-1 rounded-md`}>
                                <option value={"true"} >Dark</option>
                                <option value={"false"} >Day</option>
                            </select>
                            <button className={`${dark?"bg-zinc-800":"bg-slate-200"} ${dark?"border-white":"border-black"} border px-3 py-1 rounded-md`}>Run</button>
                        </div>
                    </div>
                    <textarea className={`px-2 py-6 h-[94%] w-full focus:outline-none ${dark?"bg-black text-white":"bg-slate-200 text-black"}`} />
                </div>
                {/* intput output  */}
                <div className={`col-span-1 border-r ${dark?"border-white":"border-black"}`}>
                    <div className={`border-b  h-[40%] ${dark?"border-white":"border-black"}`}>
                        <div className={`py-3 px-4 border-b font-bold ${dark?"border-white":"border-black"}`}>INPUT</div>
                        <textarea className={`p-4 text-black focus:outline-none w-full h-[83%] ${dark?"bg-black text-white":"bg-slate-200 text-blackfsdfd"}`} />
                    </div>
                    <div className={`border-b  h-[60%] ${dark?"border-white":"border-black"}`}>
                        <div className={`py-3 px-4 border-b font-bold ${dark?"border-white":"border-black"}`}>OUTPUT</div>
                        <div className={`p-4 text-black focus:outline-none w-full h-[89%] ${dark?"bg-black text-white":"bg-slate-200 text-black"}`}></div>
                        {/* <textarea  className={`p-4 text-black focus:outline-none w-full h-[80%] ${dark?"bg-zinc-800 text-white":"bg-slate-200 text-blackfsdfd"}`} /> */}
                    </div>
                </div>
                
            </div>
        </div>
    )
}