import './Skins.scss';
import Punk from '../Punk/Punk';
import { apiHelper, getMockBasePunk, getMockSkins } from '../../helpers/apiHelper';

import React, { useEffect, useState } from "react";

export const Skins = () => {
  const [basePunk, setBasePunk] = useState(null);
  const [skins, setSkins] = useState([]);

  useEffect(() => {
    const initiate = async () => {
      await initStates();
    }

    initiate();
  }, [])

  const initStates = async () => {
    let basePunk = getMockBasePunk();
    let skins = getMockSkins();
    setBasePunk(basePunk);
    setSkins(skins);
  }

  return (
    <>
    {
      !basePunk ? 
      <p>Fetching punk</p>
      : 
      <Punk skin={basePunk} />
    }

      {
        !skins ?
          <p>Fetching skins...</p>
          :
          <div className='skins__wrapper'>
            {
              skins.map((item, key) =>
                <Punk skin={item} key={key} />
              )
            }
          </div>
      }
    </>
  );
}