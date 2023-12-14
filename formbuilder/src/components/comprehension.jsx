import React from "react";


function Comprehension({el, questions, setQuestions, ind}) {

    // function to create the passage
    const createPassage=(e)=>{
        let newObj={
            ...el,
            passage:e.target.value
        }
        let data=[...questions]
        data[ind]=newObj
        setQuestions([...data])
    }


  return (
    <div  >
            <p className="text-black font-bold  text-md">Question {ind + 1}</p>
            <p className="text-black mt-5 font-bold  text-md">Passage Area:</p>
            <textarea
            onBlur={(e)=>{
               createPassage(e)
            }}  
            placeholder="Input your story passage..." className="w-full border-2 rounded-lg p-2 border-gray focus:border-blue h-[100px] mt-5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"/>

    </div>
  );
}

export default Comprehension;
