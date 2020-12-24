import Sms from "./Sms"


// var smsvalue = new Sms();
// var smsvalue = "";

export default class SmsRule {
    title :string;
    value :string;
    constructor(title :string, value :string){
        this.title = title;
        this.value = value;
    }

    setTitle(title :string){
        if(title != "" && title != null){
            this.title = title;
        }
    }
    
    setValue(value :string){
        if(value != "" && value != null){
            this.value = value;
        }
    }

    getTitle(){
        return this.title;
    }
    getValue(){
        return this.value;
    }
}