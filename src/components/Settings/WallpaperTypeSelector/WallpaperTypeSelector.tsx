import * as React from 'react';
import { ButtonGroup, Button, Image } from 'react-bootstrap';

class WallpaperTypeSelector extends React.Component<any, any> {
    constructor(props: {}) {
        super(props);
    }


    render() {
        return (
            <div className="sidebar">
                <ButtonGroup size="lg" className="mb-2">
                    <Button>
                        <Image src="https://via.placeholder.com/150" thumbnail />
                    </Button>
                    <Button>
                        <Image src="https://via.placeholder.com/150" thumbnail />
                    </Button>
                    <Button>
                        <Image src="https://via.placeholder.com/150" thumbnail />
                    </Button>
                </ButtonGroup>
            </div>
        );
    }
}

export default WallpaperTypeSelector