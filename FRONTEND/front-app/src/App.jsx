import { Header } from './Components/header';
import {Route, Routes} from 'react-router-dom';

import { Home } from './Pages/Home'
import { Project } from './Components/project';
import './App.css'

function App() {
  return (
    <div className='app'>
      <div className='container'>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/projects/:id" element={<Project />} />
        </Routes>

      </div>
    </div>
  )
}

export default App
