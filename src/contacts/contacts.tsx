import Contacts from 'react-native-contacts';
import ContactInfo from './../contacts/ContactInfo';

var info = new ContactInfo(); 

export default class PhoneContacts{
    personen: Array<ContactInfo>   


constructor(){
    this.personen = new Array<ContactInfo>(); 
    this.returnContacts(); 
    
}

async returnContacts(){
     
    (await Contacts.getAll()).forEach(contact => {
        var x = contact.givenName + " " + contact.familyName; 
        contact.phoneNumbers.forEach(number => {
           var y = number.number; 
           info.setName(x); 
           info.setNumber(y); 
           this.personen.push(info);
        });

    });

    return this.personen; 
    
}

getAllContacts(){
    return this.personen;
}



}
