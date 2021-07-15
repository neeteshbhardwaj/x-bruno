import * as React from "react";
import "./AnalogStyleOne.css";

class AnalogStyleOne extends React.Component<any, any> {
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
        const hourAngle = (this.state.hour * 60 + this.state.min) * .5;
        const minAngle = this.state.min * 6;
        const secAngle = this.state.sec * 6;
        return (
            <div className="clock-container analog-style-one position-absolute top-50 start-50 translate-middle">
                <div className="clock">
                    <div className="hour">
                        <div className="hr" style={{ transform: `rotateZ(${hourAngle}deg)` }}></div>
                    </div>
                    <div className="min">
                        <div className="mn" style={{ transform: `rotateZ(${minAngle}deg)` }}></div>
                    </div>
                    <div className="sec">
                        <div className="sc" style={{ transform: `rotateZ(${secAngle}deg)` }}></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AnalogStyleOne