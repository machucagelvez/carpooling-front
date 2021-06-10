import { Navbar } from 'react-bootstrap'

function Menu() {

    return(
       
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">

                
            </Navbar.Collapse>
        </Navbar>
       
    )
}

export default Menu