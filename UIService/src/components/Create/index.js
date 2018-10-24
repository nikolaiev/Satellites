import React from "react";
import { Button } from 'react-bootstrap';

import $ from 'jquery'

class Create extends React.Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        $("#post-btn").click(function () {
            $.post("http://localhost:8085/startSatellite/", $("#myForm").serialize(), function (data) {
                window.location="#"
            })
        });
    }

    render() {
        return (<div>
            <link rel="stylesheet" type="text/css" href="./css/index.css"/>
            <div className="center" style={{width:"50%", margin:"auto"}}>
                <h3>Please enter Satellite data to add it into the our system</h3>
                <form id="myForm">
                    <div className="form-group">
                        <input type="text" className="form-control" name="id" placeholder="Satellite Name"/>
                    </div>
                    <div className="form-group">
                        <input type="number" className="form-control" name="lat" placeholder="lat"/>
                    </div>
                    <div className="form-group">
                        <input type="number" className="form-control" name="lng" placeholder="lng"/>
                    </div>
                    <div className="form-group">
                        <input type="number" className="form-control" name="height" placeholder="height"/>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" name="cosX" placeholder="cosX"/>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" name="cosY" placeholder="cosY"/>
                    </div>
                    <Button id="post-btn" className="btn btn-primary" onClick={this.handleClick} value="Submit">Create</Button>
                </form>
            </div>
        </div>)
    }
}

export default Create;