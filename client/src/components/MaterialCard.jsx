import React, { useState } from 'react'
import { constantsGeneral } from '../constants/constatsGeneral';

export const MaterialCard = ({ material, onClickMore, onClickLess, getMaterials, setMaterials }) => {

  const { name, image, description, isFavourite } = material;
  const [showInfo, setShowInfo] = useState(false);

  const putFavourite = async () => {
    const res = await fetch(constantsGeneral.apiConstants.materialsURL, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(material)
    })
    const data = await res.text();
  }

  const handleClick = async() => {
    await putFavourite();
    getMaterials(setMaterials);
  }

  return (
    <div className='materialCard'>
      <button className="fav-btn" onClick={handleClick}>{isFavourite ? ('-') : ('+')}</button>
      <img src={image} className='materialCardImage' />
      <p className="material-name">{name}</p>
      {showInfo ? (
        <>
          <p className="material-descr">{description}</p>
          <button onClick={e => {
            setShowInfo(!showInfo);
            onClickLess && onClickLess();
          }}>Show less</button>
        </>
      ) : (
        <button onClick={e => {
          setShowInfo(!showInfo);
          onClickMore && onClickMore()
        }}>Show more</button>
      )}
    </div>
  )
}
