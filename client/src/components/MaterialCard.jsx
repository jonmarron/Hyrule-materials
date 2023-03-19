import React, { useState } from 'react'

export const MaterialCard = ({name, image, description, setHideSort, setLearnMoreCounter, learnMoreCounter}) => {

  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className='materialCard'>
      <button className="fav-btn">+</button>
      <img src={image} className='materialCardImage'/>
      <p className="material-name">{name}</p>
      {showInfo ? (
        <>
          <p className="material-descr">{description}</p>
          <button onClick = { e => {
            setShowInfo(!showInfo);
            setLearnMoreCounter(learnMoreCounter - 1)
            if(learnMoreCounter === 1 ) setHideSort(false);
          }}>Show less</button>
        </>
      ):(
        <button onClick = { e => {
          setShowInfo(!showInfo);
          setHideSort(true);
          setLearnMoreCounter(learnMoreCounter + 1)
        }}>Show more</button>
      )}
    </div>
  )
}
