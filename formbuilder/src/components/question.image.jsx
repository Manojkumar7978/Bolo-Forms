import React, { useRef, useState } from "react";
import { FaRegImages } from "react-icons/fa6";


export  let Image=({el,questions,setQuestions,ind})=>{
const[qImage,seetQImage]=useState(el.Img_Url)
const fileInputRef=useRef()

    // function to handel question image change
  const handleImageChange = async (e) => {
    const imageFile = e.target.files[0];
    seetQImage(URL.createObjectURL(imageFile));
    let newObj={
        ...el,
        Img_Url:URL.createObjectURL(imageFile)
    }
    let data=[...questions]
    data[ind]=newObj
    setQuestions([...data])
  }
// function to call the image file input element
  const handleClick = () => {
    fileInputRef.current.click();
  };

    return (
        <div>
            <input type="file" 
                accept="image/*"
                ref={fileInputRef}
                className='hidden'
                onChange={handleImageChange}
                />
            {
                qImage===null ? <>
                <FaRegImages
                onClick={handleClick}
                size={25} className="cursor-pointer"/>
                </>
                :
                <img className="w-[300px] h-[300px] cursor-pointer" 
                onClick={handleClick}
                src={qImage} />
            }

        </div>
    )
}