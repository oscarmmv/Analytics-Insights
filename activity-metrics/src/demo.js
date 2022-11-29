import React, {useState} from "react";
import "./scripts/mouseactivity/mouseactivity"
import metric from "./scripts/mouseactivity/demo-data"
import './demo.css';

class Demo extends React.Component {
    
    render() {
        var i = 1;
        return(
            <section className="analytics">
                <div id="metrics-wrapper">
                    <h1>Profile Views</h1>
                    <p>User Engagement Metrics</p>
                    <p className="metric">
                        <span className="d-inline-block" id="activity-score" onClick={console.log("hello")} >
                            {metric[i]}
                        </span>

                    </p>
                </div>
            </section>
        );
    }
}

export default Demo;``````````````````````````````````