import Sms from "./Sms"


// var smsvalue = new Sms();
// var smsvalue = "";

export default class SmsRule {
    title :string;
    //Name is actually value in this case. But this name was necessary for the dropdown.
    name :string;
    
    constructor(title :string, value :string){
        this.title = title;
        this.name = value;
    }

    setTitle(title :string){
        if(title != "" && title != null){
            this.title = title;
        }
    }
    
    setValue(value :string){
        if(value != "" && value != null){
            this.name = value;
        }
    }

    getTitle(){
        return this.title;
    }
    getValue(){
        return this.name;
    }
}