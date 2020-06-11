import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import CreatePoint from '../src/pages/CreatePoint';
import Home from '../src/pages/Home';

const Routes =() =>{
    return(
        <BrowserRouter>
            <Route component ={Home} path="/" exact/>
            <Route component ={CreatePoint} path="/create-point" exact/>
        </BrowserRouter>
    )
}

export default Routes;