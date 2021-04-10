import React, { useState } from 'react'
import './Editor.css'

import AceEditor from 'react-ace'

import API from '../../api'
import axios from 'axios'

import "ace-builds/src-noconflict/mode-java"
import "ace-builds/src-noconflict/mode-javascript"
import "ace-builds/src-noconflict/mode-python"
import "ace-builds/src-noconflict/mode-c_cpp"


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

    const onChange = (newValue) => {
        setCode(newValue)
    }

    const run = () => {

    }

    const reset = () => {
        aceEditor.editor.setValue("")
    }

    return (
        <div className="editor">
            <div className="editor__options">
                <select className="editor__modes" onChange={e => setMode(e.target.value)}>

                    {
                        ['javascript'].map(lang => (
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
                    <textarea className="editor__output" placeholder="Program Output" disabled
                    value={codeOutput}/>
                </div>

            </div>

            <div className="editor__buttons">
                <button className="editor__submitButton" onClick={reset}>
                    Reset
            </button>
                <button className="editor__submitButton">
                    Run
            </button>
            </div>


        </div>
    )
}

export default Editor
