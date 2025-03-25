
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Login } from './pages/Login'
import { Dashboard } from './pages/Dashboard'
import { GetKey } from './pages/GetKey'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login></Login>}/>
          <Route path='/dashboard' element={<Dashboard></Dashboard>}/>
          <Route path='/getkey' element={<GetKey></GetKey>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
