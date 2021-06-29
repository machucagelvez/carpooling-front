import { Formik } from "formik";
import { Form, Button } from "react-bootstrap";
import {Link} from 'react-router-dom'
import logo from '../images/car.png'
import './styles/Login.css'
import * as yup from 'yup';

const schema = yup.object().shape({
    email: yup.string().email('Debe ser un email válido').required('Campo obligatorio'),
    password: yup.string().required('Campo obligatorio')
})

function signIn(values, props) {
    fetch('http://localhost:4000/auth/login',{
            method: 'POST',
            body:JSON.stringify(values),
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.message!=='Login exitoso') {
                window.alert(data.message)
            }else{
                localStorage.token = data.data.accessToken
                props.history.push('/routes')
            }            
        })
}

function Login(props) {
    return (
        <div className="container">
            <div className="row d-flex justify-content-center mt-5">                    
                <img src={logo} alt="car-logo" />
            </div>
            <div className="row d-flex justify-content-center">                    
                <h3 className="text-black-50 font-weight-bold">Carpooling App</h3>
            </div>
            <div className="row d-flex justify-content-center mt-3">
                <div className="col-12 col-md-6">
                    <Formik
                        validationSchema={schema}
                        onSubmit={(values, actions) => { 
                            signIn(values, props)
                            actions.setSubmitting(false)
                        }}
                        initialValues={{
                            email: '',
                            password: ''
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
                                    <Form.Label className="text-secondary">Correo Electrónico:</Form.Label>
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
                                <Form.Group>
                                    <Form.Label className="text-secondary">Contraseña:</Form.Label>
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
                                <Button variant="success btn-block" type="submit" >Iniciar Sesión</Button> 
                            </Form>
                        )}                                    
                    </Formik>                        
                </div>
            </div>                
            <div className="row d-flex justify-content-center mt-2">
                <Link to='/register' className="text-danger">Registrarse</Link>
            </div>
        </div>
    )
}

export default Login