import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import AvailableRoutes from '../pages/AvailableRoutes';
import ViewRoute from '../pages/ViewRoute'
import './styles/App.css';
import CarpoolerRoutes from '../pages/CarpoolerRoutes';
import ViewMap from './ViewMap';

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/routes" component={AvailableRoutes} />
                <Route exact path="/createroute" component={ViewMap} />
                <Route exact path="/viewroute" component={ViewRoute} />
                <Route exact path="/cproutes" component={CarpoolerRoutes} />
            </Switch>
        </BrowserRouter>
        
    );
}

export default App;
