import React from 'react'
import { Route, Routes } from 'react-router'
import { Home } from '../pages/home'
import { Preview } from '../pages/preview'

import Allquestions from '../pages/allquestions'

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
