import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

async function fetchData(){
    try {
        let res = await axios.get(`${process.env.REACT_APP_URL}/allForm`)
        return res.data
    } catch (error) {
        return error
    }
}
export const Home = () => {
    let [data, setData] = useState([])

    const navigate = useNavigate();


    useEffect(() => {
       fetchData()
       .then((res)=>{
        setData([...res])
       })
       .catch((err)=>{
        console.log(err)
       })
    }, [data])
    return (
        <div>
            <h1
                className='text-4xl mb-5 text-black-900 text-center mt-10'
            >Please create a new form to Start</h1>
            <div className="grid gap-5">
                {
                    data.map((el, ind) => {
                        return <div
                        key={el._id}
                        className="w-[90%] flex items-center justify-between shadow-md rounded-lg m-auto border-2 border-blue-500 p-5">
                            <h2 className="text-black text-xl">{el.Title}</h2>
                            <div className="button-group flex gap-10">
                                <button 
                                onClick={()=>{
                                    navigate(`/preview/${el._id}`);
                                }}
                                class="px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300">
                                    Preview
                                </button>
                                <button 
                                onClick={()=>{
                                    localStorage.setItem('formid',el._id)
                                    navigate('/categorize')
                                }}
                                class="px-4 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring focus:ring-blue-300">
                                    Edit
                                </button>
                                <button 
                                onClick={async ()=>{
                                    await axios.delete(`${process.env.REACT_APP_URL}/form/${el._id}`)
                                }}
                                class="px-4 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300">
                                    Delete
                                </button>
                            </div>
                        </div>
                    })
                }
            </div>

        </div>
    )
}