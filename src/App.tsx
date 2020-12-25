/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React  from 'react';
import {Routes} from './Routes'
import {PermissionsAndroid,} from 'react-native';



const App = () => {
  
  return (
    <>
      <Routes />
    </>

  );
};



const requestSMSPermission  = async () =>{
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.SEND_SMS,
      {
        title: "Cool App SMS Permission",
        message:
          "Cool App needs access to SMS ",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can send SMS");
    } else {
      console.log("SMS permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};

const requestLocationPermission  = async () =>{
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Cool App Location Permission",
        message:
          "Cool App needs location permission ",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use location");
    } else {
      console.log("Location permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};


const requestContactsPermission  = async () =>{
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      {
        title: "Cool App Contact Permission",
        message:
          "Cool App needs Contact permission ",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use contacts");
    } else {
      console.log("Contact permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};



requestContactsPermission();
requestSMSPermission();
requestLocationPermission();


export default App;