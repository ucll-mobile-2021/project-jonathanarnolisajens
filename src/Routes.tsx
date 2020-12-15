import React, {useState} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native';
import { Text, View, Button, TextInput, StatusBar, SafeAreaView, ScrollView, Image, StyleSheet } from 'react-native';
import { RouteDrawerParamList, RouteParamList } from './RouteParamList';
import {styles} from '../style'
import { TouchableOpacity} from 'react-native'

interface RoutesProps{}

export const Routes: React.FC<RoutesProps> = ({}) => {

    const Drawer = createDrawerNavigator<RouteParamList>();

    /** Voor een extra Navigatie item maak een <Drawer.Screen name="x" component={x} /> in onderstaande return
     * Maak daan een functie x({navigation,route}: RouteDrawerParamList<"x">) aan
     * in de return voeg je 
     *  <TouchableOpacity onPress={navigation.openDrawer} style={ownStyle.buttonNav}><Image style={ownStyle.photo} source={require("./images/navlogo.png")} /></TouchableOpacity>
     * toe, deze knop toggled de navbar
     * ga naar RouteParamList.tsx en volg de comments daar
    */

    return(
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen name="Home" component={Home} />
                <Drawer.Screen name="GPS" component={DistanceTracking} /> 
            </Drawer.Navigator>
        </NavigationContainer>
        
    )
}



/** Homescreen */

declare const global: {HermesInternal: null | {}};
import Sms from './sms/Sms'

var SMS : Sms = new Sms();

function Home({navigation,route}: RouteDrawerParamList<"Home">){
    return(
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

            <Text style={{paddingTop: 30}}>
                Message:
            </Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => SMS.updateSmsValue(text)}/>

            <Text style={{paddingTop: 30}}>
                Phone number:
            </Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => SMS.updateSmsNumber(text)}
            />
                <Button title={"Send SMS"} onPress={SMS.sendSMSFunction}/>
            </View>
          </View>
        </ScrollView>

      </SafeAreaView>
    </>
    )
}

/** GPS screen */
import Location from './location/Location'
import { Screen } from 'react-native-screens';
var Loc : Location = new Location();
function DistanceTracking({navigation,route}: RouteDrawerParamList<"DistanceTracking">){
    const [myTargetLocation, setTargetLocation] = useState("Destination");
    const [DistanceToTarget, setDistanceToTarget] = useState(" ");
    return(
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
                onChangeText={text => Loc.updateTargetLocation(text)}/>
                <Button title="Select target" onPress = {Loc.getTargetLocationFromAPI}></Button>
                <Button title="Distance" onPress = {() => setDistanceToTarget(Loc.getDistanceBetween())}></Button>
                <Text style={{paddingTop: 30}}>{DistanceToTarget}</Text>
            </View>
        </View>
    )
}



const ownStyle = StyleSheet.create({
  buttonNav: {
    margin: 10,
    width: 20,
    height: 20,
    color: '#40E0D0',
    backgroundColor: '#CCCCFF',
  },
  photo: {
    width: 20,
    height: 20,
  }
});