import { useEffect, useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import { constantsGeneral } from './constants/constatsGeneral'
import { MaterialCard } from './components/MaterialCard'

const getMaterials = async (setMaterials) => {
  const response = await fetch(constantsGeneral.apiConstants.hyruleBaseURL + constantsGeneral.apiConstants.catMaterials);
  const data = await response.json();
  setMaterials(data.data);
}

function App() {
  const [ materials, setMaterials ] = useState(null);
  const [favMaterials, setFavMaterials] = useState(null)

  useEffect(()=> {
    getMaterials(setMaterials)
  }, [])

  return (
    <div className="App">
      <h1 id="site-name">Hyrule Materials</h1>
      <div id='filter-box'>
        <button>Sort Ascending</button>
        <button>Sort Descending</button>
      </div>
      <div id="cards-container">
        {console.log(materials)}
        {materials && materials.map((material, index) => {
          return (
            <MaterialCard
              key = { index }
              name = { material.name}
              image = { material.image}
              description = { material.description}
            />
          )
        })}
      </div>
    </div>
  )
}

export default App
