import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import Mint from "./Mint/Mint";
import Start from "./Start/Start";
import { SkinsGallery } from "./Skins/SkinsGallery";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.scss";
import { setGlobalState } from '../states';
import { getMockBasePunk } from '../helpers/apiHelper';


export default function App() {
    setGlobalState("selectedPunk", getMockBasePunk());

    return (
        <div className="main">
            <Router>
                <div>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/mint">Mint</Link>
                        </li>
                        <li>
                            <Link to="/skins">Skins</Link>
                        </li>
                    </ul>


                    <Switch>
                        <Route path="/skins">
                            <SkinsGallery />
                        </Route>
                        <Route path="/mint">
                            <Mint />
                        </Route>
                        <Route path="/">
                            <Start />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div>
    );
}