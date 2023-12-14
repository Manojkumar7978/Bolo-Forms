import React from 'react'
import { Route, Routes } from 'react-router'
import Allquestions from './allquestions'
import { Home } from './home'
import { Preview } from './preview'

export default function Router() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/categorize' element={<Allquestions/>}/>
        <Route path={`/preview/:id`} element={<Preview/> }/>
      </Routes>
    </div>
  )
}
