import { Formik } from 'formik';
import { useState } from 'react'
import { withRouter } from "react-router-dom";
import {Modal, Button, Form, Col, Row } from 'react-bootstrap'
import * as yup from 'yup';

const schema = yup.object().shape({
    routeName: yup.string().required('Campo obligatorio'),
    schedule: yup.string().required('Campo obligatorio'),
    time: yup.string().required('Campo obligatorio'),
    cost: yup.number().required('Campo obligatorio'),
    spaces: yup.number().required('Campo obligatorio')
})

function saveRoute(values, props) {   
    const emptySpaces = values.spaces 
    const completeRoute = {...props.route, ...values, emptySpaces}
    fetch('http://localhost:4000/route',{
            method: 'POST',
            body:JSON.stringify(completeRoute),
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.message!=='Ruta creada') {
                window.alert(data.message)
            }else{
                props.history.push('/cproutes')
            }
            
        })
}

function ModalNewRoute(props) {
    const [show, setShow] = useState(false);  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button className="btn btn-success" onClick={handleShow}>Crear</Button>
    
            <Modal show={show} onHide={handleClose} >
                <Modal.Header className="bg-dark" closeButton>
                <Modal.Title className="text-light" >Información de la ruta</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        validationSchema={schema}
                        onSubmit={(values, actions) => {                            
                            saveRoute(values, props)
                            actions.setSubmitting(false);                            
                        }}
                        initialValues={{
                            routeName: '',
                            schedule: '',
                            time: '',
                            cost: '',
                            spaces: ''
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
                                    <Form.Label>Nombre de la ruta</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Barrio/sector inicio - Barrio/sector fin"
                                        name="routeName" 
                                        value={values.routeName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.routeName && errors.routeName}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.routeName}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Row>                        
                                    <Form.Group as={Col}>
                                        <Form.Label>Fecha de salida</Form.Label>
                                        <Form.Control 
                                            type="date"
                                            name="schedule" 
                                            value={values.schedule}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={touched.schedule && errors.schedule}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.schedule}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>Hora de salida</Form.Label>
                                        <Form.Control 
                                            type="time" 
                                            name="time" 
                                            value={values.time}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={touched.time && errors.time}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.time}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Costo</Form.Label>
                                        <Form.Control 
                                            type="number" 
                                            name="cost" 
                                            value={values.cost}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={touched.cost && errors.cost}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.cost}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>Puestos</Form.Label>
                                        <Form.Control 
                                            type="number" 
                                            name="spaces" 
                                            value={values.spaces}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={touched.spaces && errors.spaces}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.spaces}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Form.Row>
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

export default withRouter(ModalNewRoute)