import Location from "./../location/Location";

var Loc: Location;

export default class LocationRule{
    
    contact: string;
    message: string;
    inpD: number;
    destination: string;


    constructor(){
        this.contact = "";
        this.message = "";
        this.inpD = 1000;
        this.destination = "";
    }

    setContact(contact: string){
        this.contact = contact;
    }

    setMessage(message: string){
        this.message = message;
    }

    setDestination(destination: string){
        this.destination = destination;
    }

    createRule(){
        Loc = new Location(this.inpD);
        Loc.setDestination(this.destination);
        Loc.getTargetLocationFromAPI();
        Loc.getDistanceBetween();
    }

}

/** WIP */