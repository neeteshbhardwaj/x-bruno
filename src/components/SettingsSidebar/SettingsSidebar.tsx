import * as React from 'react';
import Offcanvas, { OffcanvasPlacement } from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import {GearFill} from 'react-bootstrap-icons';
import './SettingsSidebar.css';

interface Props {
}

const SettingsSidebar: React.FC<Props> = ({
    children
}) => {
    const [show, setShow] = React.useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    return (
        <div className="settings-sidebar">
            <Button variant="light" onClick={handleShow} className="pull-btn position-absolute top-50 start-0 translate-middle">
                <GearFill />
            </Button>
            <Offcanvas placement="start" show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Settings</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="settings-sidebar-body">
                    {children}
                    <Button variant="light" onClick={handleClose} className="pull-btn position-absolute top-50 start-0 translate-middle">
                    <GearFill />
                    </Button>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}

export default SettingsSidebar;