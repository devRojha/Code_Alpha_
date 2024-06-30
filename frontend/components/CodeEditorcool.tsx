"use client"
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';
import '@/app/custom-prism-theme.css';

export default function CodeEditorcool({code, setCode}:{code:string , setCode:any}){
    return(
        <div className={`h-[100%] w-full focus:outline-none bg-black text-white overflow-y-auto`}>
            <Editor
                value={code}
                onValueChange={code => setCode(code)}
                highlight={code => highlight(code, languages.javascript, 'javascript')}
                padding={10}
                className="focus:outline-none h-full "
                style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    border:"0px"
                }}
            />
        </div>
    )
}
