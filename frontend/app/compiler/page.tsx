"use client"

import { useState } from 'react';

import axios from 'axios';
import CodeEditorcool from '@/components/CodeEditorcool';
import { useRouter } from 'next/navigation';

export default function Page() {
    const router = useRouter();
    const [errorCompile, setErrorCompile] = useState<boolean>(false);
    const [lang, setLang] = useState<string>("cpp");
    const [code, setCode] = useState<string>(`\n#include <iostream>\nusing namespace std;\n\nint main(){\n\n  cout<<"hii"<<endl;\n\n  return 0;\n}`);
    const [input, setInput] = useState<string>("");
    const [output, setOutput] = useState<string>("");

    const codeExecute = async () => {
        try {
            const response = await axios.post("http://localhost:8000/run", {
                lang,
                code,
                input
            });
            if (response.data.output.cmd) {
                setErrorCompile(true);
                setOutput(response.data.output.cmd);
            } else {
                setErrorCompile(false);
                setOutput(response.data.output);
            }
            router.push("#terminal")
        } catch (e) {
            console.log(e);
            setErrorCompile(true);
        }
    }

    return (
        <div className={`bg-zinc-800   pt-4`}>
            <div className={` border grid grid-cols-2 max-lg:grid-cols-1 `}>
                <div className={`col-span-1 border-r `}>
                    <div className={`flex border-b px-4 py-2  justify-between`}>
                        <select 
                            onChange={(e) => setLang(e.target.value)} 
                            className={` focus:outline-none border p-1 rounded-md`}
                        >
                            <option value="cpp">C++</option>
                            <option value="java">JAVA</option>
                            <option value="py">PYTHON</option>
                        </select>
                        <div className="space-x-20">
                            {/* <select 
                                onChange={(e) => setDark(e.target.value === 'true')} 
                                className={`${dark ? "bg-zinc-800" : "bg-slate-200"}  focus:outline-none border p-1 rounded-md`}
                            >
                                <option value={"true"}>Dark</option>
                                <option value={"false"}>Day</option>
                            </select> */}
                            <button 
                                onClick={codeExecute} 
                                className={`  border px-3 py-1 rounded-md hover:text-blue-600 active:border-black text-white`}
                            >
                                Run
                            </button>
                        </div>
                    </div>
                    <div className="h-[724px] w-full bg-black text-white">
                        <CodeEditorcool code={code} setCode={setCode}/>
                    </div>
                </div>
                <div className={`col-span-1 grid grid-cols-1 max-lg:grid-cols-2 border-r `}>
                    <div className={`border-b h-full `}>
                        <div className={`py-3 px-4 border-b font-bold text-white`}>INPUT</div>
                        <textarea 
                            onChange={(e) => setInput(e.target.value)} 
                            className={`p-4 text-white bg-black focus:outline-none w-full h-[87%] max-lg:h-[350px]`} 
                        />
                    </div>
                    <div className={`border-b h-full `} >
                        <div id='terminal' className={`py-3 px-4 border-b font-bold text-white max-lg:border-l`}>OUTPUT</div>
                        <div className={`p-4 focus:outline-none w-full h-[89%] max-lg:h-[350px] `}>
                            <span className={`${errorCompile ? "text-red-700" : "text-white"} `}>{output}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}