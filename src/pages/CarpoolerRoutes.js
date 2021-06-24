import { Component } from "react";
import { Table } from 'react-bootstrap'
import jwt_decode from "jwt-decode";
import Sidebar from "../components/Sidebar";



class CarpoolerRoutes extends Component{

    constructor() {
        super()
        const token = localStorage.token
        const decoded = jwt_decode(token)
        this.state = {
            token: token,
            userId: decoded.id,
            user: decoded.user,
            vehicleId: '',
            routeName: '',
            cost: '',
            routeOrigin: '',
            routeDestination: '',
            spaces: '',
            emptySpaces: '',
            carpooler: '',
            time: '',
            schedule: '',
            routes: []
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.history.push(
            "/createroute", 
            {
                vehicleId: this.state.vehicleId, 
                user: this.state.user,
                userId: this.state.userId
            }
        )
    }

    RouteByVehicle() {
        fetch(`http://localhost:4000/user/${this.state.userId}`, {
            method: 'GET',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.state.token}`
            }
        })
        .then(res => res.json())
        .then(user => {
            this.setState({vehicleId: user.data.vehicle[0].vehicleId})
            this.GetRoutes()
        })
    }

    GetRoutes() {
        fetch(`http://localhost:4000/vehicle/${this.state.vehicleId}`, {
            method: 'GET',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.state.token}`
            }
        })
        .then(res => res.json())
        .then(vehicle => {
            this.setState({routes: vehicle.data.route})
        })
    }

    componentDidMount() {
        this.RouteByVehicle()
        
    }

    render() {

        return(
            <div className="container">
                <Sidebar/>
                <div className="row d-flex justify-content-between mt-4">
                    <h4 className="text-black-50 ml-4">Rutas Activas</h4>
                    <button className="btn btn-primary mr-4 mb-2" onClick={this.handleClick}>Nueva ruta</button>
                </div>
                <Table striped responsive="sm">
                    <thead>
                        <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Horario</th>
                        <th scope="col">Costo</th>
                        <th scope="col">Puestos</th>
                        <th scope="col">Puestos vacíos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.routes.map(route => {
                                return(
                                    <tr key={route.routeId}>
                                        <td>{route.routeName}</td>
                                        <td>{route.schedule} - {route.time}</td>
                                        <td>{route.cost}</td>
                                        <td>{route.spaces}</td>
                                        <td>{route.emptySpaces}</td>
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

export default CarpoolerRoutes