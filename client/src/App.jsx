import { useEffect, useState, useMemo } from 'react'
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
  const [materials, setMaterials] = useState([]);
  const [favMaterials, setFavMaterials] = useState(null)
  const [isSortedAscending, setIsSortedAscending] = useState(true);
  const [hideSort, setHideSort] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [learnMoreCounter, setLearnMoreCounter] = useState(0);

  const clickLearnMore = () => {
    setHideSort(true);
    setLearnMoreCounter(learnMoreCounter + 1)
  }
  const clickLearnLess = () => {
    setLearnMoreCounter(learnMoreCounter - 1)
    if(learnMoreCounter === 1 ) setHideSort(false);
  }

  useEffect(() => {
    getMaterials(setMaterials);

  }, [])

  const handleSearch = event => {
    setSearchQuery(event.target.value);
  }

  // const sortedMaterials= [...materials].sort((a, b) => {
  //   if (sortAscending) {
  //     return a.name.localeCompare(b.name);
  //   } else {
  //     return b.name.localeCompare(a.name);
  //   }
  // })

  const sortedMaterials = useMemo(() => {
    const sorted = [...materials].sort((a, b) => {
        if (isSortedAscending) {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      })
      return sorted;

  },[materials, isSortedAscending] )

  return (
    <div className="App">
      <h1 id="site-name">Hyrule Materials</h1>
      <div id='filter-box'>
        <input type="text" name="mat-search" placeholder='Search' onChange={handleSearch} />
        {hideSort ? (
          <></>
        ) : (
          <>
            <button onClick={e => setIsSortedAscending(true)}>Sort Ascending</button>
            <button onClick={e => setIsSortedAscending(false)}>Sort Descending</button>
          </>
        )}
      </div>
      <div id="cards-container">

        {sortedMaterials.filter(material => material.name.toLowerCase().includes(searchQuery.toLowerCase()))
          .map((material, index) => {
            return (
              <MaterialCard
                key={index}
                material={material}
                // onClickMore = { clickLearnMore }
                // onClickLess = { clickLearnLess }
              />
            )
          })}
      </div>
    </div>
  )
}

export default App
