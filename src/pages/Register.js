import { Component } from "react";
import { Link } from "react-router-dom";
import ModalTerms from '../components/ModalTerms';

class Register extends Component {
    render() {
        return (
            <div className="container">
                <div className="row d-flex justify-content-center mt-5">
                    <h4 className="text-black-50">Registrarse en Carpooling App</h4>
                </div>
                <div className="row d-flex justify-content-center mt-3">
                    <div className="col-12 col-md-6">
                        <form>
                            <div className="form-group">
                                <label className="text-danger">Correo Electrónico</label>
                                <input type="email" className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label className="text-danger">Número de Celular</label>
                                <input type="number" className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label className="text-danger">Nombre de Usuario</label>
                                <input type="text" className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label className="text-danger">Contraseña</label>
                                <input type="password" className="form-control"/>
                            </div>

                            <div className="form-group row">
                                <div className="col-sm-10">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox"/>
                                    <label className="form-check-label">
                                    Aceptar <ModalTerms/>
                                    </label>
                                </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col">
                                    <Link to='/' className="btn btn-danger btn-block">Cancelar</Link>
                                </div>
                                <div className="col">
                                    <Link to='/routes' className="btn btn-success btn-block">Aceptar</Link>
                                </div>
                            </div>
                            </form>
                    </div>
                </div>
                
            </div>

            
        )
    }
}

export default Register