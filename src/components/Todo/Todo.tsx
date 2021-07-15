import * as React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import { ListTask } from 'react-bootstrap-icons';

import './Todo.css';

class Todo extends React.Component<any, any> {
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
            <div className="todo">
                <Button variant="light" onClick={() => this.handleShow()} className="pull-btn position-absolute top-50 end-0 translate-middle">
                    <ListTask />
                </Button>
                <Offcanvas placement="end" show={this.state.show} onHide={() => this.handleClose()}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Todo</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body className="todo-body">
                        Some text as placeholder. In real life you can have the elements you
                        have chosen. Like, text, images, lists, etc.

                   

                        <Button variant="light" onClick={() => this.handleClose()} className="pull-btn position-absolute top-50 end-0 translate-middle">
                            <ListTask />
                        </Button>
                    </Offcanvas.Body>
                </Offcanvas>
            </div>
        );
    }
}

export default Todo