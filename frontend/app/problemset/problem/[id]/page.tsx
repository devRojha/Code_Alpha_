// app/pages/problemset/problem/[id]/index.tsx
"use client"

import CodeEditorcool from "@/components/CodeEditorcool";
import OutputShow from "@/components/OutputShow";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";


interface ProblemType{
    _id: String,
    Title: String,
    Deficulty: String,
    Description: string,
    Constraint : string,
    AdminId: String,
}
export default function Page() {
    const param = useParams();
    const id = param.id;
    const router = useRouter();
    const [errorCompile, setErrorCompile] = useState<boolean>(false);
    const [lang, setLang] = useState<string>("cpp");
    const [code, setCode] = useState<string>("");
    const [input, setInput] = useState<string>("");
    const [output, setOutput] = useState<string>("");
    const [verdicData , setVerdicData] = useState<string>("");
    const [problem , setProblem] = useState<ProblemType>();
    const [canEdit , setcanEdit] = useState<boolean>(false);
    const [inputView , setInputView] = useState<boolean>(true);
    const [outputView , setOutputView] = useState<boolean>(false);
    const [verdic , setVerdic] = useState<boolean>(false);
    const [result , setResult] = useState<boolean[]>([]);
    const [showSubmit , setShowSubmit] = useState<boolean>(false);

    const codeSubmit = async()=>{
        setOutput("")
        setVerdicData("")
        // geeting all testcases 
        const response = await axios.get("http://localhost:3000/api/problem/testcases",{
            headers:{
                ProblemId : id
            }
        })
        const testCases = response.data.testCase;
        console.log(testCases);
        try {
            //submit code and testcases for getting output
            const response = await axios.post("http://localhost:8000/submit", {
                lang,
                code,
                testCases
            });
            if (response.data.success === "true") {
                setErrorCompile(false);
                const codeOutput = response.data.output;
                //comparing code output with result
                const compare = await axios.post("http://localhost:3000/api/problem/compareresult",{
                    codeOutput,
                    problemid : id
                })
                console.log(compare.data.result);
                setResult(compare.data.result);
            }
            setInputView(false); setOutputView(true); setVerdic(false);
        } catch (error:any) {
            setVerdicData(error?.response?.data?.message || "");
            console.log(error.data);
            setErrorCompile(true);
            setInputView(false); setOutputView(false); setVerdic(true);
        }
        setShowSubmit(true);
        router.push("#terminal");
    }

    const codeExecute = async () => {
        setOutput("")
        setVerdicData("")
        try {
            const response = await axios.post("http://localhost:8000/run", {
                lang,
                code,
                input
            });
            if (response.data.success === "true") {
                setErrorCompile(false);
                setOutput(response.data.output);
            }
            setInputView(false); setOutputView(true); setVerdic(false);
        } catch (error:any) {
            setVerdicData(error?.response?.data?.message || "");
            console.log(error.data);
            setErrorCompile(true);
            setInputView(false); setOutputView(false); setVerdic(true);
        }
        setShowSubmit(false);
        router.push("#terminal")
    }

    useEffect(()=>{
        const getProblem = async ()=>{
            try{
                const response = await axios("http://localhost:3000/api/problem/problembyid",{
                    headers :{
                        Token : localStorage.getItem("Token"),
                        id : id
                    }
                })
                setProblem(response.data.problem);
                const Admin = localStorage.getItem("Admin")
                if(response.data.Edit === "true" && Admin === "true"){
                    setcanEdit(true);
                }

                const userDetail = await axios("http://localhost:3000/api/userProfile",{
                    headers:{
                        Token : localStorage.getItem("Token")
                    }
                })
                const problemCode = userDetail.data?.ProblemCode || [];
                let flag = true;
                let it = -1;
                for(let i =0 ; i < problemCode.length ;i++){
                    if(problemCode[i].problemId === id){
                        setCode(problemCode[i].code);
                        it = i;
                        flag = false;
                        break;
                    }
                }
                if(flag || (problemCode[it].code.length == 0)){
                    setCode(`\n#include <iostream>\nusing namespace std;\n\nint main(){\n\n  cout<<"ved"<<endl;\n\n  return 0;\n}`);
                }
            }
            catch(e){
                console.log(e);
            }
        }
        getProblem();
    },[id])

    //code store for user
    useEffect(()=>{
        const delay = setTimeout(async()=>{
            const response = await axios.put("http://localhost:3000/api/userProfile/update/problemcode",{
                problemId : id,
                lang,
                code
            },{
                headers:{
                    Token : localStorage.getItem("Token")
                }
            });
        }, 2000);
        return ()=> clearTimeout(delay);
    },[code])

    return (
        <div className="border-b bg-zinc-800 pt-8  text-white min-h-screen grid grid-cols-2 max-lg:grid-cols-1">
            {/* problem  */}
                <div className="overflow-y-auto border-r-4 border-r-slate-300 h-full px-2 border-b max-lg:border-r-0 ">
                    <div className="text-3xl font-bold mb-6 flex justify-between overflow-auto">
                        <div>{problem?.Title}</div>
                        <div className={`${(problem?.Deficulty == 'Easy')?"text-green-600":(problem?.Deficulty == 'Hard')?"text-red-600":"text-yellow-600"} text-lg font-normal mt-1 mr-4`}>{problem?.Deficulty}</div>
                        <div className={`${canEdit?"flex":"hidden"} text-lg font-normal mr-6 space-x-3`}>
                            <button onClick={()=>router.push(`/problemset/editproblem?id=${id}`)} className="active:border px-2 py-1 rounded-lg bg-blue-600">Edit</button>
                            <button onClick={async ()=>{
                                await axios.delete("http://localhost:3000/api/problem/deleteproblem",{
                                    headers:{
                                        Token : localStorage.getItem("Token"),
                                        id : id
                                    }
                                })
                                await axios.delete("http://localhost:3000/api/problem/deletetestCases",{
                                    headers:{
                                        Token : localStorage.getItem("Token"),
                                        ProblemId : id
                                    }
                                })
                                router.push("/problemset")
                            }} className="active:border px-2 py-1 bg-red-600 rounded-lg">Delete</button>
                        </div>
                    </div>
                    <div className="border-b h-[600px] overflow-y-auto">
                        <div className="flex mb-4"><OutputShow outputCode={problem?.Description || "Not Given ..."} /> </div>
                        <div className="text-2xl text-slate-400 font-bold mb-2">Constraints</div>
                        <div className="flex mb-4"><OutputShow outputCode={problem?.Constraint || "Not Given ..."} /> </div>
                    </div>
            </div>
            {/* compiler  */}
            <div className="">
                <div className="h-13 bg-zinc-600 flex justify-between py-3 px-8">
                    <div className="h-full space-x-4 ">
                        <button onClick={codeExecute} className="h-full bg-blue-700 hover:bg-blue-800 active:text-black border rounded-lg px-2 py-1">Run</button>
                        <button onClick={codeSubmit} className="h-full hover:bg-green-700 active:text-black border rounded-lg px-2 py-1 bg-green-800">Submit</button>
                    </div>
                    {/* selecting lang and scaleton  */}
                    <select onChange={(e)=>{
                        setLang(e.target.value);
                        if(e.target.value === "java"){
                            setCode(`\nimport java.util.Scanner;\n\n//Make the main class Main as it is\npublic class Main {\n   public static void main(String[] args) {\n      Scanner scanner = new Scanner(System.in);\n\n       System.out.println("Hello World");\n\n      // Close the scanner to release resources\n     scanner.close();\n  }\n}`);
                        }
                        else if(e.target.value === "cpp"){
                            setCode(`\n#include <iostream>\nusing namespace std;\n\nint main(){\n\n  cout<<"hii"<<endl;\n\n  return 0;\n}`);
                        }
                        
                        }} className="border px-2 py-1 rounded-lg bg-transparent focus:outline-none">
                        <option value={"cpp"}>C++</option>
                        <option value={"java"}>JAVA</option>
                        {/* <option value={"python"}>PYTHON</option> */}
                    </select>
                </div>
                <div className="bg-black focus:outline-none border-b  h-[700px]">
                    <CodeEditorcool setCode={setCode} code={code}/>
                </div>
                {/* terminal section  */}
                <div className=" h-[350px] " >
                    <div className="text-md font-bold bg-zinc-900 py-2 flex justify-around " id="terminal">
                        <button onClick={()=>{
                            setInputView(true); setOutputView(false); setVerdic(false);
                            }} className={`${inputView?"border-b text-blue-500":"text-white"}`}>INPUT</button>
                        <button onClick={()=>{
                            setInputView(false); setOutputView(true); setVerdic(false);
                            }} className={`${outputView?"border-b text-blue-500":"text-white"}`}>OUTPUT</button>
                        <button onClick={()=>{
                            setInputView(false); setOutputView(false); setVerdic(true);
                            }} className={`${verdic?"border-b text-blue-500":"text-white"}`}>VERDICT</button>
                    </div>
                    <textarea onChange={(e)=>{setInput(e.target.value)}} className={`${inputView?"":"hidden"} bg-zinc-800 w-full h-[305px]  p-4 overflow-auto focus:outline-none`} placeholder="write input here..."/>
                    <div className={`${outputView?"":"hidden"} bg-zinc-800 w-full h-[305px] overflow-auto`}>
                        <div className={`${showSubmit?"":"hidden"} h-full flex flex-wrap`}>
                            <ShowTestPass result={result} />
                        </div>
                        <div className={`${showSubmit?"hidden":""}`}>
                            <OutputShow outputCode={output} /> 
                        </div>
                    </div>
                    <div className={`${verdic?"":"hidden"} bg-zinc-800 w-full h-[305px]  p-4 overflow-auto text-red-700`}>
                        {verdicData}
                    </div>
                </div> 
            </div>
        </div>
    );
}

function ShowTestPass({result}:{result:boolean[]}){
    if(!result.length){
        return(
            <div>wait........</div>
        )
    }
    return(
    <>
        {result.map((test,index)=>{
            return (
                <div key={index} className={`${test?"bg-green-600":"bg-red-600"} flex flex-col justify-center border h-12 m-4 rounded-lg py-2 px-2`}>{test?`Test ${index+1} Pass`:`Test ${index+1} Fail`}</div>
            )
        })}
    </>
    )
}


