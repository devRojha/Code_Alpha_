// app/pages/problemset/problem/[id]/index.tsx
"use client"

import CodeEditorcool from "@/components/CodeEditorcool";
import OutputShow from "@/components/OutputShow";
import { logedinState } from "@/state/atom";
import axios from "axios";
import { constants } from "buffer";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";


interface ProblemType{
    _id: String,
    Title: String,
    Deficulty: String,
    Description: string,
    Constraint : string,
    Example: string,
    Topic: [String],
    Company: [String],
    AdminId: String,
}

interface MyDataType{
    date: string,
    status: string,
    lang: string,
    code: string
}

interface AllDataType{
    userName:string
    date: string,
    status: string,
    lang: string,
    code: string
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
    const loginAtom = useRecoilValue(logedinState);
    const [DescriptionVeiw , setDescriptionView] = useState<boolean>(true);
    const [MySubmission , setMysubmission] = useState<MyDataType[]>([]);
    const [AllSubmission , setAllsubmission] = useState<AllDataType[]>([]);
    const [MysubmissionVeiw , setMysubmissionView] = useState<boolean>(false);
    const [AllsubmissionVeiw , setAllsubmissionView] = useState<boolean>(false);
    const [topicView, setTopicView] = useState<boolean>(false);
    const [compnayView, setCompanyView] = useState<boolean>(false);

    const codeSubmit = async()=>{
        if(loginAtom){
            setOutput("")
            setVerdicData("")
            // geeting all testcases 
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/problem/testcases`,{
                headers:{
                    ProblemId : id
                }
            })
            const testCases = response.data.testCase;
            // console.log(testCases);
            try {
                //submit code and testcases for getting output
                const response = await axios.post(`${process.env.NEXT_PUBLIC_COMPILER_URL}/submit`, {
                    lang,
                    code,
                    testCases
                });
                if (response.data.success === "true") {
                    setErrorCompile(false);
                    const codeOutput = response.data.output;
                    //comparing code output with result
                    const compare = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/problem/compareresult`,{
                        codeOutput,
                        problemid : id
                    })
                    // console.log(compare.data.result);
                    setResult(compare.data.result);
                    let flag = true;
                    for(let i = 0 ; i < compare.data.result.length ; i++){
                        if(compare.data.result[i] == false){
                            flag = false;
                            break;
                        }
                    }
                    try{
                        //pushing to problem
                        await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/problem/update/submitcode`,{
                            lang,
                            status: (flag)?"success":"fail",
                            code,
                            problemId: id
                        },{
                            headers:{
                                Token: localStorage.getItem("Token")
                            }
                        })
                        // pushing to user
                        await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/userProfile/update/submitcode`,{
                            lang,
                            status: (flag)?"success":"fail",
                            code,
                            problemId : id
                        },{
                            headers:{
                                Token: localStorage.getItem("Token")
                            }
                        })
                    }
                    catch(e){
                        console.log(e);
                    }
                }
                setShowSubmit(true);
                setInputView(false); setOutputView(true); setVerdic(false);
            } catch (error:any) {
                // console.log(error.response.data);
                var errorData = "Somthing Wrong......";
                if(lang == "cpp"){
                    if(error.response.data.testCase){
                        errorData = `Text case: ${error.response.data.testCase} \n${error.response.data.output[(error.response.data.testCase)-1]}` || "";
                    }
                    else{
                        errorData = error.response.data.message;
                    }
                }
                else if(lang == "java"){
                    if(error.response.data.testCase){
                        errorData = `Text case: ${error.response.data.testCase} \n${error.response.data.output[(error.response.data.testCase)-1].stderr}`;
                    }
                    else{
                        errorData = error.response.data.message;
                    }
                }
                setVerdicData(errorData);
                setErrorCompile(true);
                setInputView(false); setOutputView(false); setVerdic(true);
            }
            router.push("#terminal");
        }
        else{
            router.push("/");
            alert("you are not log in");
        }
    }

    const codeExecute = async () => {
        if(loginAtom){
            setOutput("")
            setVerdicData("")
            try {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_COMPILER_URL}/run`, {
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
                if(lang == "cpp"){
                    setVerdicData(error?.response?.data?.message || "");
                }
                else if(lang == "java"){
                    setVerdicData(error.response.data.message.stderr || error.response.data.message);
                }
                // console.log(error.data);
                setErrorCompile(true);
                setInputView(false); setOutputView(false); setVerdic(true);
            }
            setShowSubmit(false);
            router.push("#terminal")
        }
        else{
            router.push("/");
            alert("you are not log in");
        }
    }

    useEffect(()=>{
        const getProblem = async ()=>{
            try{
                if(loginAtom){
                    const response = await axios(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/problem/problembyid`,{
                        headers :{
                            Token : localStorage.getItem("Token"),
                            id : id
                        }
                    })
                    setProblem(response.data.problem);
                    setAllsubmission(response.data.problem.TotalSubmit)
                    const Admin = localStorage.getItem("Admin")
                    if(response.data.Edit === "true" && Admin === "true"){
                        setcanEdit(true);
                    }
    
                    const userDetail = await axios(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/userProfile`,{
                        headers:{
                            Token : localStorage.getItem("Token")
                        }
                    })
                    const tempSubmission = userDetail.data.SubmitCode.filter((data:any)=>{
                        return (data.problemId === id);
                    });
                    // for(let i = 0 ;i < userDetail.data.SubmitCode.length)
                    setMysubmission(tempSubmission)
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
                        setCode(`\n#include <bits/stdc++.h>\nusing namespace std;\n\nint main(){\n\n  cout<<"ved"<<endl;\n\n  return 0;\n}`);
                    }
                }
            }
            catch(e){
                console.log(e);
            }
        }
        getProblem();
    },[id, loginAtom])

    //code store for user
    useEffect(()=>{
        const delay = setTimeout(async()=>{
            if(loginAtom){
                try{
                    const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/userProfile/update/problemcode`,{
                        problemId : id,
                        lang,
                        code
                    },{
                        headers:{
                            Token : localStorage.getItem("Token")
                        }
                    });
                }
                catch(e){
                    console.log(e);
                }
            }
        }, 2000);
        return ()=> clearTimeout(delay);
    },[code, loginAtom])

    return (
        <div className="border-b bg-zinc-800 pt-5  text-white min-h-screen grid grid-cols-2 max-lg:grid-cols-1">
            {/* problem  */}
                <div className="overflow-y-auto border-r-4 border-r-slate-300 h-full px-2 border-b max-lg:border-r-0 ">
                    <div  className="py-2 shadow-lg shadow-slate-700 mb-6 grid grid-cols-3">
                        <button onClick={()=>{setDescriptionView(true); setAllsubmissionView(false); setMysubmissionView(false)}} className="hover:text-blue-600 active:text-black">Description</button>
                        <button onClick={()=>{setDescriptionView(false); setAllsubmissionView(false); setMysubmissionView(true)}} className="hover:text-blue-600 active:text-black border-x">My Submission</button>
                        <button onClick={()=>{setDescriptionView(false); setAllsubmissionView(true); setMysubmissionView(false)}} className="hover:text-blue-600 active:text-black">All Submission</button>
                    </div>
                    <div className={`${DescriptionVeiw?"":"hidden"}`}>
                        <div className="text-3xl font-bold mb-6 flex justify-between overflow-auto">
                            <div>{problem?.Title}</div>
                            <div className={`${(problem?.Deficulty == 'Easy')?"text-green-600":(problem?.Deficulty == 'Hard')?"text-red-600":"text-yellow-600"} text-lg font-normal mt-1 mr-4`}>{problem?.Deficulty}</div>
                            <div className={`${canEdit?"flex":"hidden"} text-lg font-normal mr-6 space-x-3`}>
                                <button onClick={()=>router.push(`/problemset/editproblem/${id}`)} className="active:border px-2 py-1 rounded-lg bg-blue-600">Edit</button>
                                <button onClick={async ()=>{
                                    await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/problem/deleteproblem`,{
                                        headers:{
                                            Token : localStorage.getItem("Token"),
                                            id : id
                                        }
                                    })
                                    await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/problem/deletetestCases`,{
                                        headers:{
                                            Token : localStorage.getItem("Token"),
                                            ProblemId : id
                                        }
                                    })
                                    router.push("/problemset")
                                }} className="active:border px-2 py-1 bg-red-600 rounded-lg">Delete</button>
                            </div>
                        </div>
                        <div className="border-b h-[700px] overflow-y-auto">
                            <div className="flex mb-4"><OutputShow outputCode={problem?.Description || "Not Given ..."} /> </div>
                            <div className="text-2xl text-slate-400 font-bold mb-2">Constraints</div>
                            <div className="flex mb-4"><OutputShow outputCode={problem?.Constraint || "Not Given ..."} /> </div>
                            <div className="text-2xl text-slate-400 font-bold mb-2">Example</div>
                            <div className="flex mb-4"><OutputShow outputCode={problem?.Example || "Not Given ..."} /> </div>
                        </div>
                        <div className="border-b h-[285px] overflow-y-auto">
                            <button onClick={()=>setTopicView(!topicView)} className="border w-full text-start px-6 py-4 my-4 rounded-lg font-bold hover:text-blue-600">Topic</button>
                            <div className={`${(topicView)?"":"hidden"} w-full text-start px-6 my-4 flex flex-wrap`}>
                                {problem?.Topic.map((topic, index)=>{
                                    return (
                                        <div key={index} className={` border mx-2 my-2 px-2 py-2 rounded-lg shadow-lg shadow-slate-400`}>{topic}</div>
                                    )
                                })}
                            </div>
                            <button onClick={()=> setCompanyView(!compnayView)} className="border w-full text-start px-6 py-4 my-4 rounded-lg font-bold hover:text-blue-600">Compnay</button>
                            <div className={`${(compnayView)?"":"hidden"} w-full text-start px-6 my-4 flex flex-wrap1`}>
                                {problem?.Company.map((compnay, index)=>{
                                    return (
                                        <div key={index} className={` border mx-2 my-2 px-2 py-2 rounded-lg shadow-lg shadow-slate-400`}>{compnay}</div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    {/* my Submission  */}
                    <div className={`${MysubmissionVeiw?"":"hidden"}`}>
                        <div className=" h-[1040px] max-lg:h-[600px] overflow-y-auto">
                        <div className="flex flex-col-reverse">
                            {MySubmission.map((data , index)=>{
                                return (
                                    <MySubmissionCompo key={index} data={data} />
                                )
                            })}
                        </div>
                        </div>
                    </div>
                    {/* All submission  */}
                    <div className={`${AllsubmissionVeiw?"":"hidden"}`}>
                        <div className="h-[1040px] max-lg:h-[600px] overflow-y-auto">
                            <div className="flex flex-col-reverse">
                                {AllSubmission.map((data , index)=>{
                                    return (
                                        <AllSubmissionCompo key={index} data={data} />
                                    )
                                })}
                            </div>
                        </div>
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
                            setCode(`\n#include <bits/stdc++.h>\nusing namespace std;\n\nint main(){\n\n  cout<<"hii"<<endl;\n\n  return 0;\n}`);
                        }
                        
                        }} className="border px-2 py-1 rounded-lg bg-transparent focus:outline-none">
                        <option value={"cpp"}>C++</option>
                        <option value={"java"}>JAVA</option>
                        {/* <option value={"python"}>PYTHON</option> */}
                    </select>
                </div>
                <div  className="bg-black focus:outline-none border-b  h-[700px]">
                    <CodeEditorcool setCode={setCode} code={code}/>
                </div>
                {/* terminal section  */}
                <div className=" h-[350px]"  >
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



function MySubmissionCompo({data}:{data:MyDataType}){
    const [codeShow, setCodeShow] = useState(false);
    return (
        <div className="mb-2">
            <div className={`${(data.status === "success")?"bg-green-600":"bg-red-600"} border rounded-lg py-2 px-5 flex justify-between`}>
                <div>{data.date.split(" ")[0]} {data.date.split(" ")[1]} {data.date.split(" ")[2]} {data.date.split(" ")[3]}</div>
                <div>{data.status}</div>
                <button onClick={()=>setCodeShow(!codeShow)} className="hover:text-blue-600">code</button>
                <div>{data.lang}</div>
            </div>
            <div className={`${(codeShow)?"":"hidden"} border-x border-b border-yellow-600 mb-2`}>
                <OutputShow outputCode={data.code} /> 
            </div>
        </div>
    )
}

function AllSubmissionCompo({data}:{data:AllDataType}){
    const [codeShow, setCodeShow] = useState(false);
    return (
        <div className="mb-2">
            <div className={`${(data.status === "success")?"bg-green-600":"bg-red-600"} border rounded-lg py-2 px-5 flex justify-between`}>
                <div>{data.date.split(" ")[0]} {data.date.split(" ")[1]} {data.date.split(" ")[2]} {data.date.split(" ")[3]}</div>
                <div>{data.userName}</div>
                <button onClick={()=>setCodeShow(!codeShow)} className="hover:text-blue-600">code</button>
                <div>{data.lang}</div>
            </div>
            <div className={`${(codeShow)?"":"hidden"} border-x border-b border-yellow-600 mb-2`}>
                <OutputShow outputCode={data.code} /> 
            </div>
        </div>
    )
}