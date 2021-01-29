import * as React from 'react';
const {useState, useEffect, useRef} = React
import {  View, Text, LogBox, StyleSheet  } from 'react-native';
import { createDrawerNavigator  } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Avatar, Image, Icon, Button } from 'react-native-elements';
import SyncStorage from 'sync-storage';
import AppIntroSlider from 'react-native-app-intro-slider';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen from './screens/HomeScreen.js'
import AboutScreen from './screens/AboutScreen.js'
import EmergencyScreen from './screens/EmergencyScreen.js'
import Sidebar from './components/customeDrawer'
import * as firebase from 'firebase'
import ApiKeys from './firebaseConfig'
import RendererItem from './components/RenderItem.js'
import {slides} from './slides'

import Constants from 'expo-constants'
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { Modal } from 'react-native';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const Drawer = createDrawerNavigator();

export default function App() {

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const [notiModal , setNotiModal] = useState(false);
  const [notiContent, setNotiContent] = useState({title: "", body: ""})
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });
    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      let {title,body} = response.notification.request.content;
      setNotiContent({title,body})
      setNotiModal(true)
    });
    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
      //store to firebase////////////////////////////
      var tokenRef = firebase.database().ref("/token");
      // tokenRef.push({token:token })

      tokenRef.once('value', function(snapshot) {
        const tokensObject = snapshot.val()
        let tokenList = [];
  
        for(let id in tokensObject){
          tokenList.push({ id, ...tokensObject[id]})
        }
        
        let isAlreadyAvailable = false
        tokenList.forEach(toks=>{
          if(toks.token == token){
            isAlreadyAvailable = true
          }
        })
        console.log(isAlreadyAvailable)
        if(isAlreadyAvailable==false){
          tokenRef.push({token:token })
        }
      });
      //end store to firebase///////////////////////
      
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }




  //noti end

  const check = async()=>{
    try {
      const value = await AsyncStorage.getItem('@storage_Key')
      if(value !== null) {
          setShowRealApp(true)
      }
    } catch(e) {
    }

  }


  useEffect(()=>{

    check()

    LogBox.ignoreAllLogs(['Setting a timer for a long period of time']);
    if (!firebase.apps.length) {
        firebase.initializeApp(ApiKeys.firebaseConfig)
     }else {
        firebase.app(); // if already initialized, use that one
     }


  },[])

  const [showRealApp, setShowRealApp ] = useState(false)


  const hideIntro = async()=>{
    try {
      await AsyncStorage.setItem('@storage_Key', "true")
    } catch (e) {
      // saving error
    }
    setShowRealApp(true)
  }


  if(showRealApp){
    return (
      <NavigationContainer>
        <Modal
          animationType="slide"
          transparent={true}
          visible={notiModal}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
            <View style={styles.centeredView}>
              <View style={{ width: 250}}>
                <Text style={{fontSize: 22, fontWeight: "bold", marginBottom: 20}}>
                  {notiContent.title}
                </Text>
                <Text style={{fontSize: 18, marginBottom: 15}}>
                  {notiContent.body}
                </Text> 
                <Button title="Okay" 
                type="outline"
                onPress={()=>{setNotiModal(false)}}
                />               
              </View>
            </View>
        </Modal>
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
  else{
    return(
      <AppIntroSlider renderItem={RendererItem} data={slides} onDone={hideIntro} />
    )
  }
}

const styles = StyleSheet.create({
  slide:{
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },    
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
})