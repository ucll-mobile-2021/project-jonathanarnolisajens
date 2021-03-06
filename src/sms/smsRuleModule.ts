import SmsRule from "./SmsRule";
import React, { useState } from 'react';

export module smsRuleModule {
    
    let rule = new SmsRule("Informal greeting", "Hey!")
    let rule2 = new SmsRule("Morning greeting", "Good morning")

    let arrSms : Array<SmsRule> = [rule, rule2];
    var title : string;
    var message : string;
  
    export function updateTitle(ttl : string){
        title = ttl
    }
    export function updateMessage(mss : string){
       message = mss
    }
    export function makeSms(){
       let rule = new SmsRule(title, message)
       arrSms.push(rule)
       console.log(arrSms)
       title = ""
       message = ""
    }

    export function getAllSmsRules(){
        return arrSms
    }

    export function deleteSms(name :string){
        for (var sms in arrSms){
            if (arrSms[sms].getTitle() == name){
                arrSms.splice(Number(sms), 1)
            }
        }
    }
    
}