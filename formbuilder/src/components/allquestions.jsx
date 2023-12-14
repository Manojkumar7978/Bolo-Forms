import { useState } from 'react'
import Question from './question'
import { TbFileUpload } from "react-icons/tb";
import { useRef } from 'react';

let initialObj = {
  formId: localStorage.getItem('formid'),
  questionTitle: "",
  type: 'Categorize',
  img_url: "",
  categories: [""],
  items: [{
    item: "",
    belongsto: ""
  }],
  options: [],
  cloze_sentence:"",
  passage:"",
}


export default function Allquestions() {
  let [questions, setQuestions] = useState([initialObj])
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setSelectedImage(URL.createObjectURL(imageFile));
  }

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className='mt-5 question-container grid gap-10'>
      <div className='w-[90%] m-auto rounded-lg h-[100px] cursor-pointer border-2 border-blue-500 bg-gray-100 flex items-center'>
        <h1 className='text-bolder text-2xl text-blue-900 text-center  m-auto flex items-center gap-2 '>
        <TbFileUpload/>Upload header Image (Optional)</h1>
        <input
          id="headerImage"
          type="file"
          accept="image/*"
          ref={fileInputRef}
        />
      </div>
     

      {
        questions.map((el, ind) => {
          return <Question el={el} key={ind} ind={ind} questions={questions} setQuestions={setQuestions}
          initialObj={initialObj}
          />
        })
      }
     <div class="flex justify-center items-center mt-10">
  <button class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-10 text-2xl rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
    Save
  </button>
</div>



    </div>
  )
}
