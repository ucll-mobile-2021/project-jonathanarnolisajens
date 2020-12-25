import Sms from "./Sms"


// var smsvalue = new Sms();
// var smsvalue = "";

export default class SmsRule {
    name :string;
    value :string;
    
    constructor(title :string, value :string){
        this.name = title;
        this.value = value;
    }

    setTitle(title :string){
        if(title != "" && title != null){
            this.name = title;
        }
    }
    
    setValue(value :string){
        if(value != "" && value != null){
            this.value = value;
        }
    }

    getTitle(){
        return this.name;
    }
    getValue(){
        return this.value;
    }
}