import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'


export default function Header() {
    let[formName,setformName]=useState(null)
    let [hide,setHide]=useState(true)
    let[input,setInput]=useState()
    let[error,setErr]=useState("Already exist.Please Enter another name.")
    const [isOpen, setIsOpen] = useState(false);
    const navigate=useNavigate()
// to create a new unique form
    const createForm=async ()=>{
        try {
            if(input===null || input==="" || input===undefined){
                setErr("Please enter valid  name")
                setHide(false)
                return
            }

            let res=await axios.post(`${process.env.REACT_APP_URL}/forms`,{
                title:input
            })
            setHide(true)
            localStorage.setItem("formid",res.data._id)
            setformName(res.data.Title)
            navigate('/categorize')
        } catch (error) {
           setErr("Form name already exists. Please enter a different name.")
           setHide(false)
        }
    }
    
  return (
    <div className="p-5 border-radius-10 shadow-md flex justify-between items-flex-start">
        <h1 className="text-left text-3xl cursor-pointer">Form Builder</h1>
        {
            formName===null ? <div>
            <div className='flex gap-5 items-center'>
            <input
            value={input}
            onChange={(e)=>{
                setInput(e.target.value)
            }}
          type="text"
          className="w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 text-xl ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
          placeholder="Enter a unique form name"
        />
        <button
        onClick={()=>{
            createForm()
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-4 rounded"
        >Create</button>
            </div>
        
            {/* <br/> */}
            <span className={`text-sm text-red-500 ${hide?'hidden' : ''}`} >{error}</span>
            </div>
            :
            <>
                <div className='flex items-center gap-5 relative'>
                <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="inline-flex  justify-center w-full rounded-md border border-gray-300 shadow-sm bg-white px-4 py-2 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Select Question type
        <svg
          className="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10 12a1 1 0 01-.7-.29l-4-4a1 1 0 111.4-1.42L10 10.58l3.3-3.3a1 1 0 111.4 1.42l-4 4a1 1 0 01-.7.3z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute top-10 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <Link to="/categorize" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
              Categorize
            </Link>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
            Cloze
            </a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
            Comprehension
            </a>
          </div>
        </div>
      )}
                </div>
                 <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-4 rounded"
        >Submit</button>
            </>
        }

    </div>

  )
}
