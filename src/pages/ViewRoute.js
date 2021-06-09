import { Component } from 'react'
import { Link } from 'react-router-dom'

function Header(props) {
    return(
        <div className="fixed-top">
            <fieldset className="border border-dark rounded bg-dark">
                <h4 className="text-center text-light">Ruta: {props.name}</h4>
                <h6 className="text-center text-light">Ingresa el inicio y fin de tu recorrido:</h6>
                <form className="mb-1">
                    <div className="form-row">
                        <div className="col">
                            <input type="text" className="form-control" placeholder="Aquí te subes"/>
                        </div>
                        <div className="col">
                            <input type="text" className="form-control" placeholder="Aquí te bajas"/>
                        </div>
                    </div>
                </form>
            </fieldset>            
        </div>
    )
}

function Footer(props) {
    return(
        <div className="fixed-bottom">
            <div className="container">
                <div className="row justify-content-center mb-2">                
                    <div className="col-6 col-md-3">
                        <Link to="/routes" type="button" className="btn btn-secondary btn-block">Volver</Link>
                    </div>
                    <div className="col-6 col-md-3">
                        <button type="button" className="btn btn-success btn-block">Unirse</button>
                    </div>       
                </div>
            </div>
            <table className="table table-sm table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th>Horario:</th>
                        <th>Costo:</th>
                        <th>Carpooler:</th>
                    </tr>
                </thead>
                <tbody>                    
                    <tr>
                        <td>{props.route.schedule}</td>
                        <td>${props.route.cost}</td>
                        <td>{props.route.carpooler}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

class ViewRoute extends Component {

    constructor(props) {
        super(props)
        this.state = {
            routeId: props.location.state.routeId,
            schedule: props.location.state.schedule,
            routeName: props.location.state.routeName,
            carpooler: props.location.state.carpooler,
            cost:props.location.state.cost
        }
    }
    
    render() {

        return (
            <div className="border border-secondary rounded">
                <Header name={this.state.routeName}/>        
                
                <Footer route={this.state} />
                
            </div>
        )
    }
}

export default ViewRoute