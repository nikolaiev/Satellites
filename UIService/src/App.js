import React from 'react'
import {GoogleApiWrapper} from 'google-maps-react';
import {connect} from 'react-redux';
import Satellite from './components/Satellite'
import axios from "axios";


//const apiPostsRoute = window.location.protocol+"//"+window.location.hostname+"/news/";
//TODO implement
const apiPostsRoute = "http://localhost:8089/satellites/";

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.setPathToCreation = this.setPathToCreation.bind(this);
        this.setPathToDefault = this.setPathToDefault.bind(this);
        this.getData();
    }

    setPathToCreation(){
        window.location="#create"
    }

    setPathToDefault(){
        window.location="#"
    }

    getData() {
        this.getActualSatellitesData();
        setInterval(() => {
            this.getActualSatellitesData();
        }, 500);
    }

    getActualSatellitesData() {
        axios.get(apiPostsRoute)
            .then(res => {
                    this.addSatellitesToState(res);
                }
            )
    }

    addSatellitesToState(res) {
        this.props.onLoadData(res.data)
    }

    componentDidMount() {
        let myOptions = {
            zoom: 2,
            center: {lat: 10, lng: 10},
            panControl: false,
            streetViewControl: false,
        };

        this.map = new window.google.maps.Map(document.getElementById('map'), myOptions);
    }

    render() {
        let satellites = this.props.testStore.map( (data, index) => {
            return <Satellite key={index} data={data} map={this.map}/>
        });

        return (
            <div style={{height: "100%"}}>
                <button onClick={this.setPathToCreation} href="#create" style={{position: "absolute", zIndex: "2", margin:"5%"}} className="btn btn-warning">Create</button>
                <button onClick={this.setPathToDefault} href="#" style={{position: "absolute", zIndex: "2", margin:"5%",marginLeft:"150px"}} className="btn btn-warning">Hide</button>
                {satellites}
                <div style={{height: "100%"}} id="map"/>
            </div>
        );
    }
}

export const AppStateful = connect(
    //map state to props
    state => ({
        testStore: state
    }),
    dispatch => ({
        onLoadData: (postData) => {
            dispatch({type: 'GET_SATELLITES', 'payload': postData})
        }
    })
)(App);

export default GoogleApiWrapper({
    apiKey: ("AIzaSyDJJdejsBHZSffN73EYTWUcTExVwyrtHL4"),
    language: "ENG"
})(App)

