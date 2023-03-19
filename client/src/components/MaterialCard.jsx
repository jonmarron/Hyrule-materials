import React from 'react'

export const MaterialCard = ({name, image, description}) => {
  return (
    <div className='materialCard'>
      <img src={image} className='materialCardImage'/>
      <p className="material-name">{name}</p>
      <p className="material-descr">{description}</p>
    </div>
  )
}
