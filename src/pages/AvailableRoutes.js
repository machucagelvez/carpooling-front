import { Component } from "react";
import { Link } from "react-router-dom";
import { Table } from 'react-bootstrap'
import Sidebar from "../components/Sidebar";

class AvailableRoutes extends Component {

    constructor() {
        super()
        const token = localStorage.token
        this.state = {
            token: token,
            routeId: '',
            schedule: '',
            time: '',
            routeName: '',
            carpooler: '',
            cost: '',
            emptySpaces: '',
            routes: []
        }

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        const apiUrl = 'http://localhost:4000/route';
        fetch(apiUrl, {
            method: 'GET',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.state.token}`
            }
        })
            .then((response) => response.json())         
            .then((route) => {
                this.setState({routes: route.data});
            })
    }

    handleClick(id) {
        const apiUrl = `http://localhost:4000/route/${id}`;
        fetch(apiUrl, {
            method: 'GET',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.state.token}`
            }
        })
            .then(response => response.json())
            .then(route => {
                this.setState({
                    routeId: route.data.routeId,
                    schedule: route.data.schedule,
                    time: route.data.time,
                    routeName: route.data.routeName,
                    carpooler: route.data.carpooler,
                    cost: route.data.cost,
                    routeOrigin: route.data.routeOrigin
                })
                const {routes, ...rest} = this.state
                this.props.history.push('/viewmap', rest)
            })        
    }
    
    render() {        
        return (
            <div className="container">
                <Sidebar/>
                <div className="row d-flex justify-content-start mt-4">
                    <h4 className="text-black-50 ml-4">Rutas disponibles</h4>
                </div>
                <Table striped responsive="sm">
                    <thead>
                        <tr>
                        <th scope="col">Ruta</th>
                        <th scope="col">Horario</th>
                        <th scope="col">Costo</th>
                        <th scope="col">Puestos disponibles</th>
                        <th scope="col">Carpooler</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.routes.map(route => {
                                return(
                                    <tr key={route.routeId}>                                        
                                        <td><Link to="#" onClick={() => this.handleClick(route.routeId)}>{route.routeName}</Link></td>
                                        <td>{route.schedule} - {route.time}</td>
                                        <td>{route.cost}</td>
                                        <td>{route.emptySpaces}</td>
                                        <td>{route.carpooler}</td>
                                    </tr>
                                )                                
                            })                            
                        }
                    </tbody>
                </Table>
            </div>
        )
    }


}

export default AvailableRoutes