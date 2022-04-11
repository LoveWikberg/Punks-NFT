import './Punk.scss';
import basePunkUrl from '../../testfiles/male/Steve#10.png'

import React, { useEffect, useState } from "react";

const Punk = (skin) => {

    return (
        <>
            <div className="punk__wrapper">
                <div className='punk__item'>
                    <img src={skin.skin.background}/>
                    <img src={basePunkUrl} />
                    <img src={skin.skin.beard}/>
                    <img src={skin.skin.clothing}/>
                    <img src={skin.skin.necklace}/>
                    <img src={skin.skin.nose}/>
                    <img src={skin.skin.eyes}/>
                    <img src={skin.skin.mouth}/>
                    <img src={skin.skin.head}/>
                </div>
            </div>
        </>
    );
}

export default Punk;