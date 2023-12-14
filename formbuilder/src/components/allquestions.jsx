import { useEffect, useState } from 'react'
import { TbFileUpload } from "react-icons/tb";
import { useRef } from 'react';
import axios from 'axios';
import Question from './question.jsx';
import { useNavigate } from 'react-router';

let initialObj = {
  questionTitle: "",
  type: 'Categorize',
  Img_Url: null,
  categories: [""],
  items: [{
    item: "",
    belongsto: ""
  }],
  options: [""],
  cloze_sentence:"",
  passage:"",
}

async function fetchQuestion(){
 try {
  let res=await axios.get(`${process.env.REACT_APP_URL}/allQuestion/${localStorage.getItem('formid')}`)
  return res.data
 } catch (error) {
  return error
 }
}


export default function Allquestions() {
  let [questions, setQuestions] = useState([initialObj])
  const [headerImage, setHeaderImage] = useState(null);
  const fileInputRef = useRef(null);
const navigate=useNavigate()
// function to handel header image change and updated in database
  const handleImageChange = async (e) => {
    console.log('hii')
    const imageFile = e.target.files[0];
    setHeaderImage(URL.createObjectURL(imageFile));
    await axios.patch(`${process.env.REACT_APP_URL}/form/${localStorage.getItem('formid')}`,{
      url:URL.createObjectURL(imageFile)
    })
  }
// function to call the image file input element
  const handleClick = () => {
    fileInputRef.current.click();
  };

  // function to final submit
  const finalSubmit=async ()=>{
   
   let res= await axios.patch(`${process.env.REACT_APP_URL}/submit`,{
      FormId:localStorage.getItem('formid'),
      Questions:[...questions]
    })
    navigate('/')
  }

  useEffect(()=>{
    fetchQuestion()
    .then((res)=>{
      if(res[0]!==undefined){
        if(res[0].Questions.length>0){
          setQuestions([...res[0].Questions])
          }
      }
    })

  },[])


  return (
    <div className='mt-5 question-container grid gap-10'>
      <div className='w-[90%] m-auto rounded-lg h-[100px] cursor-pointer border-2 border-blue-500 bg-gray-100 flex items-center'>
      <input
          id="headerImage"
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className='hidden'
          onChange={handleImageChange}
        />
       {
        headerImage!==null ? <img 
        onClick={()=>{
          handleClick()
        }}
        src={headerImage} className='w-full h-[100%] object-cover overflow-hidden rounded-lg border border-gray-300' />
        : <h1 className='text-bolder text-2xl text-blue-900 text-center  m-auto flex items-center gap-2 '
        onClick={()=>{
          handleClick()
        }}
        >
        <TbFileUpload/>Upload header Image (Optional)</h1>
       }
        
      </div>
     

      {
        questions.map((el, ind) => {
          return <Question el={el} key={ind} ind={ind} questions={questions} setQuestions={setQuestions}
          initialObj={initialObj}
          />
        })
      }
     <div class="flex justify-center items-center mt-10">
  <button
  onClick={()=>{
    finalSubmit()
  }}
  class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-10 text-2xl rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
    Save
  </button>
</div>



    </div>
  )
}
