import { Form, Col } from 'react-bootstrap'
import ModalNewRoute from '../components/ModalNewRoute'
import currentPosition from '../images/gps.svg'
import './styles/CreateRoute.css'

function RouteForm() {
    return(
        <div>
            <fieldset className="border border-secondary rounded bg-dark fixed-top">
                <h5 className="text-center text-light">Ingresa inicio y fin de la ruta:</h5>
                <Form>                    
                    <Form.Row>                        
                        <Form.Group as={Col}>
                            <Form.Control type="text" className="form-control" placeholder="Acá comienza"/>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Control type="text" className="form-control" placeholder="Acá termina"/>
                        </Form.Group>
                    </Form.Row>
                    
                    <div className="row justify-content-center fixed-bottom mb-3">    
                        <button to="/routes" type="button" className="btn btn-secondary mr-2">Volver</button>
                        <button type="button" className="btn btn-primary mr-2">Indicaciones</button>            
                        <ModalNewRoute type="button" className="btn btn-success">Crear</ModalNewRoute>                                 
                    </div>
                </Form>
            </fieldset>
            <img src={currentPosition} className="position ml-4 mr-2 btn" alt="Locate me" />
        </div>
    )
}

function CreateRoute() {

    return (
        <div>
            <RouteForm />
            
        </div>
    )
}

export default CreateRoute