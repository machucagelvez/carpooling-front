//import { Link } from 'react-router-dom'
import currentPosition from '../images/gps.svg'
import './styles/CreateRoute.css'

function SearchBar() {
    return(
        <div className="fixed-top">
            <fieldset className="border border-secondary rounded bg-dark">
                <h5 className="text-center text-secondary text-light">Ingresa el inicio y fin de la ruta:</h5>
                <form className="mb-1">
                    <div className="form-row">
                        <div className="col">
                            <input type="text" className="form-control" placeholder="Acá comienza"/>
                        </div>
                        <div className="col">
                            <input type="text" className="form-control" placeholder="Acá termina"/>
                        </div>
                    </div>
                </form>
            </fieldset>            
        </div>
    )
}

function ActionButtons() {
    return(
        <div >
            <div>
                <img src={currentPosition} className="position ml-4 mr-2 btn" alt="Locate me" />
            </div>
            <div className="row justify-content-center fixed-bottom mb-3">
                <div>
                    <button to="/routes" type="button" className="btn btn-secondary mr-2">Volver</button>
                    <button type="button" className="btn btn-primary mr-2">Indicaciones</button>            
                    <button type="button" className="btn btn-success">Crear</button>                                
                </div>  
            </div>                   
        </div>
    )
}

function CreateRoute() {

    return (
        <div>
            <SearchBar />        
            
            <ActionButtons />
            
        </div>
    )
}

export default CreateRoute