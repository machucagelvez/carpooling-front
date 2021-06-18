import { Component } from "react";
import { Table } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Sidebar from "../components/Sidebar";


class CarpoolerRoutes extends Component{

    render() {

        return(
            <div className="container">
                <Sidebar/>
                <div className="row d-flex justify-content-between mt-4">
                    <h4 className="text-black-50 ml-4">Rutas Activas</h4>
                    <Link to="/createroute" className="btn btn-primary mr-4 mb-2">Nueva ruta</Link>
                </div>
                <Table striped responsive="sm">
                    <thead>
                        <tr>
                        <th scope="col">Horario</th>
                        <th scope="col">Costo</th>
                        <th scope="col">Puestos</th>
                        <th scope="col">Inicio</th>
                        <th scope="col">Fin</th>
                        <th scope="col">Puestos vacíos</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr >
                            <td>Pendiente</td>
                            <td>Pendiente</td>
                            <td>Pendiente</td>
                            <td>Pendiente</td>
                            <td>Pendiente</td>
                            <td>Pendiente</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default CarpoolerRoutes