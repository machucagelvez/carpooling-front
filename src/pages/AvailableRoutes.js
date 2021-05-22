import { Component } from "react";


class AvailableRoutes extends Component {

    constructor() {
        super()
        this.state = {
            routes: []
        }
    }

    componentDidMount() {
        const apiUrl = 'http://localhost:4000/route';
        fetch(apiUrl)
            .then((response) => response.json())         
            .then((datos) => {
                this.setState({routes: datos.data});
                console.log(this.state.routes);
            })
    }
    
    render() {
        return (
            <div className="container">
                <div className="row d-flex justify-content-start mt-5">
                    <h4 className="text-black-50 ml-4">Rutas disponibles</h4>
                </div>

                <table className="table table-striped">
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
                                        <td>{route.routeName}</td>
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

export default AvailableRoutes