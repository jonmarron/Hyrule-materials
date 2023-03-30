import React, {useMemo, useState} from 'react'
import {MaterialCard} from './MaterialCard'

const FavMaterials = ({ materials, setMaterials, getMaterials }) => {

  const filteredMaterials = useMemo(() => {
    const filtered = [...materials].filter(material => material.isFavourite)
    return filtered
  },[materials] )

  return (
    <div className="container">
      <div id="cards-container">
        {filteredMaterials.map(material => {
            return(
              <MaterialCard material={material} getMaterials={getMaterials} setMaterials={setMaterials} />
            )
        })}
      </div>
    </div> 
  )
}

export default FavMaterials