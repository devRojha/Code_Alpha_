"use client"
import React from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

export default function CodeEditorcool({code, setCode}:{code:string , setCode:any}){
    return(
        <div className={`h-[100%] w-full focus:outline-none bg-black text-white overflow-y-auto`}>
            <AceEditor
                placeholder="Placeholder Text"
                mode="java"
                theme="monokai"
                name="blah2"
                onChange={(newCode) => setCode(newCode)}
                fontSize={16}
                showPrintMargin={false}
                showGutter={true}
                highlightActiveLine={true}
                value={code}
                setOptions={{
                    enableBasicAutocompletion: false,
                    enableLiveAutocompletion: false,
                    enableSnippets: false,
                    showLineNumbers: true,
                    tabSize: 2,
                }}
                className="bg-slate-300 text-lg"
                style={{ width: '100%', height: '100%'}}
            />
        </div>
    )
}
