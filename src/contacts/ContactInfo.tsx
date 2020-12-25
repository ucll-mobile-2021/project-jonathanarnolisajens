export default class ContactInfo{
    name: string;
    number: string;

    constructor(){
        this.name = "";
        this.number = ""; 
    }

setName(name :string){
    this.name = name; 
}

setNumber(number :string){
    this.number = number; 
}

getName(){
    return this.name;
}

getNumber(){
    return this.number; 
}

}