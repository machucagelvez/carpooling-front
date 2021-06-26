import { Component } from 'react'
import { Link } from 'react-router-dom'
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
                        <td>{props.route.schedule} - {props.route.time}</td>
                        <td>${props.route.cost}</td>
                        <td>{props.route.carpooler}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

class JoinRoute extends Component {

    constructor(props) {
        super(props)
        const token = localStorage.token
        this.state = {
            token: token,
            routeId: props.userData.routeId,
            schedule: props.userData.schedule,
            time: props.userData.time,
            routeName: props.userData.routeName,
            carpooler: props.userData.carpooler,
            cost:props.userData.cost,
            routeOrigin: props.userData.routeOrigin,
            createdRoute: {}
        }
        this.position = this.state.routeOrigin.split(',')
        this.lat = parseFloat(this.position[0].slice(1))
        this.lng = parseFloat(this.position[1].slice(1, -1))
    }

    RouteById() {
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
            this.setState({createdRoute: JSON.parse(route.data.createdRoute)})
            console.log(this.state.createdRoute)
        })
    }

    componentDidMount() {
        const google = window.google;       
        const map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: this.lat, lng: this.lng },
            zoom: 14
        }); 
        this.directionsService = new google.maps.DirectionsService();
        this.directionsRenderer = new google.maps.DirectionsRenderer();
        this.RouteById()
        this.directionsRenderer.setDirections(this.state.createdRoute);
        this.directionsRenderer.setMap(map);
        
    }
    
    render() {        
        return (
            <div className="border border-secondary rounded">
                <div id="map" className="map"></div>
                <Header name={this.state.routeName}/>        
                
                <Footer route={this.state} />
                
            </div>
        )
    }
}

export default JoinRoute