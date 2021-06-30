import { Formik } from 'formik';
import { useState } from 'react'
import { withRouter } from "react-router-dom";
import {Modal, Button, Form, Row } from 'react-bootstrap'
import * as yup from 'yup';

const schema = yup.object().shape({
    plate: yup.string().required('Campo obligatorio'),
    brand: yup.string().required('Campo obligatorio')
})

// function refreshToken(token) {

//     fetch('http://localhost:4000/auth/refresh',{
//         method: 'GET',
//         headers:{
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//         }
//     })
//     .then(res => res.json())
//     .then(data => {
//         localStorage.token = data.data.accessToken
//     })
// }

function changeType(props) {

    fetch(`http://localhost:4000/user/${props.id}`,{
        method: 'PUT',
        body:JSON.stringify({userType: false}),
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.token}`
        }
    })
    .then(res => res.json())
    .then(() => {
        //refreshToken(localStorage.token)
    })
}

function saveVehicle(values, props) {

    changeType(props)
    const userId = {userId: props.id}    
    const vehicleData = {...userId, ...values}
    fetch('http://localhost:4000/vehicle',{
        method: 'POST',
        body:JSON.stringify(vehicleData),
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.token}`
        }
    })
    .then(res => res.json())
    .then(data => {
        if(data.message!=='Vehículo creado') {
            window.alert(data.message)
        }else{
            props.history.push('/cproutes')
        }        
    })    
    
      
}

function ModalNewVehicle(props) {
    const [show, setShow] = useState(false);  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button className="btn btn-primary" onClick={handleShow}>Ser carpooler</Button>
    
            <Modal show={show} onHide={handleClose} >
                <Modal.Header className="bg-dark" closeButton>
                <Modal.Title className="text-light" >Información del vehículo</Modal.Title>
                
                </Modal.Header>
                <Modal.Body>
                    <h6>Debes ingresar la información del vehículo con el que se prestará el servicio:</h6>
                    <Formik
                        validationSchema={schema}
                        onSubmit={(values, actions) => {                            
                            saveVehicle(values, props)
                            actions.setSubmitting(false);                            
                        }}
                        initialValues={{
                            plate: '',
                            brand: ''
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
                            <Form noValidate onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Label>Placa</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        name="plate" 
                                        value={values.plate}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.plate && errors.plate}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.plate}
                                    </Form.Control.Feedback>
                                </Form.Group>                     
                                <Form.Group>
                                    <Form.Label>Marca</Form.Label>
                                    <Form.Control 
                                        type="text"
                                        name="brand" 
                                        value={values.brand}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.brand && errors.brand}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.brand}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                
                                <Row className="justify-content-center">
                                    <Button variant="secondary mr-2" onClick={handleClose}>Volver</Button>          
                                    <Button variant="success" type="submit" >Aceptar</Button>  
                                </Row>                                                       
                            </Form>                            
                        )}                         
                    </Formik>                                          
                </Modal.Body>
            </Modal>
        </>
    );
}

export default withRouter(ModalNewVehicle)