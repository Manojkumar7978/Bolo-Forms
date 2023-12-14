import React, {  useState } from 'react'
import axios from 'axios'
import {  useNavigate } from 'react-router-dom'
import { Home } from './home'


export default function Header() {
    let[formName,setformName]=useState(null)
    let [hide,setHide]=useState(true)
    let[input,setInput]=useState()
    let[error,setErr]=useState("Already exist.Please Enter another name.")
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

    // to cancel the form
 const cancelForm=async ()=>{
    let id=localStorage.getItem('formid')
   await axios.delete(`${process.env.REACT_APP_URL}/form/${id}`)
    setformName(null)
    setInput(null)
    localStorage.removeItem('formid')
    navigate('/')
 }
    
  return (
 <div>
       <div className="p-5 border-radius-10 shadow-md flex justify-between items-flex-start">
        <h1 className="text-left text-black font-bold text-3xl cursor-pointer"
        onClick={()=>{
            navigate('/')
        }}
        >Form Builder</h1>
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
                 <button
                 onClick={()=>{
                    cancelForm()
                 }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-4 rounded"
        >Cancel</button>
            </>
        }
        

    </div>

 </div>

  )
}
