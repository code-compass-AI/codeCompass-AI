
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Login } from './components/login'
import { Welcome } from './components/Welcome'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login></Login>}/>
          <Route path='/welcome' element={<Welcome></Welcome>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
