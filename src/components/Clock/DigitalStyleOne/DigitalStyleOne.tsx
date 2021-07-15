import * as React from "react";
import "./DigitalStyleOne.css";

class DigitalStyleOne extends React.Component<any, any> {
    constructor(props: {}) {
        super(props);
        this.state = this.getTimeComponents();
    }

    getTimeComponents() {
        const now = new Date();
        return {
            hour: now.getHours(),
            min: now.getMinutes(),
            sec: now.getSeconds()
        };
    }

    componentDidMount() {
        setInterval(() => this.setState(this.getTimeComponents()), 1000);
    }

    render() {
        return (
            <div className="clock-container digital-style-one position-absolute top-50 start-50 translate-middle">
                <span className="hour">{this.state.hour}</span>
                <span className="colon">:</span>
                <span className="min">{this.state.min}</span>
            </div>
        );
    }
}

export default DigitalStyleOne