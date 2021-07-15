import * as React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import { GearFill } from 'react-bootstrap-icons';
import WallpaperTypeSelector from './WallpaperTypeSelector/WallpaperTypeSelector';

import './Settings.css';

class Settings extends React.Component<any, any> {
    constructor(props: {}) {
        super(props);
        this.state = {
            show: false
        }
    }

    handleShow() {
        this.setState({ show: true });
    }

    handleClose() {
        this.setState({ show: false });
    }

    render() {
        return (
            <div className="settings">
                <Button variant="light" onClick={() => this.handleShow()} className="pull-btn position-absolute top-50 start-0 translate-middle">
                    <GearFill />
                </Button>
                <Offcanvas show={this.state.show} onHide={() => this.handleClose()}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Settings</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body className="settings-body">
                        Some text as placeholder. In real life you can have the elements you
                        have chosen. Like, text, images, lists, etc.

                        <WallpaperTypeSelector />

                        <Button variant="light" onClick={() => this.handleClose()} className="pull-btn position-absolute top-50 start-0 translate-middle">
                            <GearFill />
                        </Button>
                    </Offcanvas.Body>
                </Offcanvas>
            </div>
        );
    }
}

export default Settings