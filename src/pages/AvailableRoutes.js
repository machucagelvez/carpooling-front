import { Component } from "react";
import { withRouter, Link } from "react-router-dom";

class AvailableRoutes extends Component {

    constructor() {
        super()
        this.state = {
            routeId: '',
            schedule: '',
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
                //console.log(this.state.routes);
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
                    routeName: route.data.routeName,
                    carpooler: route.data.carpooler,
                    cost: route.data.cost
                })
                //const data = this.state
                const {routes, ...rest} = this.state
                console.log(rest);
                this.props.history.push('/viewroute', rest)
            })

        
    }
    
    render() {
        return (
            <div className="container">
                <div className="row d-flex justify-content-start mt-5">
                    <h4 className="text-black-50 ml-4">Rutas disponibles</h4>
                </div>

                <table className="table table-sm table-striped">
                    <thead>
                        <tr>
                        <th scope="col">Horario</th>
                        <th scope="col">Ruta</th>
                        <th scope="col">Carpooler</th>
                        <th scope="col">Transporte</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.routes.map(route => {
                                return(
                                    <tr key={route.routeId}>
                                        <td>{route.schedule}</td>
                                        <td><Link to="#" onClick={() => this.handleClick(route.routeId)}>{route.routeName}</Link></td>
                                        <td>{route.carpooler}</td>
                                        <td>{}</td>
                                    </tr>
                                )                                
                            })                            
                        }
                    </tbody>
                </table>


            </div>
        )
    }


}

export default withRouter(AvailableRoutes)