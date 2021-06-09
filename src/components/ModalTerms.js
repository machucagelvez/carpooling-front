import { useState } from 'react'
import { Link } from "react-router-dom";
import {Modal, Button} from 'react-bootstrap'

function ModalTerms() {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <label onClick={handleShow}>
          Aceptar <Link to="#" className="text-secondary">términos y condiciones</Link>
        </label>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Términos y condiciones</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Enuma ilu awiluma
            Ardu Shamash apkallu baru
            Nergal ina ramanisu
            Annu ki-utu-kam ilu.</p>
            
            <p>Parak simati
            Muballit mitte
            Nergal allatu mellamu mesaru
            La tapallah Annuaki
            Kettu Puluthu qillatu.</p>            
            
            <p>Erset la tari eimmu
            Ina ramanisu melammu
            Baru dinau
            Allatu Nergal
            Sar kissati.</p>            
            
            <p>Nergal allatua
            Allatu Adapa
            Ina ramaniusue.</p>                        
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  export default ModalTerms