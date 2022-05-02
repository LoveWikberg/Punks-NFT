import React, { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import Mint from "./Mint/Mint";
import Start from "./Start/Start";
import { Skins } from "./Skins/Skins";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

export default function App() {
    return (
        <>
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
                            <Skins />
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
        </>
    );
}