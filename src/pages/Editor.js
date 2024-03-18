import React, {useState} from 'react'
import CodeMirror from '@uiw/react-codemirror';
import { vscodeDark } from "@uiw/codemirror-theme-vscode";


const Editor = () => {
    console.log("Editor Page");

    const [code, setCode] = useState('');
  return (
    <CodeMirror
    value={code}
    height='100px'
    onChange={setCode}
    theme={vscodeDark}
    />
  )
}

export default Editor