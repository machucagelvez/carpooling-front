import { Component } from "react";
import { Link } from "react-router-dom";
import ModalTerms from '../components/ModalTerms';

class Register extends Component {

    constructor(props){
        super(props)
        this.state = {
            email: '',
            phone: '',
            user: '',
            password: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        fetch('http://localhost:4000/user',{
            method: 'POST',
            body:JSON.stringify(this.state),
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            this.setState({ //NO se está borrando en pantalla
                email: '',
                phone: '',
                user: '',
                password: ''
            })
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row d-flex justify-content-center mt-5">
                    <h4 className="text-black-50">Registrarse en Carpooling App</h4>
                </div>
                <div className="row d-flex justify-content-center mt-3">
                    <div className="col-12 col-md-6">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label className="text-danger">Correo Electrónico</label>
                                <input 
                                type="email" name="email" className="form-control"
                                onChange={this.handleChange} value={this.setState.email}
                                />
                            </div>
                            <div className="form-group">
                                <label className="text-danger">Número de Celular</label>
                                <input 
                                type="number" name="phone" className="form-control"
                                onChange={this.handleChange} value={this.setState.phone}
                                />
                            </div>
                            <div className="form-group">
                                <label className="text-danger">Nombre de Usuario</label>
                                <input 
                                type="text" name="user" className="form-control"
                                onChange={this.handleChange} value={this.setState.user}
                                />
                            </div>
                            <div className="form-group">
                                <label className="text-danger">Contraseña</label>
                                <input 
                                type="password" name="password" className="form-control"
                                onChange={this.handleChange} value={this.setState.password}
                                />
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
                                    <button type="submit" className="btn btn-success btn-block">Aceptar</button>
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