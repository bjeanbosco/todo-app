import { Modal, Button, Form } from 'react-bootstrap';
import {FaPlusCircle} from 'react-icons/fa'

const MODAL = ({show,handleClose, handleSubmit,handleShow, handleInputChange,name,text}) => {
  
 

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <FaPlusCircle/>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>My Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formInput">
            <Form.Control
              type="text"
              placeholder={text}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {name}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MODAL;
