import Location from "./../location/Location";

var Loc: Location;

export default class LocationRule{
    
    contact: string;
    message: string;
    inpD: number;
    destination: string;


    constructor(){
        this.contact = "0494452593";
        this.message = "Default constructor message";
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
        console.log(this.destination)
    }

    getDestination(){
        return this.destination.toString();
    }

    createRule(){
        Loc = new Location();
        Loc.getTargetLocationFromAPI("Heverlee");
        Loc.getDistanceBetween();
    }

}

/** WIP */