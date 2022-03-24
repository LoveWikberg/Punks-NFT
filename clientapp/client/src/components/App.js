import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Mint from "./Mint/Mint";
import Start from "./Start/Start";
import Builder from "./Builder/Builder";

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
                        <Link to="/builder">Builder</Link>
                    </li>
                </ul>

                <Switch>
                    <Route path="/builder">
                        <Builder />
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