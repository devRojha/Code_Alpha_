"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function Page() {
    const param = useParams();
    const id = param.id;
    const [Cases, setCases] = useState<string[]>(Array(10).fill(""));
    const [Result, setResult] = useState<string[]>(Array(10).fill(""));

    const handleChangeTest = (index: number, value: string) => {
        setCases(prevCases => {
            const newCases = [...prevCases];
            newCases[index] = value;
            return newCases;
        });
    };

    const handleChangeResult = (index: number, value: string) => {
        setResult(prevResult => {
            const newResult = [...prevResult];
            newResult[index] = value;
            return newResult;
        });
    };

    const submitTestCases = async () => {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/problem/addtestcases`,
                {
                    problemId: id,
                    Cases: Cases.filter(test => test.length > 0), // Filter out empty test cases
                    Result: Result.filter(test => test.length > 0)
                },
                {
                    headers: {
                        Token: localStorage.getItem("Token") || ""
                    }
                }
            );
            if (response.data.msg) {
                alert(response.data.msg);
            }
        } catch (e) {
            console.error("Error:", e);
            alert("Failed to submit test cases. Please try again later.");
        }
    };

    return (
        <div className="bg-zinc-900 pt-8 text-white px-8 border-b">
            <button
                onClick={submitTestCases}
                className="px-3 py-1 border rounded-lg text-2xl hover:border-blue-800 active:text-blue-800 ml-6 mb-10"
            >
                Add
            </button>
            <div className="flex flex-wrap">
                {Cases.map((testCase, index) => (
                    <div
                        key={index}
                        className="h-[500px] w-[440px] mb-4 text-black text-2xl focus:outline-none p-4 mx-2 flex flex-col"
                    >
                        <textarea
                            placeholder={`Test Case ${index + 1}`}
                            value={testCase}
                            onChange={e => handleChangeTest(index, e.target.value)}
                            className="mb-2 h-[50%] "
                        />
                        <textarea
                            placeholder={`Expected Result ${index + 1}`}
                            value={Result[index]}
                            onChange={e => handleChangeResult(index, e.target.value)}
                            className="h-[50%]"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
