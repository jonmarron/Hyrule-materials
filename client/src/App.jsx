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
  const [ favMaterials, setFavMaterials ] = useState(null)
  const [ sortAscending, setSortAscending ] = useState(null);
  const [ hideSort, setHideSort ] = useState(false);

  // is there a better way to do this? probably yes
  const [ learnMoreCounter, setLearnMoreCounter ] = useState(0);

  useEffect(()=> {
    getMaterials(setMaterials)
  }, [])
  
  useEffect(() => {

    // I want the materials to be sorted ascending since the beginning. It only works if I set "materials" as a dependency of this useEffect, but that means it re-renders everytime and it is an infinte loop, how do i do this better without repeating this funtcion when setting the materials first after fetching
    if (materials && sortAscending) {
      const sortedMaterials = [...materials].sort((a, b) => {
        return a.name.localeCompare(b.name);
      })
      setMaterials(sortedMaterials);
    } else if (materials && !sortAscending) {
      const sortedMaterials = [...materials].sort((a, b) => {
        return b.name.localeCompare(a.name);
      })
      setMaterials(sortedMaterials);
    }
  }, [sortAscending])
  
  return (
    <div className="App">
      <h1 id="site-name">Hyrule Materials</h1>
      <div id='filter-box'>
        {hideSort? (
          <></>
        ) : (
          <>
            <button onClick = { e => setSortAscending(true)}>Sort Ascending</button>
            <button onClick = { e => setSortAscending(false)}>Sort Descending</button>
          </>
        )}
      </div>
      <div id="cards-container">

        {materials && materials.map((material, index) => {
          return (
            <MaterialCard
              key = { index }
              name = { material.name}
              image = { material.image}
              description = { material.description}
              setHideSort = { setHideSort }
              setLearnMoreCounter = { setLearnMoreCounter }
              learnMoreCounter = { learnMoreCounter }
            />
          )
        })}
      </div>
    </div>
  )
}

export default App
