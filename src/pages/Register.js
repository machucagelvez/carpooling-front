import { Formik } from "formik";
//import { Component } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
//import ModalTerms from '../components/ModalTerms';
import * as yup from 'yup';


const schema = yup.object().shape({
    email: yup.string().email('Debe ser un email válido').required('El correo es obligatorio'),
    phone: yup.number().required('El número de celular es obligatorio'),
    user: yup.string().required('El usuario es obligatorio'),
    password: yup.string().required('La contraseña es obligatoria'),
    terms: yup.bool().required().oneOf([true], 'Se deben aceptar los términos y condiciones')
})

function Register() {

    // constructor(){
    //     super()
    //     this.state = {
    //         email: '',
    //         phone: '',
    //         user: '',
    //         password: ''
    //     }

    //     this.handleChange = this.handleChange.bind(this)
    //     this.addUser = this.addUser.bind(this)
    // }

    // handleChange(event) {
    //     const {name, value} = event.target
    //     this.setState({
    //         [name]: value
    //     })
    // }

    function AddUser(props) {
        
        //event.preventDefault()
        fetch('http://localhost:4000/user',{
            method: 'POST',
            body:JSON.stringify(props),
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.message!=='Usuario creado') {
                return window.alert(data.message)
            }else{
                return console.log(data)
            }
            
        })
        
    }

    return (
        <Container>
            <h4 className="text-black-50 text-center mt-5">Registrarse en Carpooling App</h4>
            <Formik
                validationSchema={schema}
                onSubmit={AddUser}
                initialValues={{
                    email: '',
                    phone: '',
                    user: '',
                    password: '',
                    terms: false,
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
                    
                    <Row className="justify-content-center">
                        <Col className="col-12 col-md-6">
                            <Form noValidate onSubmit={handleSubmit}>  
                                <Form.Group controlId="validationFormik01">
                                    <Form.Label>Correo Electrónico</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.email && errors.email}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="validationFormik02">
                                    <Form.Label>Número de Celular</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="phone"
                                        value={values.phone}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.phone && errors.phone}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.phone}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="validationFormik03">
                                    <Form.Label>Nombre de Usuario</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="user"
                                        value={values.user}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.user && errors.user}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.user}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="validationFormik04">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.password && errors.password}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.password}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Check
                                    required
                                    name="terms"
                                    label="Aceptar términos y condiciones"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={touched.terms && errors.terms}
                                    feedback={errors.terms}
                                    id="validationFormik0"
                                    />
                                </Form.Group>
                                <div className="form-row">
                                    <div className="col">
                                        <Link to='/' className="btn btn-danger btn-block">Cancelar</Link>
                                    </div>
                                    <div className="col">
                                        <Button type="submit" className="btn btn-success btn-block">Aceptar</Button>
                                    </div>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                    )}
            </Formik>
        </Container>            
    )
    
}

export default Register