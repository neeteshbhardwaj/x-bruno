import * as React from "react";
import "./Clock.css";
import AnalogStyleOne from "./AnalogStyleOne/AnalogStyleOne";
import DigitalStyleOne from "./DigitalStyleOne/DigitalStyleOne";


class Clock extends React.Component<any, any> {
    constructor(props: {}) {
        super(props);
    }

    componentDidMount() {
    }


    render() {
        return (
            <div>
                <DigitalStyleOne />
            </div>
        );
    }
}



export default Clock