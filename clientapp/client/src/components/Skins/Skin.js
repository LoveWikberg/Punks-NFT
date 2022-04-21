import './Skins.scss';
import React from "react";




export const Skin = (item) => {

  return (
    <>
      <div className='skins__item'>
        <h2 className='skins__item--header'>{item.skin.name}</h2>
        {
          item.image
            ?
            <img src={item.skin.image} alt={item.skin.name} /> :
            <div className="skins__item--default-container" />
        }

        <div className='skins__item--description'>
          <p>{item.skin.description}</p>
          <button className='button button--primary'>Play dressup!</button>
        </div>
      </div>
    </>
  );
}