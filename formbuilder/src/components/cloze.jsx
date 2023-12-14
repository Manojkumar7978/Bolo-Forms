import React, { useState } from "react";

function Cloze({ el, questions, setQuestions, ind }) {

    const [option, setOption] = useState([])

    // for create preview 
    let createPreview = (string) => {
        return string.replace(/\*(.*?)\*/g, (match, word) => '...')
    }

    // for create options
    const createOption = () => {
        const regex = /\*(.*?)\*/g;
        const matches = el.cloze_sentence.match(regex);
        if (matches) {
            const words = matches.map(match => match.replace(/\*/g, ''));
            setOption([...words])
            let obj={
                ...el,
                options:[...words]
            }
            let data=[...questions]
            data[ind]=obj
            setQuestions([...data])
        } else {
            setOption([])
        }
    }

    //function to handel cloze question
    const handelClozeQuestion = (e) => {
        let newObj = {
            ...el,
            cloze_sentence: e.target.value
        }
        let data = [...questions]
        data[ind] = newObj
        setQuestions([...data])
    }
    return (
        <div  >
            <p className="text-black font-bold  text-md">Question {ind + 1}</p>

            <p className="text-black font-bold  mt-5 text-md">Question Preview</p>
            <p className="text-black border rounded-md w-[300px] px-5 py-2 mt-2 text-md">
                {
                    createPreview(el.cloze_sentence)
                }
            </p>
            <p className="text-black font-bold  mt-5 text-md">Enter Sentence</p>
            <input
                type="text"
                onChange={(e) => {
                    handelClozeQuestion(e)
                }}
                onBlur={() => {
                    createOption()
                }}
                className="border mt-2 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter your full sentence"
            />
            <p className="text-sm text-red-700">Wrap the word with * to underline the word.</p>
            {
                option.map((e, i) => {
                    return <div className="mt-5 flex" key={e}>
                        <button className="flex items-center px-3 py-2 rounded text-gray-500 border-gray-500 hover:text-gray-900 hover:border-gray-900">
                            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM4 10a1 1 0 100 2h12a1 1 0 100-2H4zM15 15a1 1 0 100 2H4a1 1 0 100-2h11z" clip-rule="evenodd" />
                            </svg>
                        </button>
                        <p className="text-black border-2 rounded-md w-[300px] px-5 py-2 mt-2 text-md">
                            {e}
                        </p>
                    </div>
                })
            }
            <input
                type="text"
                onBlur={(event)=>{
                    if(!option.includes(event.target.value))
                    setOption([...option,event.target.value])
                    let obj={
                        ...el,
                        options:[...option,event.target.value]
                    }
                    let data=[...questions]
                    data[ind]=obj
                    setQuestions([...data])
                }}
                className="border ml-20 mt-5 rounded-md px-3 py-2 w-[300px] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Add Options (Optional)"
            />

        </div>
    );
}

export default Cloze;
