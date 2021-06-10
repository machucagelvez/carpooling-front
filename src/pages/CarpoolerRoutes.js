import { Component } from "react";


class CarpoolerRoutes extends Component{

    render() {

        return(
            <div className="container">
                <div className="row d-flex justify-content-start mt-5">
                    <h4 className="text-black-50 ml-4">Rutas Activas</h4>
                </div>

                <table className="table table-sm table-striped">
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
                </table>
            </div>
        )
    }
}

export default CarpoolerRoutes