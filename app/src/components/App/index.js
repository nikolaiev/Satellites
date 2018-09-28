import React from 'react'
import {GoogleApiWrapper} from 'google-maps-react';
import {Box} from '../Box'

export class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show: true,
            Lat: 0,
            Lng: 0
        }
        this.hide = this.hide.bind(this);
    }


    hide() {
        this.setState({
            show: false
        })
        //document.location.href=[i] + '.html';
    }

    componentDidMount() {
        let number = 10;
        let someLat = 0;
        let someLng = 0;

        let uluru = [];

        for (let i = 0; i < number; i++) {
            uluru[i] = {lat: someLat, lng: someLng};
            someLng += 10;
        }

        function initialise() {
            let myOptions = {
                zoom: 2,
                center: uluru[0],

            };

            let map = new window.google.maps.Map(document.getElementById('map'), myOptions);

            let manymarker = [number];

            for (let i = 0; i < number; i++) {
                manymarker[i] = new window.google.maps.Marker({
                    position: uluru[i],
                    map: map,
                    icon: {
                        url: "1.png",
                        scaledSize: new window.google.maps.Size(64, 64)
                    },
                    title: " Долгота: " + uluru[i].lat + "  Широта: " + uluru[i].lng
                });

                manymarker[i].addListener('click',function () {
                    
                });
            }


            //marker.setMap( map );
            moveMarker(map, manymarker);

        }

        function moveMarker(map, manymarker) {
            var i = 0;
            //delayed so you can see it move
            let timeOut = setTimeout(function tik() {
                for (let k = 0; k < number; k++) {
                    manymarker[k].setPosition(new window.google.maps.LatLng(uluru[k].lat = +i, uluru[k].lng));
                    manymarker[k].setTitle("Долгота: " + uluru[k].lat + "  Широта: " + uluru[k].lng);
                    //   map.panTo( new google.maps.LatLng( 60, 60 ) );
                }

                i += 5;

                if (i < 40) {
                    setTimeout(tik, 1500);
                }
            }, 1500);
        };

        initialise();
    }

    render() {
        return (
            <div style={{height: "100%"}}>
                    <button style={{position: "absolute", zIndex: "2"}}onClick={this.hide}>Close</button>
                {this.state.show && <Box/>}
                <div style={{height: "100%"}} id="map"/>
            </div>
        );
    }
}


export default GoogleApiWrapper({
    apiKey: ("AIzaSyDJJdejsBHZSffN73EYTWUcTExVwyrtHL4")
})(App)
