import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import AvailableRoutes from '../pages/AvailableRoutes';
import './styles/App.css';

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/routes" component={AvailableRoutes} />
            </Switch>
        </BrowserRouter>
        
    );
}

export default App;
