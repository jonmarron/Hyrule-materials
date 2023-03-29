import { useEffect, useState, useMemo } from 'react'
import {Link, Route, Routes} from 'react-router-dom'
import './App.css'
import { constantsGeneral } from './constants/constatsGeneral'
import BrowseMaterials from './components/BrowseMaterials'
import FavMaterials from './components/FavMaterials'

const getMaterials = async (setMaterials) => {
  const response = await fetch(constantsGeneral.apiConstants.hyruleBaseURL + constantsGeneral.apiConstants.catMaterials);
  const data = await response.json();
  setMaterials(data.data);
}

function App() {
  const [materials, setMaterials] = useState([]);
  
  useEffect(() => {
    getMaterials(setMaterials);
  }, [])

  return (
    <>
      <nav>
         <h2>Hyrule Materials</h2>
        <ul>
          <li><Link to="/">Browse</Link></li>
          <li><Link to="/favourite-materials">Favourites</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path='/' element={<BrowseMaterials materials={materials} setMaterials={setMaterials} />}></Route>
        <Route path='/favourite-materials' element={<FavMaterials/>}></Route>

      </Routes>
    </>

  )
}

export default App
