import './Skins.scss';
import Punk from '../Punk/Punk';
import { getMockSkins } from '../../helpers/apiHelper';
import React, { useEffect, useState } from "react";
import { useGlobalState } from '../../states';
import { Skin } from './Skin';

export const SkinsGallery = () => {
  const [skins, setSkins] = useState([]);
  const [basePunk] = useGlobalState("selectedPunk");

  useEffect(() => {
    const initiate = async () => {
      
      await initStates();
    }
    initiate();
  }, [])

  const initStates = async () => {
    setSkins(getMockSkins());
  }

  return (
    <>
    <h1>Your skins</h1>
      {
        !skins ?
          <p>Fetching skins...</p>
          :
          <div className='skins__wrapper'>
            {
              skins.map((item, key) =>
                <Skin skin={item} key={key} />
              )
            }
          </div>
      }
    </>
  );
}