"use client"

import { useEffect, useState } from 'react';

import axios from 'axios';
import CodeEditorcool from '@/components/CodeEditorcool';
import { useRouter } from 'next/navigation';

export default function Page() {
    const router = useRouter();
    const [errorCompile, setErrorCompile] = useState<boolean>(false);
    const [lang, setLang] = useState<string>("cpp");
    const [code, setCode] = useState<string>(``);
    const [input, setInput] = useState<string>("");
    const [output, setOutput] = useState<string>("");

    const codeExecute = async () => {
        setOutput("")
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
        } catch (error:any) {
            if(lang == "cpp"){
                setOutput(error.response.data.message);
            }
            else if(lang == "java"){
                setOutput(error.response.data.message.stderr || error.response.data.message);
            }
            setErrorCompile(true);
        }
        router.push("#terminal")
    }
    useEffect(()=>{
        const codeStore = localStorage.getItem("codeStore");
        if(codeStore && codeStore != "empty"){
            setCode(codeStore);
        }
        else{
            localStorage.removeItem("codeStore");
            localStorage.setItem("codeStore", `\n#include <bits/stdc++.h>\nusing namespace std;\n\nint main(){\n\n  cout<<"hii"<<endl;\n\n  return 0;\n}`);
            setCode(`\n#include <bits/stdc++.h>\nusing namespace std;\n\nint main(){\n\n  cout<<"hii"<<endl;\n\n  return 0;\n}`);
        }
    },[])
    //code store for user
    useEffect(()=>{
        const delay = setTimeout(async()=>{
            localStorage.removeItem("codeStore");
            localStorage.setItem("codeStore", code || "empty");
            
        }, 2000);
        return ()=> clearTimeout(delay);
    },[code])


    return (
        <div className={`bg-zinc-800   pt-4`}>
            <div className={` border grid grid-cols-2 max-lg:grid-cols-1 `}>
                <div className={`col-span-1 border-r `}>
                    <div className={`flex border-b px-4 py-2  justify-between`}>
                        <select 
                            onChange={(e) => {
                                setLang(e.target.value);
                                if(e.target.value === "java"){
                                    setCode(`\nimport java.util.Scanner;\n\n//Make the main class Main as it is\npublic class Main {\n   public static void main(String[] args) {\n      Scanner scanner = new Scanner(System.in);\n\n       System.out.println("Hello World");\n\n      // Close the scanner to release resources\n     scanner.close();\n  }\n}`);
                                }
                                else if(e.target.value === "cpp"){
                                    setCode(`\n#include <bits/stdc++.h>\nusing namespace std;\n\nint main(){\n\n  cout<<"hii"<<endl;\n\n  return 0;\n}`);
                                }
                            }} 
                            className={` focus:outline-none border p-1 rounded-md`}
                        >
                            <option value="cpp">C++</option>
                            <option value="java">JAVA</option>
                            {/* <option value="py">PYTHON</option> */}
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
                <div className={`col-span-1 grid grid-cols-1 max-lg:grid-cols-2 max-md:grid-cols-1 border-r `}>
                    <div className={`border-b h-full `}>
                        <div className={`py-3 px-4 border-b font-bold text-white`}>INPUT</div>
                        <textarea id='terminal'
                            onChange={(e) => setInput(e.target.value)} 
                            className={`p-4 text-white bg-black focus:outline-none w-full h-[334px]`} 
                        />
                    </div>
                    <div className={`border-b h-full `} >
                        <div  className={`py-3 px-4 border-b font-bold text-white max-lg:border-l`}>OUTPUT</div>
                        <div className={`p-4 focus:outline-none w-full h-[334px] `}>
                            <div className={`bg-zinc-800 w-full h-full  p-4 overflow-auto`}>
                                <span className={`${errorCompile ? "text-red-700" : "text-white"} `}>{output}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}