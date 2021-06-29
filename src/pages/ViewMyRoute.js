import { Component } from "react";
import { Link } from 'react-router-dom'


function Header(props) {
    return(
        <div className="fixed-top">
            <fieldset className="border border-dark rounded bg-dark">
                <h4 className="text-center text-light">Ruta: {props.name}</h4>
            </fieldset>            
        </div>
    )
}

class ViewMyRoute extends Component{

    constructor(props) {
        super(props)
        const token = localStorage.token
        this.state = {
            token: token,
            routeId: props.routeData.routeId,
            routeName: props.routeData.routeName,
            schedule: props.routeData.schedule,
            time: props.routeData.time,
            carpooler: props.routeData.carpooler,
            cost: props.routeData.cost
        }
    }

    drawRoute(CreatedRoute) {
        const google = window.google;       
        const map = new google.maps.Map(document.getElementById("map"), {            
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

        return(
            <div className="border border-secondary rounded">
                <div id="map" className="map"></div>
                <Header name={this.state.routeName}/>        
                <div className="fixed-bottom">
                    <div className="container">
                        <div className="row justify-content-center mb-2">                
                            <div className="col-6 col-md-3">
                                <Link to="/myroutes" type="button" className="btn btn-secondary btn-block">Volver</Link>
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

export default ViewMyRoute