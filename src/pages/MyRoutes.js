import { Component } from "react";
import { Table } from 'react-bootstrap'
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Sidebar from "../components/Sidebar";




class MyRoutes extends Component {

    constructor() {
        super()
        const token = localStorage.token
        const decoded = jwt_decode(token)
        this.state = {
            token: token,
            userId: decoded.id,
            routeId: 1,
            routeName: '',
            cost: '',
            carpooler: '',
            time: '',
            schedule: '',
            routes: []
        }
    }

    routesByUser() {
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
            this.setState({routes: user.data.routes})
        })
    }

    componentDidMount() {
        this.routesByUser()        
    }

    render() {
        return(
            <div className="container">
                <Sidebar/>
                <div className="row d-flex justify-content-between mt-4">
                    <h4 className="text-black-50 ml-4">Mis rutas</h4>
                </div>
                <Table striped responsive="sm">
                    <thead>
                        <tr>
                        <th scope="col">Ruta</th>
                        <th scope="col">Horario</th>
                        <th scope="col">Costo</th>
                        <th scope="col">Carpooler</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.routes.map(route => {
                                return(
                                    <tr key={route.routeId}>
                                        <td><Link 
                                            to={{
                                                pathname: "/viewmap", 
                                                state: {
                                                    routeId: route.routeId,
                                                    schedule: route.schedule,
                                                    time: route.time,
                                                    carpooler: route.carpooler,
                                                    cost: route.cost,
                                                    routeName: route.routeName
                                                }}}>
                                            {route.routeName}
                                        </Link></td>
                                        <td>{route.schedule} - {route.time}</td>
                                        <td>${route.cost}</td>
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

export default MyRoutes