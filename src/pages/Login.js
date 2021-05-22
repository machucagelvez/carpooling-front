import { Component } from "react";
import {Link} from 'react-router-dom'
import logo from '../images/car.png'
import './styles/Login.css'


class Login extends Component {
    render() {
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
                        <form>
                            <div className="form-group">
                                <label className="text-danger">Correo Electrónico:</label>
                                <input type="email" className="form-control" placeholder="Ingrese el correo"/>
                            </div>
                            <div className="form-group">
                                <label className="text-danger">Contraseña:</label>
                                <input type="password" className="form-control" placeholder="Ingrese la contraseña"/>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="row d-flex justify-content-center mt-2">
                    <div className="col-12 col-md-6">
                        <Link to='/routes' className="btn btn-success btn-block">Iniciar Sesión</Link>
                    </div>                    
                </div>
                <div className="row d-flex justify-content-center mt-2">
                    <Link to='/register' className="text-danger">Registrarse</Link>
                </div>
                
                
                

            </div>
        )
    }
}

export default Login