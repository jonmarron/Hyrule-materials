import React, { useState } from 'react'
import { constantsGeneral } from '../constants/constatsGeneral';

export const MaterialCard = ({material, onClickMore, onClickLess}) => {

  const {name, image, description} = material;
  const [showInfo, setShowInfo] = useState(false);

  const handleClick = async () => {
    const res = await fetch(constantsGeneral.apiConstants.favBaseURL,{
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body:JSON.stringify(material)
    })
    const data = await res.text();
    console.log(data);
  }

  return (
    <div className='materialCard'>
      <button className="fav-btn" onClick = {handleClick}>+</button>
      <img src={image} className='materialCardImage'/>
      <p className="material-name">{name}</p>
      {showInfo ? (
        <>
          <p className="material-descr">{description}</p>
          <button onClick = { e => {
            setShowInfo(!showInfo);
            onClickLess && onClickLess();
          }}>Show less</button>
        </>
      ):(
        <button onClick = { e => {
          setShowInfo(!showInfo);
          onClickMore && onClickMore()
        }}>Show more</button>
      )}
    </div>
  )
}
