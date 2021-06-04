import { Link } from 'react-router-dom'

function Header() {
    return(
        <div className="fixed-top">
            <fieldset className="border border-secondary rounded bg-secondary">
                <h5 className="text-center text-secondary text-light">Ingresa el inicio y fin de tu recorrido:</h5>
                <form className="mb-1">
                    <div className="form-row">
                        <div className="col">
                            <input type="text" className="form-control" placeholder="Donde te subes"/>
                        </div>
                        <div className="col">
                            <input type="text" className="form-control" placeholder="Donde te bajas"/>
                        </div>
                    </div>
                </form>
            </fieldset>            
        </div>
    )
}

function Footer(props) {
    return(
        <div className="fixed-bottom">
            <div className="row justify-content-center mb-3">
                <Link to="/routes" type="button" className="btn btn-secondary mr-2">Volver</Link>          
                <button type="button" className="btn btn-success">Unirse</button>                                
            </div>
            <fieldset className="border border-secondary rounded bg-secondary">
                <form className="mb-1">
                    <div className="form-row">
                        <div className="col">
                            <label className="text-white">Horario:</label>
                            <input type="text" value={props.route.schedule} className="form-control" disabled/>
                        </div>
                        <div className="col">
                            <label className="text-white">Costo:</label>
                            <input type="text" value={props.route.cost} className="form-control" disabled/>
                        </div>
                    </div>
                </form>
            </fieldset> 
        </div>
    )
}

function RouteView(props) {
    //const route = props.location.state
    //console.log(route)
    return (
        <div className="border border-secondary rounded">
            <Header />        
            
            <Footer route={props.location.state} />
            
        </div>
    )
}

export default RouteView