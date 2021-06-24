import { Component } from 'react'
import { Formik } from 'formik'
import { Form, Col } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import ModalNewRoute from '../components/ModalNewRoute'
import currentPosition from '../images/gps.svg'
import * as yup from 'yup';
import './styles/CreateRoute.css'


const schema = yup.object().shape({
    routeOrigin: yup.string().required('Campo obligatorio'),
    routeDestination: yup.string().required('Campo obligatorio')
})

class CreateRoute extends Component {

    constructor(props) {
        super(props)
        this.state = {
            origin: '',
            destination: ''
        }
    }

    componentDidMount() {
        let map;
        let markers = [];
        const google = window.google;
        let mapOptions = {
            center: { lat: 6.2476, lng: -75.5658 },
            zoom: 12
        }
        map = new google.maps.Map(document.getElementById("map"), mapOptions);

        map.addListener("click", (event) => {
            if(markers.length < 2){
                addMarker(event.latLng);
                if(markers.length < 2) {
                    this.setState({origin: markers[0].getPosition().toString()})
                    console.log(this.state.origin)
                }else{
                    this.setState({destination: markers[1].getPosition().toString()})
                    console.log(this.state.destination)
                }
               
            }            
        });

        function addMarker(location) {
            const marker = new google.maps.Marker({
                position: location,
                map: map
            });
            markers.push(marker);
            
        }
        
        
    }

    render() {
        
    
    return(
        <div>
        <div id="map" className="map"></div>
            <fieldset className="border border-secondary rounded bg-dark fixed-top">
                <h5 className="text-center text-light">Ingresa inicio y fin de la ruta:</h5>
                <Formik
                    validationSchema={schema}
                    onSubmit={(values) => {
                        console.log(values)
                        
                    }}
                    initialValues={{
                        routeOrigin: '',
                        routeDestination: ''
                    }}
                >
                    {({                            
                            handleSubmit,
                            handleChange,
                            handleBlur,
                            values,
                            touched,
                            errors
                        }) => (
                            <Form onSubmit={handleSubmit}>                    
                            <Form.Row>                        
                                <Form.Group as={Col}>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Acá comienza"
                                        name="routeOrigin" 
                                        value={this.state.origin}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.routeOrigin && errors.routeOrigin}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.routeOrigin}
                                    </Form.Control.Feedback>
                                </Form.Group>                                
                                <Form.Group as={Col}>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Acá termina"
                                        name="routeDestination" 
                                        value={this.state.destination}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.routeDestination && errors.routeDestination}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.routeDestination}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>
                            
                            <div className="row justify-content-center fixed-bottom mb-3">    
                                <Link to="/cproutes" type="button" className="btn btn-secondary mr-2">Volver</Link>
                                <button type="button" className="btn btn-primary mr-2">Trazar ruta</button>            
                                <ModalNewRoute route={
                                    {routeOrigin: this.state.origin, 
                                    routeDestination: this.state.destination, 
                                    vehicleId: this.props.userData.vehicleId, 
                                    carpooler: this.props.userData.user}
                                }/>                                
                            </div>
                        </Form>
                        )}
                </Formik>
                
            </fieldset>
            <img src={currentPosition} className="position ml-4 mr-2 btn" alt="Locate me" />
        </div>
    )
    }
}

export default CreateRoute