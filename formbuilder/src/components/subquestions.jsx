import React from "react";

export const SubQuestion = ({ el, questions, setQuestions, ind }) => {

    //function to add sub question
    const addSubQuestion = (event, i) => {
        let newObj = {
            ...el.subQuestion[i],
            title: event.target.value
        }
        let subQ=[...el.subQuestion]
        subQ[i]=newObj
        newObj={
            ...el,
            subQuestion:[...subQ]
        }
        let data=[...questions]
        data[ind]=newObj
        setQuestions([...data])
        console.log(newObj)
    }

    // function to delete an option
    const deleteOption = (element, index, i, e) => {
        let newoption = [...e.option]
        if (index <= 1) {
            return
        }

        newoption.splice(index, 1)
        let newobj = {
            ...e,
            option: [...newoption]
        }
        let subquestiondata = el.subQuestion
        subquestiondata[i] = newobj
        let data = [...questions]
        data[ind] = {
            ...el,
            subQuestion: [...subquestiondata]
        }
        setQuestions([...data])

    }

    // function to add more option
    const AddMoreOption = (event, e, i) => {
        if (event.target.value === "" || event.target.value === null || event.target.value === undefined)
            return
        if (e.option.includes(event.target.value))
            return
        let newobj = {
            ...e,
            option: [...e.option, event.target.value]
        }
        let subquestiondata = el.subQuestion
        subquestiondata[i] = newobj
        let data = [...questions]
        data[ind] = {
            ...el,
            subQuestion: [...subquestiondata]
        }
        setQuestions([...data])
    }
    // function to add subQuestion
    const addmoreSubQuestion = () => {
        let newSubQ = [...el.subQuestion]
        newSubQ.push({
            title: "",
            option: ["", ""],
            correctAns: ""
        })
        let newObj={
            ...el,
            subQuestion:[...newSubQ]
        }

        let data=[...questions]
        data[ind]=newObj
        setQuestions([...data])
    }

    // function to delete subQ
     const deleteSubQuestion=(i)=>{
        if(el.subQuestion.length===1)
        return
        let newSubQ = [...el.subQuestion]
        newSubQ.splice(i,1)
        let newObj={
            ...el,
            subQuestion:[...newSubQ]
        }
        let data=[...questions]
        data[ind]=newObj
        setQuestions([...data])
     }

     //function to set correact answer
     const setCorrectAns=(index,e,i)=>{
        let subQ=[...el.subQuestion]
        subQ[i]={
            ...subQ[i],
            correctAns:index 
        }
        let obj={
            ...el,
            subQuestion:[...subQ]
        }
        let data=[...questions]
        data[ind]=obj

        setQuestions([...data])
     }

     //function to handel option changes
     const editDefaultOption=(event,element,index,e,i)=>{
        let opt=[...e.option]
        opt[index]=event.target.value
        let subQ=[...el.subQuestion]
        subQ[i]={
            ...subQ[i],
            option:[...opt]
        }
        let obj={
            ...el,
            subQuestion:[...subQ]
        }
        let data=[...questions]
        data[ind]=obj

        setQuestions([...data])
     }

    return (
            <div className="w-full grid gap-5">
                {
                    el.subQuestion.map((e, i) => {
                        return< div className="flex  items-center"><div className="w-[90%] m-auto rounded-lg border-2 p-4 border-gray-400">
                            <p className="text-black font-bold  text-md">Question {ind + 1}.{i + 1}</p>
                            <input
                                type="text"
                                defaultValue={e.title}
                                onBlur={(event) => {
                                    addSubQuestion(event, i)
                                }}
                                className="border mt-2 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                placeholder="Add Question..."
                            />
                            <p className="text-sm text-red-500">* Click the correct answer only for once</p>
                            {
                                e.option.map((element, index) => {
                                    return <div key={element} className="mt-5 ml-10 flex gap-5 items-center">
                                        <input type="checkbox" className="w-5 h-5" 
                                        onClick={(event) => {
                                            if(event.target.checked)
                                            setCorrectAns(index+1,e,i)
                                          }}
                                          checked={e.correctAns==index+1}
                                        />
                                        <input
                                            defaultValue={element}
                                            type="text"
                                            className="border mt-2 rounded-md px-3 py-2 w-[300px] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                            placeholder={`Option ${index + 1}`}
                                            onBlur={(event)=>{
                                                editDefaultOption(event,element,index,e,i)
                                            }}
                                        />
                                        <svg
                                            onClick={() => {
                                                deleteOption(element, index, i, e)
                                            }}
                                            className="w-6 h-6 cursor-pointer right-2 sm:right-5 lg:right-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </div>
                                })
                            }
                            {/*more option to the question  */}
                            <input
                                type="text"
                                onBlur={(event) => {
                                    AddMoreOption(event, e, i)
                                }}
                                className="border ml-40 mt-5 rounded-md px-3 py-2 w-[300px] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                placeholder="Add Option (Optional)"
                            />

                        </div>
                        <div className="grid gap-2">
                        <button
                            onClick={() => {
                                addmoreSubQuestion()
                            }}
                            class="mb-5 text-2xl w-10 h-10 inline-flex items-center justify-center rounded-md border border-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50">
                            +
                        </button>
                        <button
                            onClick={() => {
                                deleteSubQuestion(i)
                            }}
                            class="text-2xl w-10 h-10 inline-flex items-center justify-center rounded-md border border-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50">
                            <svg class="w-6 h-6 text-red-500 fill-current" viewBox="0 0 24 24">
                                <path
                                    d="M6 6l12 12M6 18L18 6"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
        
                        </button>
                    </div>
                    </div> 
                    })
                }
            </div>

    )
}