import React from 'react'
import { Route, Routes } from 'react-router'
import Categorize from './categorize'

export default function Router() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<h1
        className='text-4xl text-black-900 text-center mt-10'
        >Please create a new form to Start</h1>} />
        <Route path='/categorize' element={<Categorize/>}/>
      </Routes>
    </div>
  )
}
