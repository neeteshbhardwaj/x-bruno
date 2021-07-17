import * as React from 'react';
import Offcanvas, { OffcanvasPlacement } from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import {ListTask} from 'react-bootstrap-icons';
import './TodoSidebar.css';

interface Props {
}

const TodoSidebar: React.FC<Props> = ({
    children
}) => {
    const [show, setShow] = React.useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <div className="todo-sidebar">
            <Button variant="light" onClick={handleShow} className="pull-btn position-absolute top-50 end-0 translate-middle">
                <ListTask />
            </Button>
            <Offcanvas placement="end" show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Todo</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="todo-sidebar-body">
                    {children}
                    <Button variant="light" onClick={handleClose} className="pull-btn position-absolute top-50 end-0 translate-middle">
                    <ListTask />
                    </Button>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}

export default TodoSidebar;