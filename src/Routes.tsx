import React, { useReducer, useState } from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native';
import { Text, View, Button, TextInput, StatusBar, SafeAreaView, ScrollView, Image, StyleSheet } from 'react-native';
import { RouteDrawerParamList, RouteParamList } from './RouteParamList';
import { styles } from './style/style'
import { ownStyle } from './style/style'
import { TouchableOpacity } from 'react-native'
import { DifTimer } from "./timer/Timer"
import {smsRuleModule} from "./sms/smsRuleModule"

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
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="SMSRule" component={SMSRule} />
        <Drawer.Screen name="ShowSmsRule" component={ShowSmsRule} />
        <Drawer.Screen name="GPS" component={DistanceTracking} />
        <Drawer.Screen name="TimedSms" component={TimedSms} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}



/** Homescreen */

declare const global: { HermesInternal: null | {} };
import Sms from './sms/Sms'

var SMS: Sms = new Sms();

function Home({ navigation, route }: RouteDrawerParamList<"Home">) {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>

        <TouchableOpacity onPress={navigation.openDrawer} style={ownStyle.buttonNav}><Image style={ownStyle.photo} source={require("./images/navlogo.png")} /></TouchableOpacity>

        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Send SMS App</Text>
              <Text style={styles.sectionDescription}>
                use the button <Text style={styles.highlight}>Send SMS</Text> to send a text to a person
              </Text>

              <Text style={{ paddingTop: 30 }}>
                Message:
            </Text>
              <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => SMS.updateSmsValue(text)} />

              <Text style={{ paddingTop: 30 }}>
                Phone number:
            </Text>
              <TextInput
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


/**Sms rule */
function SMSRule({ navigation, route }: RouteDrawerParamList<"SMSRule">) {


  return (
    <View>
      <TouchableOpacity onPress={navigation.openDrawer} style={ownStyle.buttonNav}><Image style={ownStyle.photo} source={require("./images/navlogo.png")} /></TouchableOpacity>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>
          Template SMS
    </Text>
        <Text style={styles.sectionDescription}>
          Make a Template SMS to couple to a rule
      </Text>
      <Text style={{ paddingTop: 30 }}>
          Title:
      </Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={text => smsRuleModule.updateTitle(text)} />

        <Text style={{ paddingTop: 30 }}>
          Message:
      </Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={text => smsRuleModule.updateMessage(text)} />
        <Button title={"Save SMS"} onPress={smsRuleModule.makeSms} />
      </View>
    </View>
  )
}


/**Show all template SMS */
function ShowSmsRule({ navigation, route }: RouteDrawerParamList<"ShowSmsRule">) {

  const [, forceUpdate] = useReducer(x => x + 1, 0);

  function handleClick() {
    forceUpdate();
  }

  

  function showrules(){
    let smsrules = smsRuleModule.getAllSmsRules().map(val => 
    <Text key={val.title} >   {val.title}: {val.value}</Text>)
    return smsrules
  }
  

  return(
    <View>
      <TouchableOpacity onPress={navigation.openDrawer} style={ownStyle.buttonNav}><Image style={ownStyle.photo} source={require("./images/navlogo.png")} /></TouchableOpacity>
      <Text>
        View all your template SMS:
      </Text>
      <Button title={"Reload page"} onPress={handleClick}/>
      {showrules()}
       

    </View>
  )
}


/** Timed SMS */
import DateTimePicker from '@react-native-community/datetimepicker'; //https://github.com/react-native-datetimepicker/datetimepicker

function TimedSms({ navigation, route }: RouteDrawerParamList<"TimedSms">) {
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
    console.log(selectedDate);
    console.log(currentDate);
    currDate = currentDate;
  };

  function saveTimedSMSFunction() {
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
        <View>
          <Button onPress={showDatepicker} title="Set date" />
          <Button onPress={showTimepicker} title="Set time" />
        </View>
        <Text>

          {'Selected: ' + date.toLocaleString("nl-BE") /*veranderd de manier dat de date word weergegeven naar die zoals we dat in belgie doen */}
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
        <Button title={"Save SMS"} onPress={saveTimedSMSFunction} />
      </View>
    </View>

  )
}

/** GPS screen */
import Location from './location/Location'
import { Screen } from 'react-native-screens';
import SmsRule from './sms/SmsRule';
var Loc: Location = new Location();
function DistanceTracking({ navigation, route }: RouteDrawerParamList<"GPS">) {
  const [myTargetLocation, setTargetLocation] = useState("Destination");
  const [DistanceToTarget, setDistanceToTarget] = useState(" ");
  return (
    <View>
      <TouchableOpacity onPress={navigation.openDrawer} style={ownStyle.buttonNav}><Image style={ownStyle.photo} source={require("./images/navlogo.png")} /></TouchableOpacity>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Navigation rule</Text>
        <Text style={styles.sectionDescription}>
          use the button <Text style={styles.highlight}>SELECT TARGET</Text> to set your destination and use
                <Text style={styles.highlight}> DISTANCE</Text> to start calculating the distance left
              </Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={text => Loc.updateTargetLocation(text)} />
        <Button title="Select target" onPress={Loc.getTargetLocationFromAPI}></Button>
        <Button title="Distance" onPress={() => setDistanceToTarget(Loc.getDistanceBetween())}></Button>
        <Text style={{ paddingTop: 30 }}>{DistanceToTarget}</Text>
      </View>
    </View>
  )
}



