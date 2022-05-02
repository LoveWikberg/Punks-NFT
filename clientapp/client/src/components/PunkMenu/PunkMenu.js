import './PunkMenu.scss';
import React, { useEffect, useState } from "react";
import { useGlobalState } from '../../states';
import { Skin } from '../Skins/Skin';

export const PunkMenu = (props) => {
    const [isExpanded, setIsExpanded] = useState(true);

    const toggleMenu = () => {
        setIsExpanded(!isExpanded);
    }

    return (
        <>
            <div className={`punk-menu punk-menu__container ${isExpanded ? "expanded" : ""}`}>
                <button className="punk-menu__toggle-btn" onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <div className={`punk-menu__punk-wrapper`}>
                    <img className="punk-menu__image" src="/testfiles/testbasepunk.PNG" />
                    <div className="punk-menu__info">
                        <div className="punk-menu__info--outer">
                            <div className='punk-menu__info--inner'>
                                <p>Punk #0007</p>
                                <a href="#">Test</a>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    !props.skins ?
                        <p>Fetching skins...</p>
                        :
                        <div className='skins__wrapper'>
                            {
                                props.skins.map((item, key) =>
                                    <Skin skin={item} key={key} />
                                )
                            }
                        </div>
                }
                <div className='punk-menu__footer'>
                    <div>Skin</div>
                    <div>Bla bla</div>
                </div>
            </div>
        </>
    );
}