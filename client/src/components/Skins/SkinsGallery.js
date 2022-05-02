import './Skins.scss';
import Punk from '../Punk/Punk';
import { getMockSkins } from '../../helpers/apiHelper';
import React, { useEffect, useState } from "react";
import { useGlobalState } from '../../states';
import { Skin } from './Skin';
import { PunkMenu } from '../PunkMenu/PunkMenu';

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
    <PunkMenu skins={skins} />
    
    </>
  );
}