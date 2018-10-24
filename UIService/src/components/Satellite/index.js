import React from "react";
import "./Satellite.css";

class Satellite extends React.Component{

    render() {
        let _this = this;
        let data = this.props.data;
        let map = this.props.map;

        if(window[data.id]){
            window[data.id].setPosition(new window.google.maps.LatLng(data.lat, data.lng));
            window[data.id].setTitle(data.id+"; Долгота: " + data.lat + "  Широта: " + data.lng);
        }
        else{
            window[data.id] = new window.google.maps.Marker({
                position: {lat: data.lat, lng: data.lng},
                map: map,
                icon: {
                    url: "satellite.png",
                    scaledSize: new window.google.maps.Size(50, 50)
                },
                title: " Довгота: " + data.lat + "  Широта: " + data.lng
            });
            window[data.id].addListener('click',function () {
                window.location=`#info/${data.id}`;
            });
        }


        return (<span/>);
    }

    openInNewTab(url) {
        let win = window.open(url, '_blank');
        win.focus();
    }

}

export default Satellite;