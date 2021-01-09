import * as React from 'react';
const {useSate, useEffect} = React
import {  View, Text, LogBox  } from 'react-native';
import { createDrawerNavigator  } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Avatar, Image, Icon, Button } from 'react-native-elements';

import HomeScreen from './screens/HomeScreen.js'
import AboutScreen from './screens/AboutScreen.js'
import EmergencyScreen from './screens/EmergencyScreen.js'
import Sidebar from './components/customeDrawer'
import * as firebase from 'firebase'
import ApiKeys from './firebaseConfig'



const Drawer = createDrawerNavigator();


export default function App() {
  useEffect(()=>{
    LogBox.ignoreAllLogs(['Setting a timer for a long period of time']);
    if (!firebase.apps.length) {
        firebase.initializeApp(ApiKeys.firebaseConfig)
     }else {
        firebase.app(); // if already initialized, use that one
     }

     //reffering
    //  var tutorialsRef = firebase.database().ref("/firstAid");
     //read
    // tutorialsRef.once('value', function(snapshot) {
    //   var tutorials = [];
    //   console.log(snapshot)
    // });
    //create
    // tutorialsRef.push()
    //update
    // tutorialsRef.child('-MQWOHh87JlKa_mUujXG').update({tae:"ss"}) 
    //delete
    // tutorialsRef.child('-MQWOHh87JlKa_mUujXG').remove() 



  },[])

  return (
    <NavigationContainer>
      
      <Drawer.Navigator 
      initialRouteName="HomeScreen"
      drawerContent={ props=> <Sidebar {...props} />}
      drawerContentOptions={{activeTintColor: "#c43a37"}}
      >
        <Drawer.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          drawerIcon: ({focused, color, size})=>(
            <Icon name="home" style={{fontSize: size, color: color}}/>
          )
        }}
        />
        <Drawer.Screen 
        name="About us" 
        component={AboutScreen} 
        options={{
          drawerIcon: ({focused, color, size})=>(
            <Icon name="info" style={{fontSize: size, color: color}}/>
          )
        }}
        />
        <Drawer.Screen 
        name="Emergency Hotlines" 
        component={EmergencyScreen} 
        options={{
          drawerIcon: ({focused, color, size})=>(
            <Icon name="call" style={{fontSize: size, color: color}}/>
          )
        }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}