import SendSMS from 'react-native-sms-x';

var TargetNumber = "";
var Message = "";

export default class Sms {

    TextInputValue;
    TextInputNumber;
    constructor(){
        this.TextInputValue = "";
        this.TextInputNumber = "";
    }

    makeSMS(TargetNumber : string, Message : string){
        this.updateSmsNumber(TargetNumber)
        this.updateSmsValue(Message)
    }

    sendSMSFunction() {
        console.log(TargetNumber);
        SendSMS.send(123, TargetNumber.replace(/\s/g, ""), Message, null);
    }
    updateSmsNumber(value: string){
        this.TextInputNumber = value;
        TargetNumber = this.TextInputNumber;
        console.log(TargetNumber);
    
    }
    updateSmsValue(value: string){
        this.TextInputValue = value;
        Message = this.TextInputValue;
        console.log(Message);
    }
}

