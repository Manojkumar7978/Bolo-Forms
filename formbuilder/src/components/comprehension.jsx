import React from "react";
import { Image } from "./question.image";
import { SubQuestion } from "./subquestions";


function Comprehension({ el, questions, setQuestions, ind }) {

    // function to create the passage
    const createPassage = (e) => {
        let newObj = {
            ...el,
            passage: e.target.value
        }
        let data = [...questions]
        data[ind] = newObj
        setQuestions([...data])
    }


    return (
        <div  >
            <p className="text-black font-bold  text-md">Question {ind + 1}</p>
            <p className="text-black mt-5 font-bold  text-md">Passage Area:</p>
            <textarea
                onBlur={(e) => {
                    createPassage(e)
                }}
                defaultValue={el.passage}
                placeholder="Input your story passage..." className="w-full border-2 mb-5 rounded-lg p-2 border-gray focus:border-blue h-[100px] mt-5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
            <Image el={el} ind={ind} questions={questions} setQuestions={setQuestions} />

            <SubQuestion el={el} questions={questions} setQuestions={setQuestions} ind={ind} />
            
        </div>
    );
}

export default Comprehension;
