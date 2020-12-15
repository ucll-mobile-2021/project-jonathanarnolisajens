import React, {useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {getDistance, getPreciseDistance} from 'geolib';

var TargetLat = 0;
var TargetLon = 0;
var Loopdis = 0;

var id = 0;

export default class Location{ 

    GpsLat: number;
    GpsLon: number;
    CurrentLat: number;
    CurrentLon: number;
    pdis;
    preciseDistance;
    TextTargetValue;
    constructor(){
        this.GpsLat = 0;
        this.GpsLon = 0;
        this.CurrentLat = this.getLat();
        this.CurrentLon = this.getLon();
        this.pdis = 0;
        this.preciseDistance = 0;
        this.TextTargetValue = "";
        this.getLocation();
    }



calculatePreciseDistance = () => {
    console.log(this.CurrentLat)
    console.log(this.CurrentLon)
    console.log(TargetLat)
    console.log(TargetLon)
    this.pdis = getPreciseDistance(
      {latitude: this.CurrentLat, longitude: this.CurrentLon},
      {latitude: TargetLat, longitude: TargetLon},
    );
    this.preciseDistance = this.pdis/1000
    Loopdis = this.pdis
  };
  
  getDistanceBetween(){
    this.calculatePreciseDistance()
    this.startTracking();
    console.log(this.preciseDistance + "KM")
    return this.preciseDistance + "KM"
  }

  getTargetLocationFromAPI = () => {
    //console.log(TextTargetValue.split(' ').join('%20'))
    return fetch('https://nominatim.openstreetmap.org/search.php?q=' + this.TextTargetValue.split(' ').join('%20') + '&format=json')
      .then((response) => response.text())
      .then((json) => {
        var jsonlat = json.split("lat\"")
        var jsonlon = json.split("lon\"")
        var tussenLat = jsonlat[1].split(',"')
        var tussenLon = jsonlon[1].split(',"')
        this.GpsLat = parseFloat(tussenLat[0].slice(2,))
        TargetLat = this.GpsLat
        this.GpsLon = parseFloat(tussenLon[0].slice(2,))
        TargetLon = this.GpsLon
        console.log("LAT: " + this.GpsLat)
        console.log("LON: " + this.GpsLon)
        return json;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  
  updateTargetLocation(value: string){
    this.TextTargetValue = value
    console.log(this.TextTargetValue)
  }

  getLon(){
    Geolocation.getCurrentPosition((position) => {
        this.CurrentLon = position.coords.longitude;
      });
      return this.CurrentLon;
  }
  getLat(){
    Geolocation.getCurrentPosition((position) => {
        this.CurrentLat = position.coords.latitude;
      });
      return this.CurrentLat;
  }

  setLon(coord: string){
    this.CurrentLon = parseFloat(coord);
  }

  setLat(coord: string){
    this.CurrentLat = parseFloat(coord);
  }

  getLocation(){
    Geolocation.getCurrentPosition((position) => {
      this.CurrentLat = position.coords.latitude;
      this.CurrentLon = position.coords.longitude;
      console.log("Your location = " + position.coords.latitude, position.coords.longitude);
    });
  }

  startTracking(){
    console.log("Current distance: " + Loopdis)
    var interval = setInterval(() => {
      if(Loopdis > 1000){
        console.log("Distance left: " + Loopdis)
        this.getLocation();
        console.log("New location: " + this.CurrentLat + " & " + this.CurrentLon)
        this.calculatePreciseDistance();
      }
      else{

        /** TODO
         * INSERT SEND SMS HERE
         */
        console.log("Arrived")
        clearInterval(interval);
      }
    }, 30000);
  }
}