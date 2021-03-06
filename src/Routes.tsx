import React, { useReducer, useState, Fragment, useEffect } from 'react';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native';
import { Text, View, Button, TextInput, StatusBar, SafeAreaView, ScrollView, Image, StyleSheet } from 'react-native';
import { RouteDrawerParamList, RouteParamList } from './RouteParamList';
import { styles } from './style/style'
import { ownStyle } from './style/style'
import { TouchableOpacity } from 'react-native'
import { DifTimer } from "./timer/Timer"
import { smsRuleModule } from "./sms/smsRuleModule"
import { FlatList } from "react-native"
interface RoutesProps { }

export const Routes: React.FC<RoutesProps> = ({ }) => {

  const Drawer = createDrawerNavigator<RouteParamList>();

  /** Voor een extra Navigatie item maak een <Drawer.Screen name="x" component={x} /> in onderstaande return
   * Maak daan een functie x({navigation,route}: RouteDrawerParamList<"x">) aan
   * in de return voeg je 
   *  <TouchableOpacity onPress={navigation.openDrawer} style={ownStyle.buttonNav}><Image style={ownStyle.photo} source={require("./images/navlogo.png")} /></TouchableOpacity>
   * toe, deze knop toggled de navbar
   * ga naar RouteParamList.tsx en volg de comments daar
  */

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Normal SMS">
        <Drawer.Screen name="Normal SMS" component={Home} />
        <Drawer.Screen name="Template SMS" component={YEET} />
        <Drawer.Screen name="View SMS rule" component={ShowSmsRule} />
        <Drawer.Screen name="New SMS rule" component={SMSRule} />
        <Drawer.Screen name="Location Rule" component={DistanceTracking} />
        <Drawer.Screen name="Timed SMS" component={TimedSms} />
        <Drawer.Screen name="Receive sms for GPS" component={ReceiveSms} /> 
      </Drawer.Navigator>
    </NavigationContainer>
  )
}


export function preset() {

  const [resultItem, setResult] = React.useState("");
  const [resultContact, setContact] = React.useState("");

  var items = smsRuleModule.getAllSmsRules()
  var contacts: PhoneContacts = new PhoneContacts();
  var cl = contacts.getAllContacts();

  var contactSMS: Sms = new Sms();

  

  return (
    <View>
      <View>
        <Fragment>
          {/**De dropdown met een hoop informatie.
               * 
               * Belangrijkste elementen:
               *    onItemSelect: wordt uitgevoerd wanneer je op een item klikt
               *    items: De items die tevoorschijn komen (items is een array met SmsRule objecten. De name parameter is altijd degene die getoont word )
               * 
               * Library die ik gebruik: https://github.com/zubairpaizer/react-native-searchable-dropdown/blob/master/readme.md
               */}
          <SearchableDropdown
            onItemSelect={(item: SmsRule) => {
              /**Logt de Sms rule die geselecteerd is uit de dropdown */
              /**Hier moet dan de code komen om de message er uit te halen om dan in de SMS te steken. */
              console.log(item)
              setResult(item.getValue());
            }}
            items={items}
            containerStyle={{ padding: 5 }}
            itemTextStyle={{ color: '#222' }}
            itemStyle={{
              padding: 10,
              marginTop: 2,
              backgroundColor: '#ddd',
              borderColor: '#bbb',
              borderWidth: 1,
              borderRadius: 5,
            }}
            resetValue={false}
            chip={true}

            textInputProps={
              {
                placeholder: "Select message",
                underlineColorAndroid: "transparent",
                style: {
                  padding: 12,
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 5,
                },

              }
            }
            listProps={
              {
                nestedScrollEnabled: true,
              }
            }

          />
          <Text>{resultItem}</Text>


        </Fragment>
      </View>
      <View>



        <Fragment>
          <SearchableDropdown
            onItemSelect={(item: ContactInfo) => {
              /**Logt de Sms rule die geselecteerd is uit de dropdown */
              /**Hier moet dan de code komen om de message er uit te halen om dan in de SMS te steken. */
              console.log(item)
              setContact(item.getNumber());
            }}
            items={cl}
            containerStyle={{ padding: 5 }}
            itemTextStyle={{ color: '#222' }}
            itemStyle={{
              padding: 10,
              marginTop: 2,
              backgroundColor: '#ddd',
              borderColor: '#bbb',
              borderWidth: 1,
              borderRadius: 5,
            }}
            resetValue={false}
            chip={true}

            textInputProps={
              {
                placeholder: "Select contact",
                underlineColorAndroid: "transparent",
                style: {
                  padding: 12,
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 5,
                },

              }
            }
            listProps={
              {
                nestedScrollEnabled: true,
              }
            }

          />
          <Text>{resultContact}</Text>

          {contactSMS.makeSMS(resultContact, resultItem)}
          {console.log(contactSMS.TextInputNumber + "\t" + contactSMS.TextInputValue)}
          <Button title={"Send SMS"} onPress={contactSMS.sendSMSFunction} />


        </Fragment>
      </View>
    </View>
  )
}




/** Homescreen */

declare const global: { HermesInternal: null | {} };
import Sms from './sms/Sms'


var SMS: Sms = new Sms();
function Home({ navigation, route }: RouteDrawerParamList<"Normal SMS">) {

  var items = smsRuleModule.getAllSmsRules()


  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>

        <TouchableOpacity onPress={navigation.openDrawer} style={ownStyle.buttonNav}><Image style={ownStyle.photo} source={require("./images/navlogo.png")} /></TouchableOpacity>

        <ScrollView
          keyboardShouldPersistTaps='handled'
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Send a regular SMS</Text>
              <Text style={styles.sectionDescription}>
                use the button <Text style={styles.highlight}>Send SMS</Text> to send a text to a person
              </Text>


              <Text style={{ paddingTop: 30 }}>
                Message:
            </Text>
              <TextInput
                placeholder={"Message"}
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => SMS.updateSmsValue(text)
                }

              />

              <Text style={{ paddingTop: 30 }}>
                Phone number:
            </Text>
              <TextInput
                placeholder={"Phone number"}
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => SMS.updateSmsNumber(text)}
              />
              <Button title={"Send SMS"} onPress={SMS.sendSMSFunction} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}


import PhoneContacts from './contacts/contacts'
function YEET({ navigation, route }: RouteDrawerParamList<"Template SMS">) {
  const [resultItem, setResult] = React.useState("");
  const [resultContact, setContact] = React.useState("");

  const showResult = (value: string) => {
    setResult(value)
  }

  var items = smsRuleModule.getAllSmsRules()
  var contacts: PhoneContacts = new PhoneContacts();
  var cl = contacts.getAllContacts();

  var contactSMS: Sms = new Sms();

  console.log(cl)

  return (
    <View>
      <TouchableOpacity onPress={navigation.openDrawer} style={ownStyle.buttonNav}><Image style={ownStyle.photo} source={require("./images/navlogo.png")} /></TouchableOpacity>

      <View style={styles.body}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Send a template SMS</Text>
          <Text style={styles.sectionDescription}>
            use the <Text style={styles.highlight}>Select message</Text> and the <Text style={styles.highlight}>Select contact</Text> fields to select a template message and a contact. Use the button <Text style={styles.highlight}>Send SMS</Text> to send
              </Text>
        </View>
      </View>
      <View>
        <Fragment>
          {/**De dropdown met een hoop informatie.
               * 
               * Belangrijkste elementen:
               *    onItemSelect: wordt uitgevoerd wanneer je op een item klikt
               *    items: De items die tevoorschijn komen (items is een array met SmsRule objecten. De name parameter is altijd degene die getoont word )
               * 
               * Library die ik gebruik: https://github.com/zubairpaizer/react-native-searchable-dropdown/blob/master/readme.md
               */}
          <SearchableDropdown
            onItemSelect={(item: SmsRule) => {
              /**Logt de Sms rule die geselecteerd is uit de dropdown */
              /**Hier moet dan de code komen om de message er uit te halen om dan in de SMS te steken. */
              console.log(item)
              setResult(item.getValue());
            }}
            items={items}
            containerStyle={{ padding: 5 }}
            itemTextStyle={{ color: '#222' }}
            itemStyle={{
              padding: 10,
              marginTop: 2,
              backgroundColor: '#ddd',
              borderColor: '#bbb',
              borderWidth: 1,
              borderRadius: 5,
            }}
            resetValue={false}
            chip={true}

            textInputProps={
              {
                placeholder: "Select message",
                underlineColorAndroid: "transparent",
                style: {
                  padding: 12,
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 5,
                },

              }
            }
            listProps={
              {
                nestedScrollEnabled: true,
              }
            }
          />


        </Fragment>
      </View>
      <View>



        <Fragment>
          <SearchableDropdown
            onItemSelect={(item: ContactInfo) => {
              /**Logt de Sms rule die geselecteerd is uit de dropdown */
              /**Hier moet dan de code komen om de message er uit te halen om dan in de SMS te steken. */
              console.log(item)
              setContact(item.getNumber());
            }}
            items={cl}
            containerStyle={{ padding: 5 }}
            itemTextStyle={{ color: '#222' }}
            itemStyle={{
              padding: 10,
              marginTop: 2,
              backgroundColor: '#ddd',
              borderColor: '#bbb',
              borderWidth: 1,
              borderRadius: 5,
            }}
            resetValue={false}
            chip={true}

            textInputProps={
              {
                placeholder: "Select contact",
                underlineColorAndroid: "transparent",
                style: {
                  padding: 12,
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 5,
                },

              }
            }
            listProps={
              {
                nestedScrollEnabled: true,
              }
            }

          />

          {contactSMS.makeSMS(resultContact, resultItem)}
          {console.log(contactSMS.TextInputNumber + "\t" + contactSMS.TextInputValue)}
          <Button title={"Send SMS"} onPress={contactSMS.sendSMSFunction} />


        </Fragment>
      </View>
    </View>

  )
}


/**Sms rule */
function SMSRule({ navigation, route }: RouteDrawerParamList<"New SMS rule">) {
  const [, forceUpdateRule] = useReducer(x => x + 1, 0);

  function handleClick() {
    smsRuleModule.makeSms()
    navigation.navigate("View SMS rule")


  }
  return (
    <View>
      <TouchableOpacity onPress={navigation.openDrawer} style={ownStyle.buttonNav}><Image style={ownStyle.photo} source={require("./images/navlogo.png")} /></TouchableOpacity>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>
          Template SMS
    </Text>
        <Text style={styles.sectionDescription}>
          Make a Template SMS. You can later use these templates to send messages
      </Text>
        <Text style={{ paddingTop: 20 }}>
          Title (unique):
      </Text>
        <TextInput placeholder={"Title"}
          style={{
            padding: 12,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 5,
          }}
          onChangeText={text => smsRuleModule.updateTitle(text)} />

        <Text style={{ paddingTop: 20 }}>
          Message:
      </Text>
        <TextInput placeholder={"Message"}
          style={{
            padding: 12,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 5,
          }}
          onChangeText={text => smsRuleModule.updateMessage(text)} />
        <Button title={"Save SMS"} onPress={handleClick} />

      </View>
    </View>
  )
}


/**Show all template SMS */
function ShowSmsRule({ navigation, route }: RouteDrawerParamList<"View SMS rule">) {

  const [, forceUpdate] = useReducer(x => x + 1, 0);
  function handleClick() {
    forceUpdate();
  }


  function showrules() {
    let smsrules = smsRuleModule.getAllSmsRules().map(val =>
      <View style={styles.container} key={val.name + "mainview"}>
        <Text style={{
          padding: 12,
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 5,
          flex: 1,
        }} key={val.name} >   {val.name}: {val.value}</Text>
        <View style={{ paddingRight: 10 }} key={val.name + "buttonview"}>
          <Button key={val.name + "button"} title={"delete"} onPress={() => dele(val.name)} />
        </View>
      </View>)
    return smsrules
  }

  function dele(name: string) {
    smsRuleModule.deleteSms(name)
    forceUpdate()
  }

  return (
    <SafeAreaView >
      <ScrollView>
        <TouchableOpacity onPress={navigation.openDrawer} style={ownStyle.buttonNav}><Image style={ownStyle.photo} source={require("./images/navlogo.png")} /></TouchableOpacity>
        <View style={styles.sectionContainer}>

          <Text style={styles.sectionTitle}>
            View Template SMS
      </Text>
          <Text style={styles.sectionDescription}>
            On this page you can view all your rules. Use <Text style={styles.highlight}>ADD SMS</Text> to create a new rule. Reload the page (<Text style={styles.highlight}>RELOAD PAGE</Text>) to see your changes and click on the <Text style={styles.highlight}>DELETE</Text> button next to the rule to remove it.
      </Text>
          <Button title={"ADD TEMPLATE SMS"} onPress={() => navigation.navigate("New SMS rule")} />

          <Text>

          </Text>
          <Button title={"Reload page"} onPress={handleClick} />
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {showrules()}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>

  )
}


/** Timed SMS */
import DateTimePicker from '@react-native-community/datetimepicker'; //https://github.com/react-native-datetimepicker/datetimepicker

function TimedSms({ navigation, route }: RouteDrawerParamList<"Timed SMS">) {
  var currDate = new Date();

  const [date, setDate] = React.useState(new Date());
  const [mode, setMode] = React.useState('date');
  const [show, setShow] = React.useState(false);
  const showMode = (currentMode: string) => {
    setShow(true);
    setMode(currentMode);
  };
  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };
  const changeDateTime = (event: Event, selectedDate: Date) => {
    //toon de overlay om uw date/time te veranderen, belangrijk dat dit eerst gebeurt, anders blijft het de time opnieuw tonen na het invullen.
    setShow(false);
    const currentDate = selectedDate || date;
    setDate(currentDate);
    currDate = currentDate;
  };

  const [resultItem, setResult] = React.useState("");
  const [resultContact, setContact] = React.useState("");

  var items = smsRuleModule.getAllSmsRules()
  var contacts: PhoneContacts = new PhoneContacts();
  var cl = contacts.getAllContacts();

  var contactSMS: Sms = new Sms();

  function saveTimedSMSFunction() {
    contactSMS.makeSMS(resultContact, resultItem);
    DifTimer.set_timer_for_n_seconds(DifTimer.calculate_diff(date), contactSMS.sendSMSFunction)
    // run Timer functie met sendsms als callback functie
    // +- DifTimer.set_timer_for_n_seconds(calculate_diff(selectedDate), Sms.sendSMSFunction())
    console.log("saveSms")
  }

  return (
    <View>
      <TouchableOpacity onPress={navigation.openDrawer} style={ownStyle.buttonNav}><Image style={ownStyle.photo} source={require("./images/navlogo.png")} /></TouchableOpacity>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>
          Timed SMS
        </Text>
        <Text style={styles.sectionDescription}>
          Set the <Text style={styles.highlight}>DATE</Text> and <Text style={styles.highlight}>TIME</Text> you want to send the text. Then you can <Text style={styles.highlight}>SAVE</Text> the text        </Text>
        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <Button onPress={showDatepicker} title="Set date" />
          </View>
          <View style={styles.buttonContainer}>
            <Button onPress={showTimepicker} title="Set time" />
          </View>
        </View>
        <Text>
          <Text style={styles.highlight}>You have selected: </Text>
          {date.toLocaleString("nl-BE") /*veranderd de manier dat de date word weergegeven naar die zoals we dat in belgie doen */}
        </Text>
        <Text>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              date={currDate}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={changeDateTime}
            />
          )}
        </Text>

      </View>

      <View>
        <View>
          <Fragment>
            {/**De dropdown met een hoop informatie.
               * 
               * Belangrijkste elementen:
               *    onItemSelect: wordt uitgevoerd wanneer je op een item klikt
               *    items: De items die tevoorschijn komen (items is een array met SmsRule objecten. De name parameter is altijd degene die getoont word )
               * 
               * Library die ik gebruik: https://github.com/zubairpaizer/react-native-searchable-dropdown/blob/master/readme.md
               */}
            <SearchableDropdown
              onItemSelect={(item: SmsRule) => {
                /**Logt de Sms rule die geselecteerd is uit de dropdown */
                /**Hier moet dan de code komen om de message er uit te halen om dan in de SMS te steken. */
                console.log(item)
                setResult(item.getValue());
              }}
              items={items}
              containerStyle={{ padding: 5 }}
              itemTextStyle={{ color: '#222' }}
              itemStyle={{
                padding: 10,
                marginTop: 2,
                backgroundColor: '#ddd',
                borderColor: '#bbb',
                borderWidth: 1,
                borderRadius: 5,
              }}
              resetValue={false}
              chip={true}

              textInputProps={
                {
                  placeholder: "Select message",
                  underlineColorAndroid: "transparent",
                  style: {
                    padding: 12,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 5,
                  },

                }
              }
              listProps={
                {
                  nestedScrollEnabled: true,
                }
              }

            />
          </Fragment>
        </View>
        <View>



          <Fragment>
            <SearchableDropdown
              onItemSelect={(item: ContactInfo) => {
                /**Logt de Sms rule die geselecteerd is uit de dropdown */
                /**Hier moet dan de code komen om de message er uit te halen om dan in de SMS te steken. */
                console.log(item)
                setContact(item.getNumber());
              }}
              items={cl}
              containerStyle={{ padding: 5 }}
              itemTextStyle={{ color: '#222' }}
              itemStyle={{
                padding: 10,
                marginTop: 2,
                backgroundColor: '#ddd',
                borderColor: '#bbb',
                borderWidth: 1,
                borderRadius: 5,
              }}
              resetValue={false}
              chip={true}

              textInputProps={
                {
                  placeholder: "Select contact",
                  underlineColorAndroid: "transparent",
                  style: {
                    padding: 12,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 5,
                  },

                }
              }
              listProps={
                {
                  nestedScrollEnabled: true,
                }
              }

            />

            {contactSMS.makeSMS(resultContact, resultItem)}
            {LR.setContact(resultContact)}
            {LR.setMessage(resultItem)}
          </Fragment>
        </View>
      </View>

      <Button title={"Schedule SMS"} onPress={saveTimedSMSFunction} />
    </View>

  )
}




/*receive sms*/
import Geolocation from '@react-native-community/geolocation';
import SmsListener from 'react-native-android-sms-listener';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { selectContactPhone } from 'react-native-select-contact';
function ReceiveSms({ navigation, route}: RouteDrawerParamList<"Receive sms for GPS">) {

  const storage_key = '@number';

  //let number = AsyncStorage.getItem(storage_key);

   const [number, setNumber] = useState('')

  const storeData = async (value: string) => {
    try {
      await AsyncStorage.setItem(storage_key, number); //value
      console.log(`Stored data. ${number}`); //value
    } catch (e) {
      // saving error
    }
  }

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem(storage_key)
      console.log(`fetched data. ${value}`);
      if(value !== null) {
        // value previously stored
        //return value;
        setNumber(value)
      }else{
        setNumber("")
      }
      
    } catch(e) {
      // error reading value
    }
  }

  useEffect(() => {
    getData()
    
  }, [])

  // let number = getData().then( res =>
  //   {return res;}
  // )

let subscription: any;

  const clearList = async () => {
    try {
      //await AsyncStorage.removeItem(storage_key).then(getData)
      await AsyncStorage.clear().then(getData).then(subscription.remove())
      console.log('log:' + getData);
    } catch(e) {
      // remove error
    }
    console.log('Done.');
  }
 
  const getPhoneNumber = async () => {
    return selectContactPhone()
        .then(selection => {
            if (!selection) {
                return null;
            }

            let { contact, selectedPhone } = selection;
            let newnumber=selectedPhone.number;
            console.log(`Before saveNumbers`);
            setNumber(newnumber)
            storeData(newnumber);
            subscription = SmsListener.addListener((message: any) => {
              console.info(message)
              // if location ask

              //&& typeof getData === 'string' && message.originatingAddress.toString().equals(getData)
              if (message.body.toLowerCase().includes('location') && message.originatingAddress.includes(number)){
                // send sms with coordinated
                Geolocation.getCurrentPosition(info => {
                  console.log(info);
                  SMS.updateSmsNumber(newnumber);
                  SMS.updateSmsValue("My coordinates are: Lat: " + info.coords.latitude + ", Lon: " + info.coords.longitude);
                  SMS.sendSMSFunction();
                  SMS.updateSmsValue("Thanks for asking!");
                  SMS.sendSMSFunction();
                  let lat = info.coords.latitude.toString();
                  let lon = info.coords.longitude.toString();
                  SMS.updateSmsValue("https://www.openstreetmap.org/search?whereami=1&query=" + lat + "%2C" + lon + "#map=17/" + lat +"/" + lon);
                  SMS.sendSMSFunction();
                })
              }
            })
            
            console.log(`Selected ${selectedPhone.type} phone number ${selectedPhone.number} from ${contact.name}`);
            return selectedPhone.number;
        });  
  }
  
  return (
    <View>
      <TouchableOpacity onPress={navigation.openDrawer} style={ownStyle.buttonNav}><Image style={ownStyle.photo} source={require("./images/navlogo.png")} /></TouchableOpacity>
      <View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Message receive rule</Text>
          <Text style={styles.sectionDescription}>
            Select from your contacts the contacts who can send you  <Text style={styles.highlight}>GPS requests</Text>. Their text needs to contain the word <Text style={styles.highlight}>'location'</Text> to receive your reply
              </Text>

          <Text>{"\n"}</Text>
          <Button title="Add contact" onPress={getPhoneNumber}></Button>
          <View>
          <Text style={styles.sectionTitle}>Number:{number}</Text>
          </View>
          <Text>{"\n"}</Text>
          {/* <Button title="Clear contact" onPress={clearList}></Button> */}
        </View>
      </View>
    </View>
  )
}

/** GPS screen */
import LocationRule from './rule/LocationRule'
import SmsRule from './sms/SmsRule';
import ContactInfo from './contacts/ContactInfo';
var LR: LocationRule = new LocationRule();
function DistanceTracking({ navigation, route }: RouteDrawerParamList<"Location Rule">) {
  const [myTargetLocation, setTargetLocation] = useState("Destination");
  const [DistanceToTarget, setDistanceToTarget] = useState(" ");

  function DistanceTrack() {
    LR.createRule();
    setDistanceToTarget("Loading...")
    setTimeout(() => {
      setDistanceToTarget(LR.getDistanceBetween() + " KM");
    }, 5000);
    setInterval(() => {
      var x: number = + LR.getDistanceBetween()
      if (x > 1000) setDistanceToTarget(LR.getDistanceBetween() + " KM");
      else setDistanceToTarget("Arrived")
    }, 30000);
  }


  const [resultItem, setResult] = React.useState("");
  const [resultContact, setContact] = React.useState("");

  var items = smsRuleModule.getAllSmsRules()
  var contacts: PhoneContacts = new PhoneContacts();
  var cl = contacts.getAllContacts();

  var contactSMS: Sms = new Sms();

  return (
    <View>
      <TouchableOpacity onPress={navigation.openDrawer} style={ownStyle.buttonNav}><Image style={ownStyle.photo} source={require("./images/navlogo.png")} /></TouchableOpacity>
      <View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Location rule</Text>
          <Text style={styles.sectionDescription}>
            Fill in the destination field and <Text style={styles.highlight}>Select a message and contact</Text>, press the <Text style={styles.highlight}>Set Destination</Text> button to send when the distance left is 1KM or less.
              </Text>
          <TextInput placeholder={"Destination"}
            style={{
              padding: 10,
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 5,
            }}
            onChangeText={text => LR.setDestination(text)} />

          <View>
            <View>
              <Fragment>
                {/**De dropdown met een hoop informatie.
               * 
               * Belangrijkste elementen:
               *    onItemSelect: wordt uitgevoerd wanneer je op een item klikt
               *    items: De items die tevoorschijn komen (items is een array met SmsRule objecten. De name parameter is altijd degene die getoont word )
               * 
               * Library die ik gebruik: https://github.com/zubairpaizer/react-native-searchable-dropdown/blob/master/readme.md
               */}
                <SearchableDropdown
                  onItemSelect={(item: SmsRule) => {
                    /**Logt de Sms rule die geselecteerd is uit de dropdown */
                    /**Hier moet dan de code komen om de message er uit te halen om dan in de SMS te steken. */
                    console.log(item)
                    setResult(item.getValue());
                  }}
                  items={items}
                  containerStyle={{ padding: 5 }}
                  itemTextStyle={{ color: '#222' }}
                  itemStyle={{
                    padding: 10,
                    marginTop: 2,
                    backgroundColor: '#ddd',
                    borderColor: '#bbb',
                    borderWidth: 1,
                    borderRadius: 5,
                  }}
                  resetValue={false}
                  chip={true}

                  textInputProps={
                    {
                      placeholder: "Select message",
                      underlineColorAndroid: "transparent",
                      style: {
                        padding: 12,
                        borderWidth: 1,
                        borderColor: '#ccc',
                        borderRadius: 5,
                      },

                    }
                  }
                  listProps={
                    {
                      nestedScrollEnabled: true,
                    }
                  }

                />
              </Fragment>
            </View>
            <View>



              <Fragment>
                <SearchableDropdown
                  onItemSelect={(item: ContactInfo) => {
                    /**Logt de Sms rule die geselecteerd is uit de dropdown */
                    /**Hier moet dan de code komen om de message er uit te halen om dan in de SMS te steken. */
                    console.log(item)
                    setContact(item.getNumber());
                  }}
                  items={cl}
                  containerStyle={{ padding: 5 }}
                  itemTextStyle={{ color: '#222' }}
                  itemStyle={{
                    padding: 10,
                    marginTop: 2,
                    backgroundColor: '#ddd',
                    borderColor: '#bbb',
                    borderWidth: 1,
                    borderRadius: 5,
                  }}
                  resetValue={false}
                  chip={true}

                  textInputProps={
                    {
                      placeholder: "Select contact",
                      underlineColorAndroid: "transparent",
                      style: {
                        padding: 12,
                        borderWidth: 1,
                        borderColor: '#ccc',
                        borderRadius: 5,
                      },

                    }
                  }
                  listProps={
                    {
                      nestedScrollEnabled: true,
                    }
                  }

                />

                {contactSMS.makeSMS(resultContact, resultItem)}
                {LR.setContact(resultContact)}
                {LR.setMessage(resultItem)}
              </Fragment>
            </View>
          </View>

          <Button title="Set Destination" onPress={DistanceTrack}></Button>
          <Text style={{ paddingTop: 30 }}>{DistanceToTarget}</Text>
        </View>
      </View>
    </View>
  )
}
