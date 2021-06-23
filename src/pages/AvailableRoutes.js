import { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { Table } from 'react-bootstrap'
import Sidebar from "../components/Sidebar";

class AvailableRoutes extends Component {

    constructor() {
        super()
        this.state = {
            routeId: '',
            schedule: '',
            time: '',
            routeName: '',
            carpooler: '',
            cost: '',
            routes: []
        }

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        const apiUrl = 'http://localhost:4000/route';
        fetch(apiUrl)
            .then((response) => response.json())         
            .then((datos) => {
                this.setState({routes: datos.data});
            })
    }

    handleClick(id) {
        const apiUrl = `http://localhost:4000/route/${id}`;
        fetch(apiUrl)
            .then(response => response.json())
            .then(route => {
                this.setState({
                    routeId: route.data.routeId,
                    schedule: route.data.schedule,
                    time: route.data.time,
                    routeName: route.data.routeName,
                    carpooler: route.data.carpooler,
                    cost: route.data.cost
                })
                const {routes, ...rest} = this.state
                this.props.history.push('/viewroute', rest)
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

export default withRouter(AvailableRoutes)