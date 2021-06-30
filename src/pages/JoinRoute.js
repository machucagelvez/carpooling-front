import { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import jwt_decode from "jwt-decode";
import './styles/CreateRoute.css'

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

class JoinRoute extends Component {

    constructor(props) {
        super(props)
        const token = localStorage.token
        const decoded = jwt_decode(token)
        this.state = {
            token: token,
            userId: decoded.id,
            routeId: props.userData.routeId,
            schedule: props.userData.schedule,
            time: props.userData.time,
            routeName: props.userData.routeName,
            carpooler: props.userData.carpooler,
            cost:props.userData.cost,
            routeOrigin: props.userData.routeOrigin
        }
        this.position = this.state.routeOrigin.split(',')
        this.lat = parseFloat(this.position[0].slice(1))
        this.lng = parseFloat(this.position[1].slice(1, -1))

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        fetch(`http://localhost:4000/route/${this.state.routeId}`, {
            method: 'PUT',
            body:JSON.stringify({userId: this.state.userId}),
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.state.token}`
            }
        })
        .then(res => {
            if (!res.ok) throw Error(res.status);
            return res.json();
        })
        .catch(() => {
            window.alert('La ruta no tiene espacios disponibles')
        })
        .then(() => {
            this.props.history.push('/myroutes')
        })
    }

    drawRoute(CreatedRoute) {
        const google = window.google;       
        const map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: this.lat, lng: this.lng },
            zoom: 12
        });
        this.directionsRenderer = new google.maps.DirectionsRenderer();
        this.directionsRenderer.setMap(map);
        this.directionsRenderer.setDirections(CreatedRoute);
    }

    routeById() {
        fetch(`http://localhost:4000/route/${this.state.routeId}`, {
            method: 'GET',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.state.token}`
            }
        })
        .then(res => res.json())
        .then(route => {
            this.drawRoute(JSON.parse(route.data.createdRoute))            
        })
    }

    componentDidMount() {
        this.routeById()
    }
    
    render() {        
        return (
            <div className="border border-secondary rounded">
                <div id="map" className="map"></div>
                <Header name={this.state.routeName}/>        
                <div className="fixed-bottom">
                    <div className="container">
                        <div className="row justify-content-center mb-2">                
                            <div className="col-6 col-md-3">
                                <Link to="/routes" type="button" className="btn btn-secondary btn-block">Volver</Link>
                            </div>
                            <div className="col-6 col-md-3">
                                <button type="button" className="btn btn-success btn-block" onClick={this.handleClick}>Unirse</button>
                            </div>       
                        </div>
                    </div>
                    <table className="table table-sm table-bordered table-striped table-dark">
                        <thead>
                            <tr>
                                <th>Horario:</th>
                                <th>Costo:</th>
                                <th>Carpooler:</th>
                            </tr>
                        </thead>
                        <tbody>                    
                            <tr>
                                <td>{this.state.schedule} - {this.state.time}</td>
                                <td>${this.state.cost}</td>
                                <td>{this.state.carpooler}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
            </div>
        )
    }
}

export default withRouter(JoinRoute)