"use client"
import axios from "axios";
import {  useSearchParams } from "next/navigation";
import {  useState } from "react";


export default function Page() {
    const params = useSearchParams().toString();
    const id = params.substring(3);
    const [Cases, setCases] = useState<string[]>(Array(10).fill(""));

    const handleChange = (index: number, value: string) => {
        setCases(prevCases => {
            const newCases = [...prevCases];
            newCases[index] = value;
            return newCases;
        });
    };

    const submitTestCases = async () => {
        try {
            const response = await axios.post(
                "http://localhost:3000/api/problem/addtestcases",
                {
                    problemId: id,
                    Cases: Cases.filter(test => test.length > 0) // Filter out empty test cases
                },
                {
                    headers: {
                        Token: localStorage.getItem("Token")
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
                    <textarea
                        key={index}
                        placeholder={`Test Case ${index + 1}`}
                        value={testCase}
                        onChange={e => handleChange(index, e.target.value)}
                        className="h-[350px] w-[440px] mb-4 text-black text-2xl focus:outline-none p-4 mx-2"
                    />
                ))}
            </div>
        </div>
    );
}
