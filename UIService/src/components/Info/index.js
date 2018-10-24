import React from "react";
import axios from "axios";

const apiPostsRoute = "http://localhost:8089/satellite/"

class Info extends React.Component {
    constructor(props) {
        super(props);
        this.getActualData(this.getURLParameter("satlName"));
    }

    componentWillReceiveProps(nextProps, prevState) {
        console.log(nextProps.match.params)
        if (nextProps.match.params.satlName !== prevState.satlName) {
            this.setState(() => ({
                satlName: nextProps.match.params.satlName
            }));
            this.getActualData(nextProps.match.params.satlName);
        }
    }

    getActualData(satlName) {
        console.log(satlName)
        axios.get(apiPostsRoute + satlName)
            .then(res => {
                    this.setState((state) => (res));
                }
            )
    }

    getURLParameter(sParam) {
        let location = window.location.toString();
        return location.split("/").pop();
    }


    render() {
        return (<div>
            <link rel="stylesheet" type="text/css" href="./css/index.css"/>
            <div className="center" style={{width: "50%", margin: "auto"}}>
                <h3>Information about chosen satellite</h3>
                <span className="label label-info">id</span>
                 <label className="form-control" name="id">{this.state ? this.state.data.id : ''}</label>
                <span className="label label-info">lat</span>
                <label className="form-control" name="lat">{this.state ? this.state.data.lat : ''}</label>
                <span className="label label-info">lng</span>
                <label className="form-control" name="lng">{this.state ? this.state.data.lng : ''}</label>
                <span className="label label-info">height</span>
                <label className="form-control" name="height">{this.state ? this.state.data.height : ''}</label>
                <span className="label label-info">cosX</span>
                <label className="form-control" name="cosX">{this.state ? this.state.data.cosX : ''}</label>
                <span className="label label-info">cosY</span>
                <label className="form-control" name="cosY">{this.state ? this.state.data.cosY : ''}</label>
            </div>
        </div>)
    }
}

export default Info;