import { useState } from 'react'
import { Routes ,Route } from 'react-router-dom'
import Home from './components/Home.components'
import EnterSeats from './components/EnterSeats.components'
import Outcome from './components/Outcome.components'
import './App.css'

function App() {
  const [noOfSeats,setNoOfSeats] = useState(0);

  return (
    <>
      <Routes>
        <Route exact path='/enter-seats' element={<EnterSeats setNoOfSeats={setNoOfSeats} />} />
        <Route exact path='/' element={<Home noOfSeats={noOfSeats} />} />
        <Route exact path='/output' element={<Outcome/>} />
      </Routes>
    </>
  )
}

export default App
