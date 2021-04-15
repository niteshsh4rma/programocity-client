import React, { useRef, useState } from 'react'
import './Editor.css'

import AceEditor from 'react-ace'

import API from '../../api'
import axios from 'axios'

import "ace-builds/src-noconflict/mode-java"
import "ace-builds/src-noconflict/mode-javascript"
import "ace-builds/src-noconflict/mode-python"
import "ace-builds/src-noconflict/mode-c_cpp"

import "ace-builds/src-noconflict/ext-language_tools"

import "ace-builds/src-noconflict/theme-monokai"
import "ace-builds/src-noconflict/theme-xcode"


function Editor() {

    let aceEditor;

    const [code, setCode] = useState("")
    const [theme, setTheme] = useState("monokai")
    const [mode, setMode] = useState("javascript")
    const [fontSize, setFontSize] = useState("14pt")
    const [wrap, setWrap] = useState(false)
    const [codeInput, setCodeInput] = useState("")
    const [codeOutput, setCodeOutput] = useState("")
    const [error, setError] = useState(false)

    const [runButtonDisable, setRunButtonDisable] = useState(false)

    const [result, setResult] = useState(null)

    const [runText, setRunText] = useState("Run")

    const onChange = (newValue) => {
        setCode(newValue)
    }

    const run = async (e) => {
        e.preventDefault()

        setRunButtonDisable(true)
        setRunText("Running")

        await API.post("/", {
            code: code,
            lang: mode,
            input: codeInput
        })
            .then(result => {

                setResult(result)

                if (result.data.signal == null && result.data.exitCode == 0){

                    document.getElementsByClassName("editor__output")[0].style.color = "lightgreen"

                    setCodeOutput(result.data.stdout)
                } else {

                    document.getElementsByClassName("editor__output")[0].style.color = "red"

                    setCodeOutput(result.data.signal + "\n" + result.data.errorType + " error\n\n" + result.data.stderr)

                }

                
            })


        setRunButtonDisable(false)
        setRunText("Run")

    }


    const reset = () => {
        aceEditor.editor.setValue("")
    }

    return (
        <div className="editor">
            <div className="editor__options">
                <select className="editor__modes" onChange={e => setMode(e.target.value)}>

                    {
                        ['javascript', 'c_cpp'].map(lang => (
                            <option value={lang} className="editor__selectOption">{lang}</option>
                        ))
                    }
                </select>

                <select className="editor__themes" onChange={e => setTheme(e.target.value)}>

                    {
                        ['monokai', 'xcode'].map(theme => (
                            <option value={theme}
                                className="editor__selectOption">{theme}</option>
                        )
                        )
                    }

                </select>

                <select className="editor__sizes" onChange={e => setFontSize(e.target.value)}>

                    {
                        ['14', '12', '16', '18', '20', '24', '28', '32', '40'].map(point => (
                            <option value={point + 'pt'}
                                className="editor__selectOption">{point + 'pt'}</option>
                        ))
                    }


                </select>

                <select className="editor__wrap" onChange={e => setWrap(e.target.value)}>
                    <option value={false} className="editor__selectOption">
                        No Wrap
                    </option>
                    <option value={true}className="editor__selectOption">Wrap</option>
                </select>

            </div>
            <div className="editor__items">
                <AceEditor
                    mode={mode}
                    theme={theme}
                    onChange={onChange}
                    name="editor__area"
                    fontSize={fontSize}
                    className="editor__area"
                    editorProps={{ $blockScrolling: true }}
                    enableBasicAutocompletion={true}
                    enableLiveAutocompletion={true}
                    width="auto"
                    wrapEnabled={wrap}
                    ref={ace => {aceEditor = ace}}
                />

                <div className="editor__console">
                    <textarea className="editor__input" placeholder="Add your input here, else program will run against default cases." onChange={e => setCodeInput(e.target.value)}/>
                    <textarea className="editor__output" placeholder="Program Output" 

                    disabled
                    value={codeOutput}/>
                </div>

            </div>

            {
                result ? 
                <div    className="editor__status" >
                    <p>Memory Usage - {result.data.memoryUsage}</p>
                    <p>CPU Usage - {result.data.cpuUsage}</p>
                </div> : ""
            }

            

            <div className="editor__buttons">
                <button className="editor__submitButton" onClick={reset} disabled={runButtonDisable}>
                    Reset
            </button>
                <button onClick={run} className="editor__submitButton" disabled = {runButtonDisable}>
                {runText}
            </button>
            </div>


        </div>
    )
}

export default Editor
