import './Skins.scss';
import React from "react";

export const Skin = (item) => {

  return (
    <>
      <div className='skins__item'>
        <img src={item.skin.image} alt={item.skin.name} />
      </div>
    </>
  );
}